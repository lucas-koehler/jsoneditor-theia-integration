# JsonEditor Theia Integration Demo

## Prerequisite
Install yarn.
```
npm install -g yarn
```


Install Yeoman
```
npm install -g yo
```
## Clone and Build


```bash
git clone --recursive https://github.com/lucas-koehler/jsoneditor-theia-integration.git && \
cd jsoneditor-theia-integration && \
yarn install && \
yarn run setup
```

During the setup you might be asked whether you want to replace diverged package.json or index.html. Always answer with no!

Now run the build
```
yarn run build
```

For incremental development use
```bash
yarn run watch
```

## Run JsonEditor Theia Integration Demo

```bash
cd yangster-app && \
yarn run start
```

Open browser on 'http://localhost:3000'.
