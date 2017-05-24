import {Component, OnInit} from "@angular/core";
import {ScheduleService} from "../../_services/schedule.service";
import {Request} from "../../_models/request.model";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {PartnerService} from "../../_services/partner.service";
import {AuthenticationService} from "../../_services/authentication.service";
import {ConverterUtils} from "../../_commonServices/converter.service";
import {PartnerServiceDetail} from "../../_models/partner-service-detail.model";
import {ClassifierService} from "../../_services/classifier.service";
import {Service} from "../../_models/service.model";
import {EventListenerService} from "../../_services/event-listener.service";
import {Event} from "../../_models/event.model";
import {MenuItem} from "primeng/components/common/api";
@Component({
  moduleId: module.id,
  templateUrl: './partner-orders.component.html',
  selector: 'partner-orders',
  styleUrls: ['partner-orders.component.css']
})
export class PartnerOrdersComponent implements OnInit {
  public _partnerId: number;
  public _mainServiceId: number;
  public header: any = {left: 'prev,next today', center: 'title', right: 'agendaDay,agendaWeek,month'};
  public requestNow: Request = <Request>{};
  public _thereIsNowRequest: boolean = false;


  constructor(public scheduleService: ScheduleService,
              public partnerService: PartnerService,
              public classifierService: ClassifierService,
              public router: Router,
              public activatedRoute: ActivatedRoute,
              public authenticationService: AuthenticationService,
              public eventListenerService: EventListenerService) {

  }


  ngOnInit(): void {
    this.authenticationService.checkUnSignedPartner();
    this.initReservationsForPartner();
    this.initUserProperties();

  }

