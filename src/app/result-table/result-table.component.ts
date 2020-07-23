import {Component, Input, Injectable} from '@angular/core';

export interface Entity {
  name: string;
  duns: string;
  far: string;
  answerID: number;
  response: string;
}

// const ELEMENT_DATA: Entity[] = [
//   {name:'name 1', duns:'111111111', far:'FAR 1', answerID: 1, response:'response1'},
//   {name:'name 2', duns:'222222222', far:'FAR 2', answerID: 2, response:'response2'},
//   {name:'name 3', duns:'333333333', far:'FAR 3', answerID: 3, response:'response3'},
//   {name:'name 4', duns:'444444444', far:'FAR 4', answerID: 4, response:'response4'},
//   {name:'name 5', duns:'555555555', far:'FAR 5', answerID: 5, response:'response5'},
//   {name:'name 6', duns:'666666666', far:'FAR 6', answerID: 6, response:'response6'},
//   {name:'name 7', duns:'777777777', far:'FAR 7', answerID: 7, response:'response7'},
//   {name:'name 8', duns:'888888888', far:'FAR 8', answerID: 8, response:'response8'},
//   {name:'name 9', duns:'999999999', far:'FAR 9', answerID: 9, response:'response9'},
//   {name:'name 9', duns:'999999999', far:'FAR 9', answerID: 9, response:'response9'},
//   {name:'name 9', duns:'999999999', far:'FAR 9', answerID: 9, response:'response9'},
//   {name:'name 9', duns:'999999999', far:'FAR 9', answerID: 9, response:'response9'},
//   {name:'name 9', duns:'999999999', far:'FAR 9', answerID: 9, response:'response9'},
//   {name:'name 9', duns:'999999999', far:'FAR 9', answerID: 9, response:'response9'},
//   {name:'name 9', duns:'999999999', far:'FAR 9', answerID: 9, response:'response9'},
//   {name:'name 9', duns:'999999999', far:'FAR 9', answerID: 9, response:'response9'},
//   {name:'name 9', duns:'999999999', far:'FAR 9', answerID: 9, response:'response9'},
//   {name:'name 9', duns:'999999999', far:'FAR 9', answerID: 9, response:'response9'},
//   {name:'name 9', duns:'999999999', far:'FAR 9', answerID: 9, response:'response9'},
//   {name:'name 9', duns:'999999999', far:'FAR 9', answerID: 9, response:'response9'},
//   {name:'name 9', duns:'999999999', far:'FAR 9', answerID: 9, response:'response9'},
//   {name:'name 9', duns:'999999999', far:'FAR 9', answerID: 9, response:'response9'},
//   {name:'name 9', duns:'999999999', far:'FAR 9', answerID: 9, response:'response9'},
//   {name:'name 9', duns:'999999999', far:'FAR 9', answerID: 9, response:'response9'}

// ];

@Injectable({providedIn : 'root'})
@Component({
  selector: 'app-result-table',
  styleUrls: ['result-table.component.css'],
  templateUrl: 'result-table.component.html'
})
export class ResultTableComponent {

  entityList;
  
  displayedColumns: string[] = ['Name', 'DUNS', 'FAR/DFAR Code', 'Answer ID', 'Answer Section'];

  constructor() { }

  ngOnInit(): void {
  }

  getEntityList(entity : any){
    this.entityList = entity;
    console.log(this.entityList);
  }
}