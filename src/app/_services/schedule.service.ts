import {Injectable} from "@angular/core";
import {Request} from "../_models/request.model";
import {HttpWrap} from "../_commonServices/httpWrap.service";
import {Observable} from "rxjs";
import {Response} from "@angular/http";
import {ConverterUtils} from "../_commonServices/converter.service";


@Injectable()
export class ScheduleService {
  private _customRequest: Request = <Request>{};

  private _schedule: any[] = [];
  private _requests: Request[] = [];
  private _selectedEvent: Request = <Request>{};

  private _showEventDetails: boolean = false;


  private _creatingEventDetails: boolean = false;

  constructor(private httpWrap: HttpWrap) {

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

  addEvent(request: Request): void {
    this.saveReservation(request).subscribe((data:string)=>{
      this.initReservationsForPartner(request.partnerId);
      this.creatingEventDetails = false;
      this.customRequest.newRequestStartTime = null;
    });


  }

  handleEventClick(e) {
    this.selectedEvent = <Request>{};
    this.selectedEvent.description = e.calEvent.title;

    let start = e.calEvent.start;
    let end = e.calEvent.end;
    if (e.view.name === 'month') {
      start.stripTime();
    }

    if (end) {
      end.stripTime();
      this.selectedEvent.endTime = end.format();
    }

    this.selectedEvent.id = e.calEvent.id;
    this.selectedEvent.startTime = start.format();
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

  initReservationsForPartner(partnerId: number): void {
    this.getReservationsForPartner(partnerId).subscribe(
      (data: string) => {
        this._requests = ConverterUtils.reservationsFromJson(data);
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
              "duration":request.duration
            }
          )
        }

      }
    );
  }

  initReservationsForClient(clientId: number): void {
    this.getReservationsForClient(clientId).subscribe(
      (data: string) => {
        this._requests = ConverterUtils.reservationsFromJson(data);
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
              "duration":request.duration
            }
          )
        }

      }
    );
  }


  getReservationsForPartner(partnerId: number): Observable<string> {
    return this.httpWrap.get('http://localhost:8081/partner/reservationsforpartner/' + partnerId)
      .map((response: Response) => response.text());

  }


  getReservationsForClient(clientId: number): Observable<string> {
    return this.httpWrap.get('http://localhost:8081/partner/reservationsforclient/' + clientId)
      .map((response: Response) => response.text());

  }

  saveReservation(request: Request): Observable<string> {
    let data: string = JSON.stringify(request);
    return this.httpWrap.post('http://localhost:8081/partner/addReserve', data)
      .map((response: Response) => response.text());
  }

  deleteReservation(requestId: number): void {
    this.httpWrap.delete('http://localhost:8081/partner/deletereserve/' + requestId)
      .map((response: Response) => response.text()).subscribe(data => {
      let index: number = this.findEventIndexById(requestId);
      if (index >= 0) {
        this.schedule.splice(index, 1);
      }
      this.showEventDetails = false;
    });
  }


}
