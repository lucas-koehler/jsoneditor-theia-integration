import { inject, injectable } from 'inversify'
import { FileSystem } from '@theia/filesystem/lib/common'

@injectable()
export class JsonFormsFileSaver {
    constructor(@inject(FileSystem) protected readonly fileSystem: FileSystem) {
    }

    save(sourceUri: string, data: Object) {
        this.getNextFileName(sourceUri).then(fileName => {
            const saveObject = {
                content: JSON.stringify(data, null, 2),
                encoding: 'utf-8'
              };
            this.fileSystem.createFile(fileName, saveObject);
        });
    }

    getNextFileName(sourceUri: string): Promise<string> {
        return new Promise<string>(resolve => this.tryNextFileName(sourceUri, 0, resolve))
    }

    tryNextFileName(sourceURI: string, count: number, resolve: (fileName: string) => void) {
        const currentName = sourceURI + (count === 0 ? '' : count) + '.json'
        this.fileSystem.exists(currentName).then(exists => {
            if (!exists)
                resolve(currentName)
            else
                this.tryNextFileName(sourceURI, ++count, resolve)
        })
    }
}
