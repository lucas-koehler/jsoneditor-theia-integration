import { Widget } from "@phosphor/widgets";
// import { JsonFormsElement } from 'jsonforms';
import { EcoreGraph } from 'jsongraph-ma';
// import {imageProvider, labelProvider, modelMapping} from './ecore-config';
// import {ecore_schema} from './schema';
import 'jsoneditor-ma';

let num = 0;
export class JsonGraphWidget extends Widget {

  // private jsonEditor: JsonEditor;
  private ecoreGraph: EcoreGraph;

    constructor(data: object, saveCallback?: (data: Object) => void) {
        super();
        this.ecoreGraph = document.createElement('ecore-graph') as EcoreGraph;
        this.ecoreGraph.classList.add('dark');

        this.ecoreGraph.data = data;
        this.node.appendChild(this.ecoreGraph);
        this.node.style.overflowY = 'scroll';
        num++;
        this.id = 'ecoregrapheditor-' + num;
    }

    close() {
      super.close();
      // this.saveCallback(this.ecoreGraph.data);
    }
}
