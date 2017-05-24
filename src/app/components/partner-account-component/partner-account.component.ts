import {OnInit, Component, ViewChild, ElementRef, Sanitizer, SecurityContext} from "@angular/core";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {PartnerService} from "../../_services/partner.service";
import {Partner} from "../../_models/partner.model";
import {HttpWrap} from "../../_commonServices/httpWrap.service";
import {ConverterUtils} from "../../_commonServices/converter.service";
import "rxjs/add/operator/map";
import {Service} from "../../_models/service.model";
import {ClassifierService} from "../../_services/classifier.service";
import {SelectItem, MenuItem} from "primeng/components/common/api";
import {FileUploader} from "ng2-file-upload";
import {FormControl} from "@angular/forms";
import {AddressService} from "../../_services/address.service";
import {Headers} from "@angular/http";
import {AuthenticationService} from "../../_services/authentication.service";
import {PartnerServiceDetail} from "../../_models/partner-service-detail.model";
import {EventListenerService} from "../../_services/event-listener.service";
import {Event} from "../../_models/event.model";
import {ScheduleService} from "../../_services/schedule.service";
import {Request} from "../../_models/request.model";
import {ServiceUrlProvider} from "../../_commonServices/mode-resolver.service";

@Component({
  moduleId: module.id,
  templateUrl: './partner-account.component.html',
  selector: 'partner-account',
  styleUrls: ['partner-account.component.css']
})
export class PartnerAccountComponent implements OnInit {

  public accountImageUploader: FileUploader;

  public partnerPhotoUploader: FileUploader;


  public _partner: Partner = <Partner>{};
  public _editedPartner: Partner = <Partner>{};
  public _averageRate: number = 2.5;

  public _isEditingPartnerMainDetails: boolean = false;
  public _isWrongTelephone: boolean = false;

  public _isEditingPartnerNoticeDetails: boolean = false;

  public mainServices: Service[] = [];

  public userProperties:MenuItem[]=[];

  public serviceSelectItems: SelectItem[] = [];
  public newSubServiceToPartner: PartnerServiceDetail = <PartnerServiceDetail>{};


  public showingFeedbacks: boolean = false;
  public showingNotices: boolean = false;
  public showingPhotos: boolean = false;
  public showingFollowers: boolean = false;
  public showingAddress: boolean = false;
  public showingServices: boolean = false;

  @ViewChild("search")
  public _searchElementRef: ElementRef;


  constructor(public router: Router,
              public partnerService: PartnerService,
              public classifierService: ClassifierService,
              public activatedRoute: ActivatedRoute,
              public sanitizer: Sanitizer,
              public addressService: AddressService,
              public eventListenerService: EventListenerService,
              public authenticationService: AuthenticationService,
              public scheduleService:ScheduleService) {

  }


  showFeedbacks(): void {
    this.showingFeedbacks = true;
  }

  hideFeedbacks(): void {
    this.showingFeedbacks = false;
  }

  showNotices(): void {
    this.showingNotices = true;
  }

  hideNotices(): void {
    this.showingNotices = false;
  }

  showPhotos(): void {
    this.showingPhotos = true;
  }

  hidePhotos(): void {
    this.showingPhotos = false;
  }

  closeNewRequests(): void {
    this.eventListenerService.deleteNewEventsFromPartner();
  }


  showFollowers(): void {
    this.showingFollowers = true;
  }

  hideFollowers(): void {
    this.showingFollowers = false;
  }

  showAddress(): void {

    this.addressService.initMapDetails(this._searchElementRef, this.partner.longitude, this.partner.latitude);
    this.showingAddress = true;
    google.maps.event.trigger($('#partnerAddressBlockId'), 'resize');

  }

  hideAddress(): void {
    this.showingAddress = false;
  }

  showServices(): void {
    this.showingServices = true;
  }

  hideServices(): void {
    this.showingServices = false;
  }

  ngOnInit(): void {
    this.authenticationService.checkUnSignedPartner();
    this.initPartner();

  }




  resize(event: any): void {
    google.maps.event.trigger($('#partnerAddressBlockId'), 'resize');
  }


