import {Injectable} from "@angular/core";
import {Request} from "../_models/request.model";
import {HttpWrap} from "../_commonServices/httpWrap.service";
import {Observable} from "rxjs";
import {Response} from "@angular/http";
import {ConverterUtils} from "../_commonServices/converter.service";
import {ClientService} from "./client.service";
import {ServiceUrlProvider} from "../_commonServices/mode-resolver.service";


@Injectable()
export class ScheduleService {
  private _customRequest: Request = <Request>{};

  private _schedule: any[] = [];
  private _requests: Request[] = [];
  private _newRequests: Request[] = [];

  private _selectedEvent: Request = <Request>{};

  private _showEventDetails: boolean = false;

  private _autoAcceptedRequest: Request = <Request>{};

  private _creatingEventDetails: boolean = false;

  constructor(private httpWrap: HttpWrap, private clientService: ClientService) {
  }


  get requests(): Request[] {
    return this._requests;
  }

  set requests(value: Request[]) {
    this._requests = value;
  }

  get newRequests(): Request[] {
    return this._newRequests;
  }

  set newRequests(value: Request[]) {
    this._newRequests = value;
  }

  get customRequest(): Request {
    return this._customRequest;
  }

  set customRequest(value: Request) {
    this._customRequest = value;
  }


  get schedule(): any[] {
    return this._schedule;
  }

  set schedule(value: any[]) {
    this._schedule = value;
  }


  get selectedEvent(): Request {
    return this._selectedEvent;
  }

  set selectedEvent(value: Request) {
    this._selectedEvent = value;
  }


  get showEventDetails(): boolean {
    return this._showEventDetails;
  }

  set showEventDetails(value: boolean) {
    this._showEventDetails = value;
  }


  get creatingEventDetails(): boolean {
    return this._creatingEventDetails;
  }

  set creatingEventDetails(value: boolean) {
    this._creatingEventDetails = value;
  }

  addEvent(request: Request): Observable<string> {
    return this.saveReservation(request);


  }

  updateEvent(request: Request): Observable<string> {
    return this.updateReservation(request);

  }

  handleEventClick(e) {
    this.selectedEvent = <Request>{};

    this.selectedEvent.description = e.calEvent.title;
    this.selectedEvent.id = e.calEvent.id;
    this.selectedEvent.startTime = e.calEvent.start;
    this.selectedEvent.endTime = e.calEvent.end;
    this.selectedEvent.clientId = e.calEvent.clientId;
    this.selectedEvent.partnerId = e.calEvent.partnerId;
    this.showEventDetails = true;
  }

  handleDayClick(event: any) {
    this.customRequest = <Request>{};
    this.customRequest.newRequestStartTime = new Date();
    this.customRequest.startTime = event.date._d;
    this.customRequest.startTime.setHours(this.customRequest.newRequestStartTime.getHours());
    this.customRequest.startTime.setMinutes(this.customRequest.newRequestStartTime.getMinutes());
    this.creatingEventDetails = true;
  }


  deleteEvent() {
    this.deleteReservation(this.selectedEvent.id)
  }


  findEventIndexById(id: number) {
    let index = -1;
    for (let i = 0; i < this.schedule.length; i++) {
      if (id == this.schedule[i].id) {
        index = i;
        break;
      }
    }

    return index;
  }

  initReservationsForPartner(partnerId: number, status: number): void {
    this.getReservationsForPartner(partnerId, status).subscribe(
      (data: string) => {
        let requests: Request[] = ConverterUtils.reservationsFromJson(data);
        if (status === 1) {
          this.initSchedule(requests);
        } else if (status === 2) {
          this.initNewRequests(requests);
        }
      }
    );
  }

  initSchedule(resquests: Request[]): void {
    this._requests = resquests;
    this.schedule = [];
    for (let request of this._requests) {
      let endOfRequest = request.startTime.getMinutes() + +request.duration;
      request.endTime = new Date(request.startTime);
      request.endTime.setMinutes(endOfRequest);
      this.schedule.push({
          "id": request.id,
          "clientId": request.clientId,
          "title": request.description,
          "start": request.startTime,
          "end": request.endTime,
          "status": request.status,
          "responseText": request.responseText,
          "duration": request.duration
        }
      )
    }
  }

  initNewRequests(requests: Request[]): void {
    this._newRequests = requests;
    for (let request of this._newRequests) {
      this.clientService.getClientMainDetailsById(request.clientId).subscribe(
        data => {
          request.client = ConverterUtils.getClientFromJsonString(data);
        }
      );
    }
  }

  initReservationsForClient(clientId: number, status: number): void {
    this.getReservationsForClient(clientId, status).subscribe(
      (data: string) => {
        this._requests = ConverterUtils.reservationsFromJson(data);
        this.schedule = [];
        for (let request of this._requests) {
          let endOfRequest = request.startTime.getMinutes() + +request.duration;
          request.endTime = new Date(request.startTime);
          request.endTime.setMinutes(endOfRequest);
          this.schedule.push({
              "id": request.id,
              "partnerId": request.partnerId,
              "title": request.description,
              "start": request.startTime,
              "end": request.endTime,
              "status": request.status,
              "responseText": request.responseText,
              "duration": request.duration
            }
          )
        }

      }
    );
  }


  getReservationsForPartner(partnerId: number, status: number): Observable<string> {
    return this.httpWrap.get(ServiceUrlProvider.getPartnerServiceUrl() + 'partner/reservationsforpartner/' + partnerId + '/' + status)
      .map((response: Response) => response.text());

  }


  getReservationsForClient(clientId: number, status: number): Observable<string> {
    return this.httpWrap.get(ServiceUrlProvider.getPartnerServiceUrl() + 'partner/reservationsforclient/' + clientId + '/' + status)
      .map((response: Response) => response.text());

  }

  saveReservation(request: Request): Observable<string> {
    let requesNew: Request = new Request(request.id, request.clientId, request.partnerId,
      request.startTime, request.description, request.status,
      request.responseText, request.duration, request.serviceId);

    let data: string = requesNew.toJsonString();
    return this.httpWrap.post(ServiceUrlProvider.getPartnerServiceUrl() + 'partner/addReserve', data)
      .map((response: Response) => response.text());
  }

  updateReservation(request: Request): Observable<string> {
    let requesNew: Request = new Request(request.id, request.clientId, request.partnerId,
      request.startTime, request.description, request.status,
      request.responseText, request.duration, request.serviceId);
    let data: string = requesNew.toJsonString();
    return this.httpWrap.post(ServiceUrlProvider.getPartnerServiceUrl() + 'partner/updateReserve', data)
      .map((response: Response) => response.text());
  }

  deleteReservation(requestId: number): void {
    this.httpWrap.delete(ServiceUrlProvider.getPartnerServiceUrl() + 'partner/deletereserve/' + requestId)
      .map((response: Response) => response.text()).subscribe(data => {

      let index: number = this.findEventIndexById(requestId);
      if (index >= 0) {
        this.schedule.splice(index, 1);
      }
      this.showEventDetails = false;
    });
  }


}
