var res = [];
var flag = 0;

setInterval(function(){
		
for(var i = 28;i<document.querySelectorAll('a').length;i++)
{
res.push(document.querySelectorAll('a')[i].href)
}

res = [...new Set(res)];

window.scrollBy(0, 800);

if(res.length>1000 && flag != 1) {download("list",res.join("\n"));flag = 1;}

},500);





function download(filename, text) 
{

var element = document.createElement('a');
element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
element.setAttribute('download', filename);
element.style.display = 'none';
document.body.appendChild(element);
element.click();
document.body.removeChild(element);

}
