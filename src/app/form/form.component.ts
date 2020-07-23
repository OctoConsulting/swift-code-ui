import { Entity, FarDFarList } from './../entity.model';
import { FormService } from './form-service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  
  // @Output() entityList : EventEmitter<String[]> = new EventEmitter<String[]>();

  displayedColumns: string[] = ['Name', 'DUNS', 'FAR/DFAR Code', 'Answer ID', 'Answer Section'];
  entityList;
  submitClicked;
  dateClicked = false;

  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {
    formState:{
      size:'width:300px;height:30px',
    }
  };

  fields: FormlyFieldConfig[] = [
    {
      fieldGroup: [
      {
        type: "radio",
        key: "dunsRadio",
        templateOptions: {
          options: [
              {label: "Single DUNS", value: 1},
          ],
          click: (field) => {
            // this.form.get('dunsRangeRadio').reset(null);
            this.form.get('farRadio').reset(null);
            // this.form.get('answerRadio').reset(null);
          }
        },
      },
      {
        className: 'custom-input',
        type: "input",
        key: "dunsInput",
        templateOptions: {
          label: "Enter the DUNS you are searching for:",
          attributes: {
            style: this.options.formState.size
          }
        },
        expressionProperties:{
          "hideExpression": "!model.dunsRadio",
          "templateOptions.required": "model.dunsRadio",
        }
      },

      // {
      //   type: "radio",
      //   key: "dunsRangeRadio",
      //   templateOptions: {
      //     options: [
      //         {label: "Multiple DUNS", value: 2},
      //     ],
      //     click: (field) => {
      //       this.form.get('dunsRadio').reset(null);
      //       this.form.get('farRadio').reset(null);
      //       this.form.get('answerRadio').reset(null);
      //     }
      //   },
      // },
      // {
      //   className: 'custom-input',
      //   type: "input",
      //   key: "dunsRangeInput",
      //   templateOptions: {
      //     label: "Enter the DUNS you are searching for (Comma separated):",
      //     placeholder: "999999999, 888888888",
      //     attributes: {
      //       style: this.options.formState.size
      //     }
      //   },
      //   expressionProperties:{
      //     "hideExpression": "!model.dunsRangeRadio",
      //     "templateOptions.required": "model.dunsRangeRadio"
      //   }
      // },



      // {
      //   type: "radio",
      //   key: "answerRadio",
      //   templateOptions: {
      //     options: [
      //         {label: "Answer ID", value: 4},
      //     ],
      //     click: (field) => {
      //       this.form.get('dunsRadio').reset(null);
      //       // this.form.get('dunsRangeRadio').reset(null);
      //       this.form.get('farRadio').reset(null);
      //     }
      //   },
      // },
      // {
      //   className: 'custom-input',
      //   type: "input",
      //   key: "answerInput",
      //   templateOptions: {
      //     label: "Enter the answer ID you are searching for:",
      //     attributes: {
      //       style: this.options.formState.size
      //     }
      //   },
      //   expressionProperties:{
      //     "hideExpression": "!model.answerRadio",
      //     "templateOptions.required": "model.answerRadio"
      //   }
      // }
    ] 
  },
  {
    className:"custom-dates",
    key: 'date',
    type: 'input',
    templateOptions: {
      label: 'From Date:',
      description: '    (Required if wanting to download csv for this date)',
      type: 'date',
      attributes: {
        style: this.options.formState.size
      },
      change: (form) => {
        this.dateClicked = true;
      }
    } 
  }
]

  constructor(private formService: FormService) { }

  ngOnInit(): void {
    const farRadio = {
      type: "radio",
      key: "farRadio",
      templateOptions: {
        options: [
            {label: "FAR / DFAR", value: 3},
        ],
        click: (field) => {
          this.form.get('dunsRadio').reset(null);
          // this.form.get('dunsRangeRadio').reset(null);
          // this.form.get('answerRadio').reset(null);
        }
      },
    };

    const farSelect=
    {
      className: 'custom-input',
      type: "select",
      key: "farSelect",
      templateOptions: {
        label: "Select the exact FAR / DFAR you are searching for:",
        options: [],
        attributes: {
          style: this.options.formState.size
        },
      },
      expressionProperties:{
        "hideExpression": "!model.farRadio",
        "templateOptions.required": "model.farRadio",
      },
      lifecycle:{
        onInit: (field, form)=>{
          this.formService.retrievefardfar().subscribe(res => {
            let list = []
            for(var far of res.FAR){
              list.push(far)
            }
            for(var far of res.DFAR){
              list.push(far)
            }
            // console.log(list)
            form.templateOptions.options = list;
          });
        }
      }
    };
    this.fields = [farRadio, farSelect, ...this.fields];

  }
  
  onSubmit(){
    let params = this.getParams();

     this.formService.retrieveResults(params).subscribe(res => {
       this.entityList = res;
       if(res.length > 0){
         this.submitClicked = true;
       }
     });
  }

  getParams(){
    let params = 
    {
      searchText: '',
      type: ''
    }
      if (this.model.dunsRadio) {
        params.searchText = this.model.dunsInput;
        params.type = 'duns'; 
      } 
      else if(this.model.farRadio) { 
        params.searchText = this.model.farSelect;
        params.type = 'fardfar';
        this.formService.retrieveResults(params);
     } 

     return params;
  }

  resetClick(){
    this.submitClicked = false;
    this.dateClicked = false;
  }

  downloadClicked(){
    this.formService.downloadAll().subscribe(res => {
      this.download(res, 'allEntities.csv');
    });
  }

  downloadSearchClicked(){
    let params = this.getParams();
    this.formService.downloadSearched(params).subscribe(res => {
      this.download(res, 'searchedEntities.csv');
    });
  }

  downloadDateClicked(){
    this.formService.downloadDate(this.model.date).subscribe(res => {
      console.log(res)
      this.download(res, 'entitiesByDate.csv')
    });
  }

  download(res: any, title: string){
    let blob = new Blob([res], { type: 'text/csv' });
      var url = window.URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url;
      a.download = title;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
  }

  // convertToEntity(res: any){
  //   let entityList: Entity[] = [];
  //   for (var r of res) {
  //     let entity: Entity = new Entity;
  //     entity.duns = r.duns;
  //     entity.name = r.legal_business_name;
  //     let farList : FarDFarList[] = [];
  //     for(var far of r.farDfarAnswerDataList){
  //       let newFar : FarDFarList = new FarDFarList;
  //       newFar.answerId = far.answer_id;
  //       newFar.fardfarCode = far.far_dfar_code;
  //       farList.push(newFar);
  //     }
  //     entity.farDfarList = farList;
  //     entityList.push(entity);
  //   }
  //   this.entityList.emit(entityList);
  // }
}
