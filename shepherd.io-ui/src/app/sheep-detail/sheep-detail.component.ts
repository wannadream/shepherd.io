import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSelect, MatSnackBar, MatDialog } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { ObservableMedia } from '@angular/flex-layout';
import { BaseComponent } from '../base.component';
import { Sheep } from '../sheep';
import { SheepService } from '../sheep.service';
import { HelperService } from '../helper.service';
import { environment } from '../../environments/environment';
import { SheepDetentionIceLocator } from '../sheep-ice-locator';
import { IceLocatorDialogComponent } from '../ice-locator-dialog/ice-locator-dialog.component';

@Component({
  selector: 'app-sheep-detail',
  templateUrl: './sheep-detail.component.html',
  styleUrls: ['./sheep-detail.component.css']
})
export class SheepDetailComponent extends BaseComponent implements OnInit {

  sheep: Sheep;
  sheepForm: FormGroup;
  countries: Array<Array<string>>;
  documents: Array<any>;

  @ViewChild('docToGenerate') docToGenerate: MatSelect;

  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _dialog: MatDialog,
    private _sheepSvc: SheepService,
    private _h: HelperService,
    private _observableMedia: ObservableMedia) {
    super();
    this.createForm();
  }

  ngOnInit() {
    this.baseInit(this._observableMedia);
    const id = this._route.snapshot.paramMap.get('id');
    if (!id || id === 'new') {
      this.sheep = this._sheepSvc.newSheep;
    } else {
      this._sheepSvc.findSheep(id).subscribe(data => {
        this.sheep = this._sheepSvc.newSheep;
        Object.keys(data).forEach((val) => {
          this.sheep[val] = data[val];
        });
        this.modelToForm();
      });
    }
    this._h.getCountries().subscribe(data => {
      const _contries: Array<Array<string>> = [];
      for (const key of Object.keys(data)) {
        _contries.push([key, data[key]]);
      }
      this.countries = _contries;
    });
    this._h.getDocuments().subscribe(data => this.documents = data);
  }

  get alienNo() { return this.sheepForm.get('alienNo'); }
  get firstName() { return this.sheepForm.get('firstName'); }
  get middleName() { return this.sheepForm.get('middleName'); }
  get lastName() { return this.sheepForm.get('lastName'); }
  get nationality() { return this.sheepForm.get('nationality'); }
  get districtOfCourt() { return this.sheepForm.get('districtOfCourt'); }
  get division() { return this.sheepForm.get('division'); }
  get detentionFacilityUnit() { return this.sheepForm.get('detentionFacilityUnit'); }
  get detentionFacilityName() { return this.sheepForm.get('detentionFacilityName'); }
  get detentionFacilityAddress() { return this.sheepForm.get('detentionFacilityAddress'); }
  get detentionFacilityCityStateZip() { return this.sheepForm.get('detentionFacilityCityStateZip'); }
  get dateOfCustody() { return this.sheepForm.get('dateOfCustody'); }
  get dateOfFinalOrderOfRemoval() { return this.sheepForm.get('dateOfFinalOrderOfRemoval'); }
  get iceReqTravelDocStartDate() { return this.sheepForm.get('iceReqTravelDocStartDate'); }
  get iceReqTravelDocEndDate() { return this.sheepForm.get('iceReqTravelDocEndDate'); }
  get districtCourtCityAndState() { return this.sheepForm.get('districtCourtCityAndState'); }
  get habeasFilingDate() { return this.sheepForm.get('habeasFilingDate'); }
  get totalMonthsInCustody() { return this.sheepForm.get('totalMonthsInCustody'); }
  get iceFieldOfficeName() { return this.sheepForm.get('iceFieldOfficeName'); }
  get iceFieldOfficeDirectorName() { return this.sheepForm.get('iceFieldOfficeDirectorName'); }
  get statementOfCantAffordLawyer() { return this.sheepForm.get('statementOfCantAffordLawyer'); }
  get statementOfUnableToUnderstandLaws() { return this.sheepForm.get('statementOfUnableToUnderstandLaws'); }

  get showDocGenerate() {
    return this.sheep && this.sheep._id && this.sheep._id !== 'new';
  }

  get showViewIceData() {
    return this.alienNo.value && this.alienNo.value.trim() !== ''
      && this.nationality.value && this.nationality.value.trim() !== '';
  }

  onSubmit() {
    if (this.sheepForm.valid) {
      this.formToModel();
      this._sheepSvc.saveSheep(this.sheep).subscribe(data => {
        this.sheep = data;
        this._snackBar.open('Sheep data saved.', null, { duration: 500 });
      });
    }
  }

  onGenerate() {
    const doc = this.docToGenerate.value;
    if (doc && doc !== '') {
      this._snackBar.open('Processing document ...', null, { duration: 500 });
      this._h.getDocument(doc, this.sheep).subscribe(
        data => {
          const blob = new Blob([data], {
            type: 'application/pdf'
          });
          window.open(URL.createObjectURL(blob));
        }
      );
    } else {
      this._snackBar.open('Please select a document first.', null, { duration: 500 });
    }
  }

  onViewIceData() {
    const snackBarMsg = this._snackBar.open('Gathering ICE locator data ...', null);
    this._sheepSvc.findDetentionInIceLocator(this.alienNo.value, this.nationality.value)
      .subscribe(detention => {
        snackBarMsg.dismiss();
        const dialog = this._dialog.open(IceLocatorDialogComponent, {
          disableClose: true,
          data: detention
        });
        dialog.afterClosed().subscribe((result: SheepDetentionIceLocator) => {
          if (result && result.address) {
            let address = result.address.line1;
            if (result.address.line2) {
              address += ',' + result.address.line2;
            }
            if (result.address.line3) {
              address += ',' + result.address.line3;
            }
            this.detentionFacilityAddress.setValue(address);
            this.detentionFacilityCityStateZip.setValue(`${result.address.city}, ${result.address.stateCode} ${result.address.zipCode}`);
          }
        });
      }, (res: HttpErrorResponse) => {
        snackBarMsg.dismiss();
        this._dialog.open(IceLocatorDialogComponent, {
          disableClose: true,
          data: res.error
        });
      });
  }

  onBack() {
    history.go(-1);
  }

  private createForm() {
    this.sheepForm = new FormGroup({
      _id: new FormControl(''),
      alienNo: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      middleName: new FormControl(''),
      lastName: new FormControl('', [Validators.required]),
      nationality: new FormControl('', [Validators.required]),
      districtOfCourt: new FormControl(''),
      division: new FormControl(''),
      detentionFacilityUnit: new FormControl(''),
      detentionFacilityName: new FormControl(''),
      detentionFacilityAddress: new FormControl(''),
      detentionFacilityCityStateZip: new FormControl(''),
      dateOfCustody: new FormControl('', [Validators.required]),
      dateOfFinalOrderOfRemoval: new FormControl(''),
      iceReqTravelDocStartDate: new FormControl(''),
      iceReqTravelDocEndDate: new FormControl(''),
      districtCourtCityAndState: new FormControl(''),
      habeasFilingDate: new FormControl(''),
      totalMonthsInCustody: new FormControl(''),
      iceFieldOfficeName: new FormControl(''),
      iceFieldOfficeDirectorName: new FormControl(''),
      statementOfCantAffordLawyer: new FormControl(''),
      statementOfUnableToUnderstandLaws: new FormControl('')
    });
  }

  private modelToForm() {
    delete this.sheep.createdDate;
    delete this.sheep.__v;
    // this.sheepForm.setValue(this.sheep);
    this.sheepForm.patchValue(this.sheep);
  }

  private formToModel() {
    this.sheep.alienNo = this.sheepForm.get('alienNo').value;
    this.sheep.firstName = this.sheepForm.get('firstName').value;
    this.sheep.middleName = this.sheepForm.get('middleName').value;
    this.sheep.lastName = this.sheepForm.get('lastName').value;
    this.sheep.nationality = this.sheepForm.get('nationality').value;
    this.sheep.districtOfCourt = this.sheepForm.get('districtOfCourt').value;
    this.sheep.division = this.sheepForm.get('division').value;
    this.sheep.detentionFacilityUnit = this.sheepForm.get('detentionFacilityUnit').value;
    this.sheep.detentionFacilityName = this.sheepForm.get('detentionFacilityName').value;
    this.sheep.detentionFacilityAddress = this.sheepForm.get('detentionFacilityAddress').value;
    this.sheep.detentionFacilityCityStateZip = this.sheepForm.get('detentionFacilityCityStateZip').value;
    this.sheep.dateOfCustody = this.sheepForm.get('dateOfCustody').value;
    this.sheep.dateOfFinalOrderOfRemoval = this.sheepForm.get('dateOfFinalOrderOfRemoval').value;
    this.sheep.iceReqTravelDocStartDate = this.sheepForm.get('iceReqTravelDocStartDate').value;
    this.sheep.iceReqTravelDocEndDate = this.sheepForm.get('iceReqTravelDocEndDate').value;
    this.sheep.districtCourtCityAndState = this.sheepForm.get('districtCourtCityAndState').value;
    this.sheep.habeasFilingDate = this.sheepForm.get('habeasFilingDate').value;
    this.sheep.totalMonthsInCustody = this.sheepForm.get('totalMonthsInCustody').value;
    this.sheep.iceFieldOfficeName = this.sheepForm.get('iceFieldOfficeName').value;
    this.sheep.iceFieldOfficeDirectorName = this.sheepForm.get('iceFieldOfficeDirectorName').value;
    this.sheep.statementOfCantAffordLawyer = this.sheepForm.get('statementOfCantAffordLawyer').value;
    this.sheep.statementOfUnableToUnderstandLaws = this.sheepForm.get('statementOfUnableToUnderstandLaws').value;
  }
}
