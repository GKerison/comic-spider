const cheerio = require('cheerio')



// const $ = cheerio.load('<h2 class="title">Hello world</h2>')
 
// $('h2.title').text('Hello there!')
// $('h2').addClass('welcome')

// console.log($.html())

const html = `
<ul id="fruits">
  <li class="apple">Apple</li>
  <li class="orange">Orange</li>
  <li class="pear">Pear</li>
</ul>
`;

const $ =  cheerio.load(html);
$.prototype.logHtml = function() {
  console.log(this.html());
};
$('body').logHtml(); 

console.log($.html())

console.log($('.apple', '#fruits').text())
//=> Apple 
 
console.log($('ul .pear').attr('class'))
//=> pear 
 
console.log($('li[class=orange]').html())
//=> Orange 