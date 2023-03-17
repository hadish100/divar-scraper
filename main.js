const puppeteer = require("puppeteer");
const fs = require("fs").promises;
const fs2 = require("fs");

var links = [];

fs2.readFile("list.txt",{encoding: 'utf-8'},function(err,data)
{
links = data.split("\n");
});

(async () => {

	const browser = await puppeteer.launch({headless:false});

for(var i=0;i<links.length;i++)
{
	const page = await browser.newPage();

	const cookiesString = await fs.readFile('./cookies.json');
	const cookies = JSON.parse(cookiesString);
	await page.setCookie(...cookies);

	await page.goto(links[i]);


	await page.setViewport({width: 1500, height: 1000});
	const selector = '.kt-button--primary'
	const wait_for_btn = await page.waitForSelector(selector);
	await page.evaluate((selector) => document.querySelectorAll(selector)[1].click(), selector); 
	const number_selector1 = await page.waitForSelector('.kt-base-row.kt-base-row--large.kt-unexpandable-row.copy-row__content');
	const number_selector2 = await page.waitForSelector('.kt-unexpandable-row__action.kt-text-truncate');
	const number = await number_selector2.evaluate(el => el.textContent);




	const date = new Date();
	const formattedDate = date.toLocaleString("en-GB", {hour:"numeric",minute:"2-digit",second:"numeric"});

	fs2.appendFile("data.txt",number+"\n",function(){console.log(formattedDate + " UPDATED !");	page.close();});
}
 await browser.close();

})();
