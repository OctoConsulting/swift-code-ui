import { Component } from '@angular/core';
import { ResultTableComponent } from './result-table/result-table.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private resultTable : ResultTableComponent) 
  { }


  title = 'SwiftCode';

}
