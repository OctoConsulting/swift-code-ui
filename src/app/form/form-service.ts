import { HttpClient } from '@angular/common/http'

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