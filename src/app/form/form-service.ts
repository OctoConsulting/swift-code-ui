import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';

@Injectable({providedIn : "root"})
export class FormService{

    constructor(private http: HttpClient){

    }

    retrieveResults(){
        const url = '';
        const params = {
        };

        return this.http.get(url, params)
    }
}