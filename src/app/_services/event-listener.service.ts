import {Injectable} from "@angular/core";
import {HttpWrap} from "../_commonServices/httpWrap.service";
import {ConverterUtils} from "../_commonServices/converter.service";
import {Response} from "@angular/http";
import {Event} from "../_models/event.model";
import {ServiceUrlProvider} from "../_commonServices/mode-resolver.service";


@Injectable()
export class EventListenerService {
  private myUrl:string = ServiceUrlProvider.getEventListenerServiceUrl();


  private _newEvents: Event[] = [];
  private _thereIsNewEvent: boolean = false;

  constructor(private httpWrap: HttpWrap) {
  }

  autoCheckNewEvents(partnerId: number): void {
    if (!this._thereIsNewEvent) {
      this.httpWrap.get(this.myUrl + 'eventsListener/neweventsbypartner/' + partnerId).map((response: Response) => response.text()).subscribe(
        (data: string) => {
          this._newEvents = ConverterUtils.eventsFromJson(data);
          this._thereIsNewEvent = this._newEvents.length != 0;
        }
      );
    }
  }

  deleteNewEventsFromPartner(): void {
    for (let event of this._newEvents) {
      this.httpWrap.delete(this.myUrl + 'eventsListener/deleteneweventbypartner/' + event.id).map((response: Response) => response.text()).subscribe(
        (data: string) => {
          this._thereIsNewEvent = false;
        }
      );
    }
  }


  get newEvents(): Event[] {
    return this._newEvents;
  }

  set newEvents(value: Event[]) {
    this._newEvents = value;
  }

  get thereIsNewEvent(): boolean {
    return this._thereIsNewEvent;
  }

  set thereIsNewEvent(value: boolean) {
    this._thereIsNewEvent = value;
  }
}


