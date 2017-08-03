import { Widget } from "@phosphor/widgets";
// import { JsonFormsElement } from 'jsonforms';
import { EcoreEditor } from 'jsoneditor-ma';
// import {imageProvider, labelProvider, modelMapping} from './ecore-config';
// import {ecore_schema} from './schema';
import 'jsoneditor-ma';

let num = 0;
export class JSONFormsWidget extends Widget {

  // private jsonEditor: JsonEditor;
  private ecoreEditor: EcoreEditor;

    constructor(data: object, private saveCallback: (data: Object) => void) {
        super();
        this.ecoreEditor = document.createElement('ecore-editor') as EcoreEditor;
        this.ecoreEditor.classList.add('dark');

        this.ecoreEditor.data = data;
        this.node.appendChild(this.ecoreEditor);
        this.node.style.overflowY = 'scroll';
        num++;
        this.id = 'ecoreeditor-' + num;
    }

    close() {
      super.close();
      this.saveCallback(this.ecoreEditor.data);
    }
}
