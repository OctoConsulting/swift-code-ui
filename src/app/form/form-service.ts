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
}