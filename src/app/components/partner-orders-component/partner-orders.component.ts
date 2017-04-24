import {Component, OnInit} from "@angular/core";
import {ScheduleService} from "../../_services/schedule.service";
import {Request} from "../../_models/request.model";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {Partner} from "../../_models/partner.model";
import {PartnerService} from "../../_services/partner.service";
@Component({
  moduleId: module.id,
  templateUrl: './partner-orders.component.html',
  selector: 'partner-orders',
  styleUrls: ['partner-orders.component.css']
})
export class PartnerOrdersComponent implements OnInit {
  private _partnerId: number;

  private header: any = {left: 'prev,next today', center: 'title', right: 'agendaDay,agendaWeek,month'};


  constructor(private scheduleService: ScheduleService,
              private partnerService: PartnerService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {

  }


  ngOnInit(): void {
    this.initReservationsForPartner();
  }

  private initReservationsForPartner(): void {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this._partnerId = +params['partnerId'];
      this.scheduleService.initReservationsForPartner(this._partnerId);
    });
  }


  newRequest(): Request {
    return this.scheduleService.customRequest;
  }

  selectedRequest(): Request {
    return this.scheduleService.selectedEvent;
  }

  addCustomEvent(): void {
    this.scheduleService.customRequest.partnerId = this._partnerId;
    this.scheduleService.customRequest.startTime.setHours(this.scheduleService.customRequest.newRequestStartTime.getHours());
    this.scheduleService.customRequest.startTime.setMinutes(this.scheduleService.customRequest.newRequestStartTime.getMinutes());
    this.scheduleService.addEvent(this.scheduleService.customRequest);
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

  goToMyAccount(): void {
    this.router.navigate(["/partneraccount"], {queryParams: {partnerId: this._partnerId}})
  }


}
