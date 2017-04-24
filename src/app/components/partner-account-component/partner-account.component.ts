import {OnInit, Component, ViewChild, ElementRef, Sanitizer, SecurityContext} from "@angular/core";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {PartnerService} from "../../_services/partner.service";
import {Partner} from "../../_models/partner.model";
import {HttpWrap} from "../../_commonServices/httpWrap.service";
import {ConverterUtils} from "../../_commonServices/converter.service";
import "rxjs/add/operator/map";
import {Service} from "../../_models/service.model";
import {ClassifierService} from "../../_services/classifier.service";
import {SelectItem} from "primeng/components/common/api";
import {FileUploader} from "ng2-file-upload";
import {FormControl} from "@angular/forms";
import {AddressService} from "../../_services/address.service";
import {MarkerManager, SebmGoogleMapMarker} from "angular2-google-maps/core";
import {Headers} from "@angular/http";

@Component({
  moduleId: module.id,
  templateUrl: './partner-account.component.html',
  selector: 'partner-account',
  styleUrls: ['partner-account.component.css']
})
export class PartnerAccountComponent implements OnInit {

  private accountImageUploader: FileUploader;

  private partnerPhotoUploader: FileUploader;


  private _partner: Partner = <Partner>{};
  private _editedPartner: Partner = <Partner>{};
  private _averageRate: number = 2.5;

  private _isEditingPartnerMainDetails: boolean = false;
  private _isEditingPartnerNoticeDetails: boolean = false;

  private services: Service[] = [];
  private serviceSelectItems: SelectItem[] = [];


  @ViewChild("search")
  private _searchElementRef: ElementRef;


  constructor(private router: Router,
              private partnerService: PartnerService,
              private classifierService: ClassifierService,
              private activatedRoute: ActivatedRoute,
              private httpWrap: HttpWrap,
              private sanitizer: Sanitizer,
              private addressService: AddressService,) {

  }

  safeImage(path:string){
    if(path === undefined || path === null){
      return this.sanitizer.sanitize(SecurityContext.URL, `/src/loading-25x25.gif`);
    }
    return this.sanitizer.sanitize(SecurityContext.URL, `${path}`);
  }

  mapLongitude(): number {
    return this.addressService.longitude;
  }

  mapLatitude(): number {
    return this.addressService.latitude;
  }

  mapZoom(): number {
    return this.addressService.zoom;
  }




  mapSearchControl(): FormControl {
    return this.addressService.searchControl;
  }

  changeAddress() {
     this.addressService._isNeedChangeAddress = true;
  }

  editNotices(){
    this._isEditingPartnerNoticeDetails = true;
    this.clonePartnerNoticesDetails();
  }

  cancelNotices(){
    this._isEditingPartnerNoticeDetails = false;
    this._editedPartner.notices = null;

  }


  saveNotice(){
    let data =  JSON.stringify(this._editedPartner);
    this.partnerService.savePartnerNotices(data).subscribe(
      data =>{
        this._partner.notices = this._editedPartner.notices;
        this._isEditingPartnerNoticeDetails = false;
      }
    )
  }

  saveAddress() {
    this._editedPartner.id = this._partner.id;
    this._editedPartner.longitude = this.mapLongitude();
    this._editedPartner.latitude = this.mapLatitude();
    let data = JSON.stringify(this._editedPartner);

    this.partnerService.savePartnerAddress(data)
      .subscribe((data: string) => {
        this.addressService._isNeedChangeAddress = false;
        this.addressService.zoom = 15;
        this._partner.address = this._editedPartner.address;
        this._partner.longitude = this.mapLongitude();
        this._partner.latitude = this.mapLatitude();
      });


  }

  needChangeAddress():boolean{
    return this.addressService._isNeedChangeAddress;
  }


  ngOnInit(): void {
    this.initPartner();
  }




