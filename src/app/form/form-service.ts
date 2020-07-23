import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({providedIn : 'root'})
export class FormService{

    constructor(private http: HttpClient){

    }

    retrieveResults(params : any): Observable<any>{
        const options = {
            params: params
        }
        const url = 'swiftcode/v1/entity/get';
        return this.http.get(url, options);
    }

    retrievefardfar(): Observable<any>{
        const url = 'swiftcode/v1/fetch/fardfarlist';
        return this.http.get(url);
    }

    downloadAll(): Observable<Blob>{
        const url = 'swiftcode/v1/entity-csv';
        return this.http.get(url, { responseType: 'blob' });
    }

    downloadDate(date: string): Observable<Blob>{
        const url = 'swiftcode/v1/entity-csv/date';
        const params = {
            date: date
        }
        return this.http.get(url, {params: params, responseType: 'blob' });
    }

    downloadSearched(params: any): Observable<Blob>{
        const url = 'swiftcode/v1/entity/get/csvdownload';
        return this.http.get(url, {params: params, responseType: 'blob' });
    }

}