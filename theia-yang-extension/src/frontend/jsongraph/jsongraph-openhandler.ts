import { FrontendApplication, OpenHandler, OpenerOptions } from '@theia/core/lib/browser';
import { MaybePromise, SelectionService, ResourceProvider, Resource } from '@theia/core/lib/common';
import URI from '@theia/core/lib/common/uri';
import { JsonGraphWidget } from './jsongraph-widget';
import { inject, injectable } from "inversify";

// TODO finish adaption to jsongraph
@injectable()
export class JsonGraphOpenHandler implements OpenHandler {
  readonly id = "jsongraph-opener";
  constructor( @inject(FrontendApplication) private app: FrontendApplication,
  @inject(SelectionService) readonly selectionService: SelectionService,
  @inject(ResourceProvider) private readonly resourceProvider: ResourceProvider) {
  }

  // Defines the editor's name in the open with menu
  get label() {
    return 'JsonGraph - Ecore';
  }

  /**
   * Test whether this handler can open the given URI for given options.
   * Return a positive number if this handler can open; otherwise it cannot.
   * Never reject.
   *
   * A returned value indicating a priorify of this handler.
   */
  canHandle(uri: URI, options?: OpenerOptions): MaybePromise<number> {
    // TODO adapt check
    if (uri.path.ext === '.json') {
      return 1000;
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
        const jsonforms = new JsonGraphWidget(JSON.parse(content), this.saveCallback(resource));
        jsonforms.title.caption = uri.path.base;
        jsonforms.title.label = uri.path.base;
        jsonforms.title.closable = true;
        this.app.shell.addToMainArea(jsonforms);
        this.selectionService.selection = jsonforms;
        return jsonforms;
      });
    });

  }

  private saveCallback = (resource: Resource) => (data: Object): void => {
    if ( resource.saveContents !== undefined ) {
      resource.saveContents(JSON.stringify(data, null, 2), { encoding: 'UTF-8' });
    } else {
      console.warn('resource cannot save');
    }
  }
}
