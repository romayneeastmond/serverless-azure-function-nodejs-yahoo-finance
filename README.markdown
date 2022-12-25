# Serverless Azure Function with Playwright, Cheerio, and Yahoo Finance

This Serverless Azure Function looks up a stock on Yahoo Finance (or Yahoo Finance Canada) and returns a JSON object with the symbol, company name, and current stock price.

It uses Playwright's headless, Chromium browser to capture the HTML of the page.

The HTML is parsed using Cheerio (a Node.js implementation of jQuery) to scrape the HTML content looking for specific tags that contain the current company name and current stock price.

## How to Use

Run an npm install or update

```
npm i
```

Install the Azure extension (which installs the Azure CLI tools) within Visual Studio Code then invoke the function start script. The local instance should be bound to the endpoint of http://localhost:7071/api/GetStockPrice

To look up a symbol append ?symbol to the above URL. For a company listed on the Toronto Stock exchange append &exchange=TSX to the URL.

[Examples of the endpoints](#Endpoints) can be found below. Note that the currency from the TSX is listed in Canadian dollars.

## Installing Playwright with Serverless Azure Functions

Complete the following steps:

1. The Serverless Azure Function **must be Linux** based.

1. In the **.vscode/settings.json** file remove the **postDeployTask** and **preDeployTask** definitions.

1. In the **.vscode/settings.json** file add a definition for **"azureFunctions.scmDoBuildDuringDeployment": true** or alternatively navigate to the Settings > Configuration > Application settings blade from within the Azure portal and create a setting for **SCM_DO_BUILD_DURING_DEPLOYMENT** set to **true**

1. In the Azure portal navigate to the Settings > Configuration > Application settings blade and create a setting for **PLAYWRIGHT_BROWSERS_PATH** set to **0**.

1. In the **.funcignore** file add an entry for **node_modules** since the packages will be installed on the server during deployment.

1. In the Azure Portal define any CORS entries in the API > CORS blade.

### <a name="Endpoints"></a>Endpoints

| Method | API                                                                                   |
| ------ | ------------------------------------------------------------------------------------- |
| GET    | http://localhost:7071/api/GetStockPrice?symbol=BB&exchange=TSX                        |
| GET    | https://YOUR_FUNCTION_NAME.azurewebsites.net/api/GetStockPrice?symbol=SNOW            |
| GET    | https://YOUR_FUNCTION_NAME.azurewebsites.net/api/GetStockPrice?symbol=BB&exchange=TSX |

### Output Examples

```json
{
  "symbol": "SNOW",
  "name": "Snowflake Inc. (SNOW)",
  "price": "132.31"
}
```

```json
{
  "symbol": "BB",
  "name": "BlackBerry Limited (BB.TO)",
  "price": "5.93"
}
```

## Copyright and Ownership

All terms used are copyright to their original authors.
