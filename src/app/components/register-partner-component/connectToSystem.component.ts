import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {Service} from "../../_models/service.model";
import {PartnerService} from "../../_services/partner.service";
import {ClassifierService} from "../../_services/classifier.service";





@Component({
  moduleId: module.id,
  templateUrl: './connectToSystem.component.html',
  selector: 'connect-to-system-component',
  styleUrls: ['connectToSystem.component.css']
})
export class ConnectToSystemComponent implements OnInit {
  model: any = {};
  loading = false;

  private services:Service[] = [];
  private selectedService: string;

  constructor(
    private router: Router,
    private partnerService: PartnerService,
    private classifierService: ClassifierService) { }

  ngOnInit(): void {
    /*this.services = this.classifierService.getAllServices();
    this.selectedService = this.labelForService(this.services[0]);*/
  }

  labelForService(item: Service): string {
    return null; //item.name;
  }

  register() {
    this.loading = true;
   /* this.providerService.create(this.model)
      .subscribe(
        data => {
          this.router.navigate(['/']);
        }
        );*/
  }
}