  public initReservationsForPartner(): void {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this._partnerId = +params['partnerId'];
      this._mainServiceId = +params['serviceId'];
      setInterval(() => {
        this.eventListenerService.autoCheckNewEvents(this._partnerId)
      }, 10 * 1000);
      this.scheduleService.getReservationsForPartner(this._partnerId, 1).subscribe(
        (data: string) => {
          let requests: Request[] = ConverterUtils.reservationsFromJson(data);
          this.scheduleService.initSchedule(requests);
          this.autoCheckRequestExisting();
          setInterval(() => {
            this.autoCheckRequestExisting()
          }, 4 * 1000);
        }
      );
      this.scheduleService.getReservationsForPartner(this._partnerId, 2).subscribe(
        (data: string) => {
          let newRequests: Request[] = ConverterUtils.reservationsFromJson(data);
          this.partnerService.getPartnerServiceDetails(this._partnerId).subscribe(
            data => {
              let serviceDetails: PartnerServiceDetail[] = ConverterUtils.partnerServicesFromJson(data);
              serviceDetails.forEach(serviceDetail => {
                newRequests.forEach(newRequest => {
                  if (newRequest.serviceId === serviceDetail.serviceId) {
                    newRequest.partnerServiceDetail = serviceDetail;
                    newRequest.duration = serviceDetail.defaultduration;
                    this.classifierService.getServicesByParent(this._mainServiceId).subscribe(
                      data => {
                        let services: Service[] = ConverterUtils.servicesFromJson(data);
                        services.forEach(service => {
                          if (service._id === newRequest.serviceId) {
                            serviceDetail.service = service;
                            return;
                          }
                        })
                      }
                    )
                  }
                });
              });

            },
            () => {
            },
            () => {
              this.scheduleService.initNewRequests(newRequests);
            });

        }
      );

    });
  }

  public _thereWasNewRequest: boolean = false;

  autoCheckRequestExisting() {
    this._thereWasNewRequest = this._thereIsNowRequest;

    this.requestNow = <Request>{};
    this._thereIsNowRequest = false;
    this.scheduleService.requests.forEach((event: Request) => {
        if (this.isNowEvent(event)) {
          this.requestNow = event;
          this._thereIsNowRequest = true;
        }
      }
    );
    if (this._thereWasNewRequest && !this._thereIsNowRequest) {
      this.completeReservation();
      this._thereWasNewRequest = false;
    }
  }


  newRequest(): Request {
    return this.scheduleService.customRequest;
  }

  losTnewRequests(): Request[] {
    return this.scheduleService.newRequests;
  }

  selectedRequest(): Request {
    return this.scheduleService.selectedEvent;
  }

  public _isWrongDurationNewRequest: boolean = false;
  public _crossedRequestDurationNewRequest: Request;
  public _crossedRequestStartNewRequest: Request;

  addCustomEvent(): void {
    this.scheduleService.customRequest.partnerId = this._partnerId;
    this.scheduleService.customRequest.status = 1;
    this.scheduleService.customRequest.startTime.setHours(this.scheduleService.customRequest.newRequestStartTime.getHours());
    this.scheduleService.customRequest.startTime.setMinutes(this.scheduleService.customRequest.newRequestStartTime.getMinutes());
    this.scheduleService.addEvent(this.scheduleService.customRequest).subscribe((data: string) => {
      this._isWrongDurationNewRequest = JSON.parse(data)["isWrongDuration"] === 'true';
      if (JSON.parse(data)["crossedRequestDuration"]) {

      }
      this._crossedRequestDurationNewRequest = <Request>(JSON.parse(data)["crossedRequestDuration"]);
      this._crossedRequestStartNewRequest = <Request>(JSON.parse(data)["crossedRequestStart"]);


      if (this._crossedRequestDurationNewRequest === undefined && this._crossedRequestStartNewRequest === undefined && !this._isWrongDurationNewRequest) {
        this.scheduleService.initReservationsForPartner(this._partnerId, 1);
        this.scheduleService.initReservationsForPartner(this._partnerId, 2);
        this.scheduleService.creatingEventDetails = false;
        this.scheduleService.customRequest.newRequestStartTime = null;
        this._crossedRequestDurationNewRequest = undefined;
        this._crossedRequestStartNewRequest = undefined;
      }
    });
  }

  public _isWrongDuration: boolean = false;
  public _crossedRequestDuration: Request
  public _crossedRequestStart: Request;


  acceptRequest(request: Request): void {
    request.status = 1;
    this.scheduleService.updateEvent(request).subscribe(
      data => {
        if (data !== undefined && data !== null && data !== '') {

          this._isWrongDuration = JSON.parse(data)["isWrongDuration"] === 'true';
          this._crossedRequestDuration = <Request>JSON.parse(data)["crossedRequestDuration"];
          this._crossedRequestStart = <Request>JSON.parse(data)["crossedRequestStart"];
        }
        if (this._crossedRequestStart === undefined && this._crossedRequestDuration === undefined && !this._isWrongDuration) {
          this.scheduleService.initReservationsForPartner(request.partnerId, 1);
          this.scheduleService.initReservationsForPartner(request.partnerId, 2);
        }
      });
  }
  public userProperties:MenuItem[]=[];
  public initUserProperties(){
    this.userProperties = [
      {label: 'My account', icon: 'fa fa-user', command: () => {
        this.goToMyAccount();
      }},
      {label: 'Sign Out', icon: 'fa fa-sign-out', command: () => {
        this.partnerService.logout(this._partnerId);
      }},
    ];
  }

  public isInScheduleState:boolean = true;
  goToSchedule(){
    this.isInScheduleState = true;
  }

  goToRequests(){
    this.isInScheduleState = false;
  }



  cancelAddingCustomEvent(): void {
    this.scheduleService.creatingEventDetails = false;

  }

  closeEventDetails(): void {
    this.scheduleService.showEventDetails = false;
  }

  getSchedule(): any[] {
    return this.scheduleService.schedule;
  }

  showEventDetails(): boolean {
    return this.scheduleService.showEventDetails;
  }

  createEvent(): boolean {
    return this.scheduleService.creatingEventDetails;
  }


  onEventClickHandler(event: any): void {
    this.scheduleService.handleEventClick(event);
  }

  onDayClickHandler(event: any): void {
    this.scheduleService.handleDayClick(event);
  }

  deleteEvent(): void {
    this.scheduleService.deleteEvent();
  }

  completeReservation(): void {
    this.requestNow.status = 3; //status of done requests
    this.requestNow.partnerId = this._partnerId;
    this.scheduleService.updateReservation(this.requestNow).subscribe(
      data => {
        this.scheduleService.initReservationsForPartner(this._partnerId, 1);
        this._thereIsNowRequest = false;
      }
    );
  }

  declineReservation(request: Request): void {
    this.scheduleService.deleteReservation(request.id);
    this.scheduleService.initReservationsForPartner(this._partnerId, 2);
  }

  public _hasNewRequest: boolean;

  get hasNewRequest(): boolean {
    this._hasNewRequest = this.eventListenerService.thereIsNewEvent;
    return this.eventListenerService.thereIsNewEvent;
  }


  set hasNewRequest(value: boolean) {
    this._hasNewRequest = value;
  }

  newEvents(): Event[] {
    return this.eventListenerService.newEvents;
  }

  closeNewRequests(): void {
    this.eventListenerService.deleteNewEventsFromPartner();
    this.initReservationsForPartner();
  }

  isNowEvent(event: Request): boolean {
    let date: Date = new Date();
    return date.getTime() > event.startTime.getTime() && date.getTime() < event.endTime.getTime();
  }

  goToMyAccount(): void {
    this.router.navigate(["/partneraccount"], {queryParams: {partnerId: this._partnerId}})
  }
}
