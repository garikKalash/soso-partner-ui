import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {Service} from "../../_models/service.model";
import {PartnerService} from "../../_services/partner.service";
import {ClassifierService} from "../../_services/classifier.service";
import {Partner} from "../../_models/partner.model";
import {SelectItem} from "primeng/components/common/api";
import {ConverterUtils} from "../../_commonServices/converter.service";


@Component({
  moduleId: module.id,
  templateUrl: './connectToSystem.component.html',
  selector: 'connect-to-system-component',
  styleUrls: ['connectToSystem.component.css']
})
export class ConnectToSystemComponent implements OnInit {
  private _newPartner: Partner = <Partner>{};
  loading = false;

  private services: Service[] = [];
  private servicesAsSelectItems: SelectItem[] = [];
  private selectedService: Service;

  private _isShortTelephone: boolean = false;
  private _isDoubleUsername: boolean = false;
  private _isInvalidPassword: boolean = false;
  private _isInvalidUsername: boolean = false;
  private _isDoubleTelephone: boolean = false;
  private _isInvalidName: boolean = false;
  private _isInvalidServiceId: boolean = false;

  constructor(private router: Router,
              private partnerService: PartnerService,
              private classifierService: ClassifierService) {
  }

  ngOnInit(): void {
    this.initServices();
  }

  initServices(): void {
    this.classifierService.getGeneralServices().subscribe(
      data => {
        this.services = ConverterUtils.servicesFromJson(data);
        for (let service of this.services) {
          this.servicesAsSelectItems.push({label: service._serviceName_arm, value: service});

        }
      }
    )
  }

  register() {
    if (this.selectedService) {
      this._newPartner.serviceId = this.selectedService._id;
    }
    this.partnerService.register(this._newPartner).subscribe(
      data => {

        if (<boolean>JSON.parse(data)["isShortTelephone"]) {
          this._isShortTelephone = JSON.parse(data)["isShortTelephone"]=== 'true';
        }
        if (<boolean>JSON.parse(data)["isDoubleUsername"]) {
          this._isDoubleUsername = JSON.parse(data)["isDoubleUsername"]=== 'true';
        }
        if (<boolean>JSON.parse(data)["isInvalidPassword"]) {
          this._isInvalidPassword = JSON.parse(data)["isInvalidPassword"]=== 'true';
        }
        if (<boolean>JSON.parse(data)["isInvalidUsername"]) {

          this._isInvalidUsername = JSON.parse(data)["isInvalidUsername"]=== 'true';
        }
        if (<boolean>JSON.parse(data)["isDoubleTelephone"]) {
          this._isDoubleTelephone = JSON.parse(data)["isDoubleTelephone"]=== 'true';
        }
        if (<boolean>JSON.parse(data)["isInvalidName"]) {
          this._isInvalidName = JSON.parse(data)["isInvalidName"]=== 'true';
        }
        if (<boolean>JSON.parse(data)["isInvalidServiceId"]) {
          this._isInvalidServiceId = JSON.parse(data)["isInvalidServiceId"]=== 'true';
        }
        if (!this._isShortTelephone && !this._isDoubleUsername && !this._isInvalidPassword && !this._isInvalidUsername && !this._isDoubleTelephone && !this._isInvalidName && !this._isInvalidServiceId)
          this._newPartner.password = '';
        this._newPartner.id = +ConverterUtils.newPartnerIdFromJson(data);
        this.partnerService.getAndPutToken(this._newPartner);

      });

  }
}

