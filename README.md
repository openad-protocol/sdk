# openAD Js SDK npm version


## How to use

step1: npm i

step2: npm run build, after packaging, a dist folder will appear

step3: select one type of js from dist folder

### For web apps:

    Directly import it in the browser through the <script> tag
    
    If you provide the UMD format for the browser environment (such as openADJsSDK.umd.js), you can import it directly through the <script> tag:
    
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Using the SDK</title>
        </head>
        <body>
            <h1>Using openADJsSDK</h1>
            <!-- import sdk -->
            <script src="dist/openADJsSDK.umd.js"></script>
        </body>
    </html>


### For nodejs:

    If a file in CommonJS format (such as openADJsSDK.cjs.js) is generated, it can be imported through require:

    const openADJsSDK = require('./dist/openADJsSDK.cjs.js');
    console.log(openADJsSDK.version);

### For ES Modules:

    If a file in ES Module format (such as openADJsSDK.esm.js) is generated, it can be introduced through import:

    <!--import as a js component-->
    import openADJsSDK from './dist/openADJsSDK.esm.js';
    console.log(openADJsSDK.version);
    
### Init SDK
    openADJsSDK.init("https://bf2055756e.api.openad.network");
    This step is used to initialize the address of the SDK calling API interface. For the remaining steps, refer to Official Docs Support.
    


## Official Docs Support:

https://docs.openad.network/getting-started/for-publisher/v3/create-banner-ads

https://docs.openad.network/getting-started/for-publisher/v3/create-interactive-ads