  private initPartner(): void {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      let partnerId = +params['partnerId'];
      this.partnerService.getPartnerById(partnerId).subscribe(
        (responeJson: string) => {
          this._partner = ConverterUtils.partnerFromJson(responeJson);
          this.setServiceNameById(this._partner.serviceId);
          this.initFileUploader();
          this.initPartnerPhotoUploader();
          this.addressService.initMapDetails(this._searchElementRef,this._partner.longitude,this._partner.latitude);

        });
    })
  }

  private initFileUploader(): void {
    this.accountImageUploader = new FileUploader({
      url: "http://localhost:8081/partner/uploadAccountImage",
      additionalParameter: {"id": this._partner.id}
    });
    this.accountImageUploader.onCompleteAll = () => {
      this.setAccountLogo();
    };
    this.accountImageUploader.onAfterAddingFile = () => {
      this.uploadAccountImage();
    };
  }
   private initPartnerPhotoUploader(): void {
    this.partnerPhotoUploader = new FileUploader({
      url: "http://localhost:8081/partner/addImageToPartnier",
      additionalParameter: {"id": this._partner.id},
      removeAfterUpload: true,
    });
    this.partnerPhotoUploader.onCompleteAll = () => {
      this.getPartnerPhotos();
    };
    this.partnerPhotoUploader.onAfterAddingFile = () => {
      this.uploadNewPhoto();
    };


  }

  uploadNewPhoto():void{
    for (let item of this.partnerPhotoUploader.queue) {
      item.headers = new Headers({"Content-Type":"multipart/form-data"})
      item.upload();
    }

  }




  setAccountLogo(): void {
    this.partnerService.getPartnerImage(this._partner.id)
      .subscribe((responseJson: string) => {
        this._partner.imgpath = ConverterUtils.getAccountImageUrlFromJsonString(responseJson);
      });

  }

  getPartnerPhotos(): void {
    this.partnerService.getPartnerPhotos(this._partner.id)
      .subscribe((responseJson: string) => {
        this._partner.images = ConverterUtils.getPartnerPhotosUrlsFromJsonString(responseJson);
        this.partnerPhotoUploader.clearQueue();
      })

  }


  setServiceNameById(id: number): void {
    this.classifierService.getServices().subscribe((servicesJsonString: string) => {
        this.services = ConverterUtils.servicesFromJson(servicesJsonString);
        this.services.forEach((service: Service) => {
          if (service._id === id) {
            this._partner.serviceName = service._serviceName_arm;
          }
        });
      }
    );

  }

  private initServices(): void {
    this.classifierService.getServices()
      .subscribe((servicesJsonString: string) => {
          this.services = ConverterUtils.servicesFromJson(servicesJsonString);
          this.initServiceSelectItems();
        }
      )
  }

  private initServiceSelectItems() {
    this.serviceSelectItems.push({label: '--Select Service--', value: null});
    this.services.forEach((service: Service) => {
      this.serviceSelectItems.push({label: service._serviceName_arm, value: service});
    });
  }

  editPartnerMainInfo(): void {
    this._isEditingPartnerMainDetails = true;
    this.clonePartnerMainDetails()
  }


  cancelEditingMainInfo(): void {
    this._isEditingPartnerMainDetails = false;
    this.clearEditedMainInfo();
  }

  clearEditedMainInfo(): void {
    this._editedPartner.address = '';
    this._editedPartner.telephone = '';
  }

  saveMainInfo(): void {
    this._isEditingPartnerMainDetails = false;
    this.saveEditedMainInfo();
  }

  private saveEditedMainInfo(): void {

    this._editedPartner.id = this._partner.id;
    let data = JSON.stringify(this._editedPartner);
    this.partnerService.savePartnerEditedMainInfo(data)
      .subscribe(data => {
        this.loadEditedMainInfoIntoPartner();
      })
  }

  private clonePartnerMainDetails(): void {
    this._editedPartner.address = this._partner.address;
    this._editedPartner.telephone = this._partner.telephone;
  }

  private clonePartnerNoticesDetails(): void {
    this._editedPartner.id = this._partner.id;
    this._editedPartner.notices = this._partner.notices;
  }

  private loadEditedMainInfoIntoPartner(): void {
    this._partner.address = this._editedPartner.address;
    this._partner.telephone = this._editedPartner.telephone;
  }

  private uploadAccountImage(): void {
    for (let item of this.accountImageUploader.queue) {
      item.upload();
    }
  }

  goToMyOrders():void{
    this.router.navigate(["partneraccount/schedule"],{queryParams: {partnerId:this.partner.id}});
  }

  addressMarkerDragEnd(event:any):void{
    this.addressService.longitude = event.coords.lng;
    this.addressService.latitude = event.coords.lat;
    this.addressService.getAddressByCoordinates( event.coords.lat, event.coords.lng)
      .subscribe(
      data => {
        for(let node of JSON.parse(data)["results"]){
          this._editedPartner.address = node.formatted_address;
          break;
        }

      }
    )
  }

  get partner(): Partner {
    return this._partner;
  }

  set partner(value: Partner) {
    this._partner = value;
  }


}
