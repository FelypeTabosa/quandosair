if(typeof jQuery === 'undefined'){
	alert('jQuery não foi carregado');
}else if(typeof angular === 'undefined'){
	alert('angular não foi carregado');
}else if(typeof moment === 'undefined'){
	alert('moment não foi carregado');
}

var app = angular.module('minhaCalculadoraDeHoras', ['ngAnimate']);