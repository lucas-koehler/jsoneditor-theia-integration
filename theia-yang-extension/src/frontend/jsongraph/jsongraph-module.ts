import { ContainerModule } from 'inversify';
import { OpenHandler } from '@theia/core/lib/browser';
import { JsonGraphOpenHandler } from './jsongraph-openhandler';

export default new ContainerModule(bind => {
    bind(OpenHandler).to(JsonGraphOpenHandler);
});
