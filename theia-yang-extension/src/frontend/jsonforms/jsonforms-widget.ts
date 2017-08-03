import { Widget } from "@phosphor/widgets";
// import { JsonFormsElement } from 'jsonforms';
import { JsonEditor } from 'jsoneditor-ma';
import {imageProvider, labelProvider, modelMapping} from './ecore-config';
import {ecore_schema} from './schema';
import 'jsoneditor-ma';

// import 'jsonforms';
// import {ControlElement} from 'jsonforms/dist/ts-build/models/uischema';

let num = 0;
export class JSONFormsWidget extends Widget {

  private jsonEditor: JsonEditor;

    constructor(data: object, private saveCallback: (data: Object) => void) {
        super();
        // const jsonForms = document.createElement('json-forms') as JsonFormsElement;
        this.jsonEditor = document.createElement('json-editor') as JsonEditor;
        this.jsonEditor.classList.add('dark');
        this.jsonEditor.setImageMapping(imageProvider);
        this.jsonEditor.setLabelMapping(labelProvider);
        this.jsonEditor.setModelMapping(modelMapping);
        this.jsonEditor.schema = ecore_schema;
        this.jsonEditor.data = data;
        // jsonForms.data = data;
        // jsonForms.uiSchema =
        // {
        //   'type': 'MasterDetailLayout',
        //     'scope': {
        //       '$ref': '#'
        //     }
        // } as ControlElement;

        this.node.appendChild(this.jsonEditor);
        this.node.style.overflowY = 'scroll';
        num++;
        this.id = 'jsoneditor-' + num;
    }

    close() {
      super.close();
      this.saveCallback(this.jsonEditor.data);
    }
}
