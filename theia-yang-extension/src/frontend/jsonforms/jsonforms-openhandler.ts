import { FrontendApplication, OpenHandler, OpenerOptions } from '@theia/core/lib/browser';
import { MaybePromise, SelectionService, ResourceProvider } from '@theia/core/lib/common';
import URI from '@theia/core/lib/common/uri';
import { JSONFormsWidget } from './jsonforms-widget';
import { inject, injectable } from "inversify";
import * as Ajv from 'ajv';
import { ecore_schema } from './schema';

@injectable()
export class JSONFormsOpenHandler implements OpenHandler {
  readonly id = "jsonforms-opener";
  constructor( @inject(FrontendApplication) private app: FrontendApplication,
  @inject(SelectionService) readonly selectionService: SelectionService,
  @inject(ResourceProvider) private readonly resourceProvider: ResourceProvider) {
  }

  // Defines the editor's name in the open with menu
  get label() {
    return 'JsonEditor - Ecore';
  }

  /**
   * Test whether this handler can open the given URI for given options.
   * Return a positive number if this handler can open; otherwise it cannot.
   * Never reject.
   *
   * A returned value indicating a priorify of this handler.
   */
  canHandle(uri: URI, options?: OpenerOptions): MaybePromise<number> {
    if (uri.path.ext === '.json') {
      return this.resourceProvider(uri).then(resource => {
        return resource.readContents().then(content => {
          try {
            const data = JSON.parse(content);
            const ajv = new Ajv();
            const valid = ajv.validate(ecore_schema, data);
            if (valid) {
              return 1000;
            }
          } catch (err) {
          }
          return 0;
        });
      });
    }
    return 0;
  }

  /**
   * Open a widget for the given URI and options.
   * Resolve to an opened widget or undefined, e.g. if a page is opened.
   * Never reject if `canHandle` return a positive number; otherwise should reject.
   */
  open(uri: URI, options?: OpenerOptions): MaybePromise<object | undefined> {
    return this.resourceProvider(uri).then(resource => {
      return resource.readContents().then(content => {
        const jsonforms = new JSONFormsWidget(JSON.parse(content));
        jsonforms.title.caption = uri.path.base;
        jsonforms.title.label = uri.path.base;
        jsonforms.title.closable = true;
        this.app.shell.addToMainArea(jsonforms);
        this.selectionService.selection = jsonforms;
        return jsonforms;
      });
    });

  }
}
