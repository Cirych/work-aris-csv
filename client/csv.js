/*! crazy viewer v1.0.0 | (c) 2015 Ki-Tec, Inc. | ki-tec.ru
*/
(function () {
var jdata = new Object();
var page_length = 5; //default value. may be overloaded by csv-page-length
var img_folder = "img/" // place for images
loadCSV('/server/jdata.php'); // PHP file on server with JSON output. {in:[...]}

function page(page) {
	var start=	Math.max(page - 1, 0) * page_length;
	var end=	Math.min(start + page_length, jdata.out.length); //console.log(page,start,end,page_length);
	jdata.page.innerHTML = jdata.out.slice(start, end);
}

function footer() {
	var el; //location.hash.slice(1)
	var page_last = Math.ceil(jdata.out.length/page_length);
	for(var i=1;i<=page_last;i++) {
		el = document.createElement(jdata.footer.getAttribute("csv-type"));
		el.setAttribute("href","#"+i);
		el.innerHTML = i;
		(function(){var this_i=i; el.addEventListener("click", function(event) { page(this_i); 	});}());
		jdata.footer.appendChild(el);
	}
}


function isReady(f){/in/.test(document.readyState)?setTimeout('isReady('+f+')',9):f()};

function loadCSV(data_file) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', data_file, true);
  xhr.onreadystatechange = function() {
	if (xhr.readyState != 4) return;
	console.log('Готово!');
	if (xhr.status != 200) {
	  // on error
	  console.log(xhr.status + ': ' + xhr.statusText);
	} else {
	  // on success
	  jdataOut(JSON.parse(xhr.responseText)); //parse json to DOM
	  isReady(function(){
		  jdata.page=document.getElementById("csv-data");
		  jdata.footer=document.getElementById("csv-pages");
		  page_length = parseInt(jdata.footer.getAttribute("csv-page-length")) || page_length;
		  page(1); footer();
		  });
	}
  }
  xhr.send();
};

function jdataOut(data) {
	jdata.out=[];
	data.in.forEach(function(item) {
	var template = 
	'<div class="csv_row">'+
	'<div class="csv_right">'+
	'<img src="'+img_folder+item.Img+'" alt="'+item.Alt+'" title="'+item.Alt+'">'+
	'</div>'+
	'<div class="csv_left">'+
	'<ul>'+
		data.header_en
		.filter(function(head_item) { return head_item!=="Img"; })
		.filter(function(head_item) { return head_item!=="Alt"; })
		.map(function(head_item) { return '<li>'+item[head_item.split("|")[0]]+'</li>'; })
		.join("") +
	'</ul>'+
	order(item.Name) +
	'</div>'+
	'</div>';
	
	jdata.out.push(template);
	});
};

function order(item) {
	return '<button onClick="window.open(\'msg.html#'+item+'\',\'windowname\',\'width =400,height=300\')">Заказать '+item+'</button>';
};

}());