import { ContainerModule } from 'inversify';
import { OpenHandler } from '@theia/core/lib/browser';
import {JSONFormsOpenHandler} from './jsonforms-openhandler';

export default new ContainerModule(bind => {
    bind(OpenHandler).to(JSONFormsOpenHandler);
});
