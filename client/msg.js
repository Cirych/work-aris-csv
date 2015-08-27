/*! crazy viewer-msg v1.0.0 | (c) 2015 Ki-Tec, Inc. | ki-tec.ru
*/
(function () {
	var hash = location.hash.slice(1);
	document.getElementById("header").innerHTML = "Заказать " + hash;
	document.getElementById("name").value = hash;
}());