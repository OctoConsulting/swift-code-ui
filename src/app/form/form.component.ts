import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  
  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {
    formState:{
      size:'width:300px;height:30px'
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
            this.form.get('dunsRangeRadio').reset(null);
            this.form.get('farRadio').reset(null);
            this.form.get('answerRadio').reset(null);
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

      {
        type: "radio",
        key: "dunsRangeRadio",
        templateOptions: {
          options: [
              {label: "Multiple DUNS", value: 2},
          ],
          click: (field) => {
            this.form.get('dunsRadio').reset(null);
            this.form.get('farRadio').reset(null);
            this.form.get('answerRadio').reset(null);
          }
        },
      },
      {
        className: 'custom-input',
        type: "input",
        key: "dunsRangeInput",
        templateOptions: {
          label: "Enter the DUNS you are searching for (Comma separated):",
          placeholder: "999999999, 888888888",
          attributes: {
            style: this.options.formState.size
          }
        },
        expressionProperties:{
          "hideExpression": "!model.dunsRangeRadio",
          "templateOptions.required": "model.dunsRangeRadio"
        }
      },

      {
        type: "radio",
        key: "farRadio",
        templateOptions: {
          options: [
              {label: "FAR / DFAR", value: 3},
          ],
          click: (field) => {
            this.form.get('dunsRadio').reset(null);
            this.form.get('dunsRangeRadio').reset(null);
            this.form.get('answerRadio').reset(null);
          }
        },
      },
      {
        className: 'custom-input',
        type: "select",
        key: "farSelect",
        templateOptions: {
          label: "Select the FAR / DFAR you are searching for:",
          options:[
            {label: "FAR 1", value: 1},
            {label: "FAR 2", value: 2},
            {label: "FAR 3", value: 3},
          ],
          attributes: {
            style: this.options.formState.size
          }
        },
        expressionProperties:{
          "hideExpression": "!model.farRadio",
          "templateOptions.required": "model.farRadio"
        }
      },

      {
        type: "radio",
        key: "answerRadio",
        templateOptions: {
          options: [
              {label: "Answer ID", value: 4},
          ],
          click: (field) => {
            this.form.get('dunsRadio').reset(null);
            this.form.get('dunsRangeRadio').reset(null);
            this.form.get('farRadio').reset(null);
          }
        },
      },
      {
        className: 'custom-input',
        type: "input",
        key: "farInput",
        templateOptions: {
          label: "Enter the answer ID you are searching for:",
          attributes: {
            style: this.options.formState.size
          }
        },
        expressionProperties:{
          "hideExpression": "!model.answerRadio",
          "templateOptions.required": "model.answerRadio"
        }
      }
    ] 
  },
  {
    className:"custom-dates",
    key: 'fromDate',
    type: 'input',
    templateOptions: {
      label: 'From Date:',
      type: 'date',
      required: true,
      attributes: {
        style: this.options.formState.size
      }
    },
  },
  {
    key: 'endDate',
    type: 'input',
    templateOptions: {
      label: 'End Date:',
      type: 'date',
      required: true,
      attributes: {
        style: this.options.formState.size
      }
    },
  },

  ]

  constructor() { }

  ngOnInit(): void {
  }
  
  onSubmit(){
    console.log(this.model)
  }
}
