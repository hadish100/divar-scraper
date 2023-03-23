const puppeteer = require("puppeteer");
const fs = require("fs").promises;
const fs2 = require("fs");

var conv = {'۱':'1','۲':'2','۳':'3','۴':'4','۵':'5','۶':'6','۷':'7','۸':'8','۹':'9','۰':'0'}
var links = [];
var page,browser;
var cookie_files = ["./cookies1.json","./cookies2.json","./cookies3.json","./cookies4.json","./cookies5.json","./cookies6.json","./cookies7.json"];var cookie_iterator = 0;

fs2.readFile("list.txt",{encoding: 'utf-8'},function(err,data)
{
links = data.split("\n");
});

(async () => {

	browser = await puppeteer.launch({headless:true});

for(var i=0;i<links.length;i++)
{

	try
	{
		page = await browser.newPage();
		await page.setDefaultTimeout(20000);
		const cookiesString = await fs.readFile(cookie_files[cookie_iterator%7]);
		const cookies = JSON.parse(cookiesString);
		await page.setCookie(...cookies);

		await page.goto(links[i]);


		await page.setViewport({width: 1500,height: 1000});
		const selector = '.kt-button--primary'
		const wait_for_btn = await page.waitForSelector(selector);
		await page.evaluate((selector) => document.querySelectorAll(selector)[1].click(),selector); 
		const number_selector1 = await page.waitForSelector('.kt-base-row.kt-base-row--large.kt-unexpandable-row.copy-row__content');
		const number_selector2 = await page.waitForSelector('.kt-unexpandable-row__action.kt-text-truncate');
		const number = await number_selector2.evaluate(el => el.textContent);




		const date = new Date();
		const formattedDate = date.toLocaleString("en-GB", {hour:"numeric",minute:"2-digit",second:"numeric"});
		var real_num = '+98' + (number.split("").slice(1).map(x => conv[x])).join("")+"\n";
		fs2.appendFile("data.txt",real_num,function(){console.log(formattedDate + " UPDATED -> " + i);page.close();});
	}

	catch(err) 
	{ 
	console.log("BACKING OFF !");
	cookie_iterator++;
	page.close();
	await browser.close();
	browser = await puppeteer.launch({headless:true});
	continue; 
	}

}
 await browser.close();

})();
