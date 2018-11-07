import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Sheep } from './sheep';
import { Observable } from 'rxjs';
import { SheepDetentionIceLocator } from './sheep-ice-locator';

@Injectable()
export class SheepService {

  constructor(private _http: HttpClient) { }

  get newSheep(): Sheep {
    return {
      _id: 'new',
      alienNo: '',
      firstName: '',
      middleName: '',
      lastName: '',
      nationality: '',
      districtOfCourt: '',
      division: '',
      detentionFacilityUnit: '',
      detentionFacilityName: '',
      detentionFacilityAddress: '',
      detentionFacilityCityStateZip: '',
      dateOfCustody: new Date(),
      dateOfFinalOrderOfRemoval: new Date(),
      iceReqTravelDocStartDate: '',
      iceReqTravelDocEndDate: '',
      districtCourtCityAndState: '',
      habeasFilingDate: new Date(),
      totalMonthsInCustody: 0,
      iceFieldOfficeName: '',
      iceFieldOfficeDirectorName: '',
      statementOfCantAffordLawyer: '',
      statementOfUnableToUnderstandLaws: '',
      createdDate: new Date(),
      __v: ''
    };
  }

  getSheep(): Observable<Array<Sheep>> {
    return this._http.get<Array<Sheep>>('/api/sheep');
  }

  findSheep(id: string): Observable<Sheep> {
    return this._http.get<Sheep>(`/api/sheep/${id}`);
  }

  saveSheep(sheep: Sheep): Observable<Sheep> {
    if (sheep._id === 'new') {
      delete sheep._id;
      return this._http.post<Sheep>('/api/sheep', sheep);
    } else {
      return this._http.put<Sheep>('/api/sheep', sheep);
    }
  }

  findDetentionInIceLocator(alienNo: string, nationality: string) {
    return this._http.post<SheepDetentionIceLocator>('/api/icelocator/detention', {
      'alienno': alienNo,
      'country': nationality
    });
  }
}
