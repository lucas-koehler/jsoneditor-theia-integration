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

    constructor(data: object) {
        super();
        // const jsonForms = document.createElement('json-forms') as JsonFormsElement;
        const jsonEditor = document.createElement('json-editor') as JsonEditor;
        jsonEditor.classList.add('dark');
        jsonEditor.setImageMapping(imageProvider);
        jsonEditor.setLabelMapping(labelProvider);
        jsonEditor.setModelMapping(modelMapping);
        jsonEditor.schema = ecore_schema;
        jsonEditor.data = data;
        // jsonForms.data = data;
        // jsonForms.uiSchema =
        // {
        //   'type': 'MasterDetailLayout',
        //     'scope': {
        //       '$ref': '#'
        //     }
        // } as ControlElement;

        this.node.appendChild(jsonEditor);
        this.node.style.overflowY = 'scroll';
        num++;
        this.id = 'jsoneditor-' + num;
    }
}