  safeImage(path: string) {
    if (path === undefined || path === null) {
      return this.sanitizer.sanitize(SecurityContext.URL, `http://phylo.cs.mcgill.ca/assets/img/loading.gif`);
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
    google.maps.event.trigger($('#partnerAddressBlockId'), 'resize');
    this.addressService._isNeedChangeAddress = true;
  }

  editNotices() {
    this._isEditingPartnerNoticeDetails = true;
    this.clonePartnerNoticesDetails();
  }

  putMyLocation(): void {
    this.addressService.setCurrentPosition();
    this.addressService.getAddressByCoordinates(this.addressService.latitude, this.addressService.longitude)
      .subscribe(
        data => {
          for (let node of JSON.parse(data)["results"]) {
            this._editedPartner.address = node.formatted_address;
            break;
          }

        }
      );

  }


  cancelNotices() {
    this._isEditingPartnerNoticeDetails = false;
    this._editedPartner.notices = null;

  }

  saveNotice() {
    let data = JSON.stringify(this._editedPartner);
    this.partnerService.savePartnerNotices(data).subscribe(
      data => {
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


  needChangeAddress(): boolean {
    return this.addressService._isNeedChangeAddress;
  }


  public initPartner(): void {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      let partnerId = +params['partnerId'];
      this.partnerService.getPartnerById(partnerId).subscribe(
        (responeJson: string) => {
          this._partner = ConverterUtils.partnerFromJson(responeJson);
          this.initFileUploader();
          this.initPartnerPhotoUploader();
          this.initPartnerServices();
          this.autoCheckRequestExisting();
          this.initUserProperties();
          setInterval(() => {
            this.autoCheckRequestExisting()
          }, 4 * 1000);
          this.eventListenerService.autoCheckNewEvents(this._partner.id);
          setInterval(() => {
            this.eventListenerService.autoCheckNewEvents(this._partner.id);
          }, 1000 * 10);
        });
    })
  }

  public requestNow: Request = <Request>{};
  public _thereIsNowRequest: boolean = false;
  public _thereWasNewRequest: boolean = false;

  completeReservation(): void {
    this.requestNow.status = 3; //status of done requests
    this.requestNow.partnerId = this.partner.id;
    this.scheduleService.updateReservation(this.requestNow).subscribe(
      data => {
        this.scheduleService.initReservationsForPartner(this.partner.id,1);
        this._thereIsNowRequest = false;
      }
    );
  }


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
    if(this._thereWasNewRequest && !this._thereIsNowRequest){
      this.completeReservation();
      this._thereWasNewRequest = false;
    }
  }

  isNowEvent(event: Request): boolean {
    let date: Date = new Date();
    return date.getTime() > event.startTime.getTime() && date.getTime() < event.endTime.getTime();
  }


  initPartnerServices(): void {
    this.partnerService.getPartnerServiceDetails(this.partner.id).subscribe(
      data => {
        this.partner.services = ConverterUtils.partnerServicesFromJson(data);
        this.prepareServicesByMainId(this.partner.serviceId);
      }
    )
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

  public initFileUploader(): void {
    this.accountImageUploader = new FileUploader({
      url: ServiceUrlProvider.getPartnerServiceUrl() + "partner/uploadAccountImage",
      additionalParameter: {"id": this._partner.id}
    });
    this.accountImageUploader.onCompleteAll = () => {
      this.setAccountLogo();
    };
    this.accountImageUploader.onAfterAddingFile = () => {
      this.uploadAccountImage();
    };
  }

  public initPartnerPhotoUploader(): void {
    this.partnerPhotoUploader = new FileUploader({
      url: ServiceUrlProvider.getPartnerServiceUrl() + "partner/addImageToPartnier",
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

  public initUserProperties(){
    this.userProperties = [
      {label: 'Workspace', icon: 'fa fa-list-ul', command: () => {
        this.goToMyOrders();
      }},
      {label: 'Sign Out', icon: 'fa fa-sign-out', command: () => {
        this.logout();
      }},
    ];
  }

  uploadNewPhoto(): void {
    for (let item of this.partnerPhotoUploader.queue) {
      item.headers = new Headers({"Content-Type": "multipart/form-data"})
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
        this._partner.photoDtos = ConverterUtils.getPartnerPhotosFromJsonString(responseJson);
        this.partnerPhotoUploader.clearQueue();
      })

  }


  prepareServicesByMainId(id: number): void {
    this.classifierService.getGeneralServices().subscribe((servicesJsonString: string) => {
        this.mainServices = ConverterUtils.servicesFromJson(servicesJsonString);
        this.mainServices.forEach((service: Service) => {
          if (service._id === id) {
            this._partner.serviceName = service._serviceName_arm;
            this.classifierService.getServicesByParent(id).subscribe(
              data => {
                this.mainServices = ConverterUtils.servicesFromJson(data);
                this.initServiceSelectItems();
                for (let serviceOfPartner of this.partner.services) {
                  for (let service of this.mainServices) {
                    if (serviceOfPartner.serviceId === service._id) {
                      serviceOfPartner.service = service;
                      break;
                    }
                  }
                }
              }
            );
          }
        });
      }
    );
  }


  public isAbsenceService: boolean = false;
  public isAbsenceDuration: boolean = false;

  addService(): void {

    if (!this.newSubServiceToPartner.service) {
      this.isAbsenceService = true;
    }
    if (!this.newSubServiceToPartner.defaultduration || this.newSubServiceToPartner.defaultduration <= 0) {
      this.isAbsenceDuration = true;
    }

    if (!this.isAbsenceDuration && !this.isAbsenceService) {
      this.newSubServiceToPartner.serviceId = this.newSubServiceToPartner.service._id;
      this.newSubServiceToPartner.partnerId = this.partner.id;
      this.partnerService.savePartnerServiceDetails(this.newSubServiceToPartner).subscribe(
        data => {
          this.partner.services.push(this.newSubServiceToPartner);
          this.newSubServiceToPartner = <PartnerServiceDetail>{};
          this.isAbsenceDuration = false;
          this.isAbsenceService = false;
        }
      );
    }

  }


  public initServiceSelectItems() {

    this.serviceSelectItems.push({label: '--Select Service--', value: null});
    this.newSubServiceToPartner.service = this.serviceSelectItems[0].value;
    for (let service of this.mainServices) {
      this.serviceSelectItems.push({label: service._serviceName_arm, value: service});
    }

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
    if (!this._editedPartner.telephone || this._editedPartner.telephone.length < 5) {
      this._isWrongTelephone = true;
    }
    if (!this._isWrongTelephone) {
      this._isEditingPartnerMainDetails = false;
      this.saveEditedMainInfo();
      this._isWrongTelephone = false;
    }
  }

  public saveEditedMainInfo(): void {

    this._editedPartner.id = this._partner.id;
    let data = JSON.stringify(this._editedPartner);
    this.partnerService.savePartnerEditedMainInfo(data)
      .subscribe(data => {
        this.loadEditedMainInfoIntoPartner();
      })
  }

  public clonePartnerMainDetails(): void {
    this._editedPartner.address = this._partner.address;
    this._editedPartner.telephone = this._partner.telephone;
  }

  public clonePartnerNoticesDetails(): void {
    this._editedPartner.id = this._partner.id;
    this._editedPartner.notices = this._partner.notices;
  }

  public loadEditedMainInfoIntoPartner(): void {
    this._partner.address = this._editedPartner.address;
    this._partner.telephone = this._editedPartner.telephone;
  }

  public uploadAccountImage(): void {
    for (let item of this.accountImageUploader.queue) {
      item.upload();
    }
  }

  goToMyOrders(): void {
    this.router.navigate(["partneraccount/schedule"], {
      queryParams: {
        partnerId: this.partner.id,
        serviceId: this.partner.serviceId
      }
    });
  }

  addressMarkerDragEnd(event: any): void {
    this.addressService.longitude = event.coords.lng;
    this.addressService.latitude = event.coords.lat;
    this.addressService.getAddressByCoordinates(event.coords.lat, event.coords.lng)
      .subscribe(
        data => {
          for (let node of JSON.parse(data)["results"]) {
            this._editedPartner.address = node.formatted_address;
            break;
          }

        }
      );
  }

  deletePartnerPhoto(photoId: number) {
    this.partnerService.deletePartnerPhoto(photoId).subscribe(
      () => {
        this.partnerService.getPartnerPhotos(this.partner.id).subscribe(
          data => {
            this.partner.photoDtos = ConverterUtils.getPartnerPhotosFromJsonString(data);
          }
        )
      }
    )
  }

  logout(): void {
    this.partnerService.logout(this.partner.id);
  }

  editInfoOfPartner(data: PartnerServiceDetail) {
    data.isEditing = true;
  }

  deleteInfoOfPartner(data: PartnerServiceDetail) {
    this.partnerService.deletePartnerServiceDetails(data.id).subscribe(
      data => {
        this.partnerService.getPartnerServiceDetails(this.partner.id).subscribe(
          data => {
            this.partner.services = ConverterUtils.partnerServicesFromJson(data);
            for (let serviceOfPartner of this.partner.services) {
              for (let service of this.mainServices) {
                if (serviceOfPartner.serviceId === service._id) {
                  serviceOfPartner.service = service;
                  break;
                }
              }
            }
          }
        )
      }
    )
  }

  cancelInfoOfPartner(data: PartnerServiceDetail) {
    data.isEditing = false;
  }

  updatePartnerServiceDetail(data: PartnerServiceDetail) {
    this.partnerService.updatePartnerServiceDetails(data).subscribe(
      responseText => {
        data.isEditing = false;
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
