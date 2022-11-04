const { chromium } = require('playwright-chromium');
const cheerio = require('cheerio');

module.exports = async function (context, req) {
    const yahooFinanceUrl = 'https://finance.yahoo.com/quote/{{SYMBOL}}/';
    const yahooFinanceCanadaUrl = 'https://ca.finance.yahoo.com/quote/{{SYMBOL}}.TO/';

    const symbol = (req.query.symbol || (req.body && req.body.symbol));
    const exchange = ((req.query.exchange || (req.body && req.body.exchange)) || '');

    let currentSymbol = symbol;

    let scrapeUrl = yahooFinanceUrl;

    if (exchange === 'TSX') {
        scrapeUrl = yahooFinanceCanadaUrl;
        currentSymbol += '.TO';
    }

    scrapeUrl = scrapeUrl.replace('{{SYMBOL}}', symbol);

    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto(scrapeUrl);

    const html = await page.content();

    await browser.close();

    const $ = cheerio.load(html);

    const name = $(`h1:contains("${currentSymbol}")`).text();
    const price = $(`fin-streamer[data-symbol="${currentSymbol}"]`).attr("value");

    context.log(symbol, 'Symbol');
    context.log(name, 'Name');
    context.log(price, 'Price');

    context.log('Successfully loaded stock price.');

    context.res = {
        body: { symbol, name, price },
        contentType: 'text/json'
    };
}