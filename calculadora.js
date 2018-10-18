app.controller('CalculadoraDeHora', function($scope, $http) {
	//inicializa hora e dados
	$scope.temAlmoco = false;
	$scope.temLanche = false;
	$scope.qtdDias = 0;
	$scope.regimeDeHoras = 0;
	$scope.numRegimeDeTrabalho = Array.from(Array(45).keys()).slice(1);
	$scope.numDiasDaSemana = Array.from(Array(8).keys()).slice(1);
	$scope.diasDaSemana = ['Segunda-Feira','Terça-Feira','Quarta-Feira','Quinta-Feira','Sexta-Feira','Sábado','Domingo'];
	$scope.tempoRestante = "";
	angular.element('.error').hide();
	angular.element('.menu').hide();
	angular.element('.div-box').hide();
	angular.element('.resultado').hide();
	angular.element('h3#lanche').hide();
	angular.element('h3#almoco').hide();
	
	//Side-menu 
	angular.element('.side-menu span').click(function(event){
		angular.element('.side-menu span').removeClass("active");
		angular.element(this).addClass("active");

		if(angular.element(this).hasClass("horarioSemanal")){
			angular.element(".container-box").hide();
			angular.element(".container-horarioSemanal").show();
		}else if(angular.element(this).hasClass("calculadoraDiaria")){
			angular.element(".container-box").hide();
			angular.element(".container-calculadoraDiaria").show();
		}else if(angular.element(this).hasClass("jira")){
			angular.element(".container-box").hide();
			angular.element(".container-jira").show();
		}else if(angular.element(this).hasClass("timetrex")){
			angular.element(".container-box").hide();
			angular.element(".container-timetrex").show();
		};
	});
	
	//Mostra Menu
	angular.element('.options').hover(function(){
		angular.element('.menu').show();
		angular.element('.menu').mouseleave(function(){
			angular.element('.menu').fadeOut();
		});
	});
	//Mostra Itens do Menu
	angular.element('.options').hover(function(){
		angular.element('.menu').show();
		angular.element('.menu').mouseleave(function(){
			angular.element('.menu').fadeOut();
		});
	});
	
	//Altera Tipo dos Campos
	$scope.trocaTipo = function(){
		angular.element('.container-calculadoraDiaria input, .container-horarioSemanal input').bind('blur',function($event){
			angular.element($event.target).attr("type","text");
			angular.element($event.target).css("padding", "8px 15px");
		});
		angular.element('.container-calculadoraDiaria input').bind('focus',function($event){
			angular.element($event.target).attr("type","time");
			angular.element($event.target).css("padding", "5px 0px 5px 30px");
		});
	}
	
	$scope.trocaTipoDoCampo = function(event){
		if(angular.element(event.target).attr('type') == 'text'){
			angular.element(event.target).attr('type','time');
		}else{
			angular.element(event.target).attr('type','text');
		}
	}
	
	//Limpa Campos dependentes Após Alteração da Hora de Entrada 
	angular.element('#horaDeEntrada').change(function(){
		angular.element('.almoco-form input').val("");
		angular.element('.lanche-form input').val("");
	});
	
	//Cria Html da div lanche
	$scope.DivLancheHtml = function(){
		return '<div class="div-box div light-blue-opacity lanche-form" style="">'
			+'<input id="horaDeSaidaLanche" class="horaDeSaidaLanche input-box margin-bottom-15px ng-pristine ng-untouched ng-valid ng-empty" type="text" placeholder="Hora de Saída p/ Lanche" title="Hora de Saída p/ Lanche"><br>'
			+'<input id="horaDeChegadaLanche" class="horaDeChegadaLanche input-box ng-pristine ng-untouched ng-valid ng-empty" type="text" placeholder="Hora de Chegada do Lanche" title="Hora de Chegada do Lanche"><br>'
			+'<span class="remove" ng-click="remove($event)"></span></div>';
	}
	//Cria Html da div Almoco
	$scope.DivAlmocoHtml = function(){
		return '<div class="div-box div light-blue-opacity almoco-form" style="">'
			+'<input id="horaDeSaidaAlmoco" class="input-box margin-bottom-15px ng-pristine ng-untouched ng-valid ng-empty" type="text" placeholder="Hora de Saída p/ Almoco" title="Hora de Saída p/ Almoco"><br>'
			+'<input id="horaDeChegadaAlmoco" class="input-box ng-pristine ng-untouched ng-valid ng-empty" type="text" placeholder="Hora de Chegada do Almoco" title="Hora de Chegada do Almoco" min="10:00" max="12:00"><br>'
			+'<span class="remove" ng-click="remove($event)"></span></div>';
	}
	
	//Funções que adiciona almoço e lanche
	angular.element('#lanche').bind('click',function(){
		$scope.adicionaLanche();
	});
	angular.element('#almoco').click(function(){
		$scope.adicionaAlmoco();
	});
	
	//Implementação da Função adiciona lanche 
	$scope.adicionaLanche = function(){
		angular.element('.resultado').slideUp();
		angular.element('h3#lanche').show();
		if(angular.element('.lanche-form').length == 0){
			angular.element('h3#lanche').after($scope.DivLancheHtml());
		}else{
			angular.element('.lanche-form:last').after($scope.DivLancheHtml());
			$scope.moveTelaPara('.lanche-form:last');
		}
		$scope.trocaTipo();
		$scope.temLanche = true;
		angular.element('.lanche-form .remove').bind('click',function(event){
			angular.element(event.target.parentElement).remove();
			angular.element('.resultado').slideUp();
			if(angular.element('.lanche-form').length == 0){
				angular.element('h3#lanche').hide();
				$scope.temLanche = false;
			}
		});
		angular.element('.lanche-form input').bind('focus',function($event){
			$scope.InicializaCampos($event);
		});
	}
	
	//Implementação da Função adiciona almoco
	$scope.adicionaAlmoco = function(){
		angular.element('.resultado').slideUp();
		angular.element('#almoco').unbind('click');
		angular.element('h3#almoco').show();
		angular.element('h3#almoco').after($scope.DivAlmocoHtml());
		angular.element('#almoco').css('opacity','0.5');
		$scope.trocaTipo();
		$scope.temAlmoco = true;
		angular.element('.almoco-form .remove').bind('click',function(event){
			angular.element(event.target.parentElement).remove();
			angular.element('h3#almoco').hide();
			$scope.temAlmoco = false;
			angular.element('#almoco').css('opacity','1');
			angular.element('.resultado').slideUp();
			$scope.adicionaEventoDaFuncaoAdicionaAlmoco();
		});
		angular.element('#horaDeSaidaAlmoco').bind('focus',function($event){
			var min = angular.element('#horaDeEntrada').val();
			angular.element('#horaDeSaidaAlmoco').attr({"min":min,"max":"23:59"});
			angular.element('#horaDeSaidaAlmoco').val(min);
		});
		angular.element('#horaDeSaidaAlmoco').bind('change',function(){
			angular.element('#horaDeChegadaAlmoco').val("");
		});
		angular.element('#horaDeChegadaAlmoco').bind('focus',function(){
			var min = angular.element('#horaDeSaidaAlmoco').val();
			angular.element('#horaDeChegadaAlmoco').attr({"min":min,"max":"23:59"});
			angular.element('#horaDeChegadaAlmoco').val(min);
		});
	};
	
	//Função que acopla novamente evento ao item almoço do menu
	$scope.adicionaEventoDaFuncaoAdicionaAlmoco = function(){
		angular.element('#almoco').bind('click',function(){
			$scope.adicionaAlmoco();
		});
	};
	
	$scope.InicializaCampos = function($event){
		var target = angular.element($event.target);
		var targetSimbling = angular.element($event.target).siblings('input');
		var minRequired = angular.element($event.target).parent().parent().find("#horaDeEntrada");
		if(target.attr('id') == 'horaDeSaidaLanche'){
			if(target.val() < minRequired.val()){
				target.attr('min',minRequired.val());
				target.val(minRequired.val());
			}
		}else{
			if(targetSimbling.val() > target.val()){
				target.attr('min',targetSimbling.val());
				target.val(targetSimbling.val());
			}
		}
	};
	
	//função que valida os campos do formulário
	$scope.verificaCampos = function(){
		var inputs = angular.element('.container-calculadoraDiaria input');
		var count = 0;
		var temErro = false;
		for(var index=0;index<inputs.length;index++){
			var inputValue = angular.element('.container-calculadoraDiaria input').eq(index).val();
			var minInputValue = angular.element('.container-calculadoraDiaria input').eq(index).attr('min');
			var maxInputValue = angular.element('.container-calculadoraDiaria input').eq(index).attr('max');
			if(index>1){
				minInputValue = angular.element('.container-calculadoraDiaria input').eq(index-1).val();
			}
			if(angular.element('.container-calculadoraDiaria input').eq(index).val() == ""){
				$scope.marcaInvalido('.container-calculadoraDiaria input',index,"Informe as horas necessárias");
				count += 1; 
				temErro = true;
			}else if((inputValue > maxInputValue) || (inputValue < minInputValue)){
				if(inputValue > maxInputValue){
					$scope.marcaInvalido('.container-calculadoraDiaria input',index,"Horas precisam estar dentro do limite máximo");
				}else{
					$scope.marcaInvalido('.container-calculadoraDiaria input',index,"Horas não podem ser menores que campos anteriores");
				}
				$scope.moveTelaPara('.container-calculadoraDiaria .div-box-header');
				count += 1; 
				temErro = true;
			}else{
				angular.element('.container-calculadoraDiaria input').eq(index).removeClass('invalid');
			}
		}
		if(count == 0){
			$scope.marcaValido('.container-calculadoraDiaria input');
			temErro = false;
		}
		return temErro;
	}
	
	//Marca campos como válidos
	$scope.marcaValido = function(field){
		angular.element('.error').slideUp(1000);
		angular.element(field).removeClass('invalid');
		angular.element(field).addClass('valid');
	}
	
	//Marca campos como inválidos
	$scope.marcaInvalido = function(field,index, message){
		angular.element(field).removeClass('valid');
		angular.element(field).eq(index).addClass('invalid');
		angular.element('.error span').text(message);
		angular.element('.error').slideDown(1000);
	}
	
	//Função que Adiciona horas
	$scope.adicionaHoras = function(horasTrabalhar,tempoParaSubtrair){
		return moment(horasTrabalhar).add({ hours: tempoParaSubtrair.hours(), minutes: tempoParaSubtrair.minute()});
	}
	
	//Função que Calcula Almoco
	$scope.calculaAlmoco = function(horasTrabalhar){
		var saidaAlmoco = moment(angular.element("#horaDeSaidaAlmoco").val(),"HH:mm");
		var chegadaAlmoco = moment(angular.element("#horaDeChegadaAlmoco").val(),"HH:mm");
		var almoco = moment(moment.utc(moment(chegadaAlmoco).diff(moment(saidaAlmoco))).format("HH:mm"),"HH:mm");
		if(almoco.hours() < 1) almoco = moment('01:00','HH:mm');
		return $scope.adicionaHoras(horasTrabalhar, almoco);
	}
	
	//Função que Calcula Lanche
	$scope.calculaLanche = function(saida){
		for(var i=0 ; i<angular.element(".horaDeSaidaLanche").length; i++){
			var saidaLanche = moment(angular.element(".horaDeSaidaLanche").eq(i).val(),"HH:mm");
			var chegadaLanche = moment(angular.element(".horaDeChegadaLanche").eq(i).val(),"HH:mm");
			var lanche = moment(moment.utc(moment(chegadaLanche).diff(moment(saidaLanche))).format("HH:mm"),"HH:mm");
			saida = $scope.adicionaHoras(saida, lanche);  
		}
		return saida;
	}
	
	//Função que Calcula Saida Prevista
	$scope.calculaSaidaPrevista = function(){
		var horasTrabalhar = moment(angular.element('#horasParaTrabalhar').val(),"HH:mm");
		var entrada = moment(angular.element("#horaDeEntrada").val(),"HH:mm");
		var saida;
		
		if($scope.temAlmoco){
			saida = $scope.calculaAlmoco(horasTrabalhar);
		}
		if($scope.temLanche){
			if(saida != undefined){
				saida = $scope.calculaLanche(saida);
			}else{
				saida = $scope.calculaLanche(horasTrabalhar);
			}
		}
		if(saida != undefined){
			$scope.tempoPrevistoDeSaida = $scope.adicionaHoras(entrada,saida).format("HH:mm");
		}else{
			$scope.tempoPrevistoDeSaida = $scope.adicionaHoras(entrada,horasTrabalhar).format("HH:mm");
		}
	}

	$scope.calculaHorasRestantes = function(){
		var horasTrabalhar = moment();
		var horasTrabalhadas = moment();
		horasTrabalhadas.add(parseInt($scope.regimeDeHoras),'h');
		
		inputs = angular.element('.container-horarioSemanal .div-box-hora-entrada input');
		for(var i=0; i< inputs.length; i++){
			var tempo = inputs.eq(i).val();
			if(tempo != ""){
				var index = tempo.indexOf(':');
				var horasRestante = parseInt(tempo.substr(0,index));
				var minutosRestante = parseInt(tempo.substr(index +1));
				horasTrabalhadas.subtract({'hours': horasRestante,'minutes': minutosRestante});
			}
		}
		
		horasDiff = horasTrabalhadas.diff(horasTrabalhar,'hours');
		diasDiff = horasTrabalhadas.diff(horasTrabalhar,'days');
		
		var tempo = moment.utc(horasTrabalhadas.diff(horasTrabalhar)).format("HH:mm");
		var index = tempo.indexOf(':');
		var horasRestante = parseInt(tempo.substr(0,index));
		var minutosRestante = tempo.substr(index +1);
		horasRestante = horasRestante + (24*diasDiff);
		if(horasRestante < 10) horasRestante = "0" + horasRestante;
		if(horasTrabalhadas.isAfter(horasTrabalhar)){
			$scope.tempoRestante = horasRestante + ":" + minutosRestante;
		}else{
			$scope.tempoRestante = "00:00";
		}
		
	}
	
	$scope.CopiarTempoRestanteNaCalculadoraDiaria = function(){
		angular.element('.container-calculadoraDiaria #horasParaTrabalhar').val($scope.tempoRestante);
		angular.element('.calculadoraDiaria').click();
	}
	
	//Função Calcula hora
	$scope.calcularHora = function(){
		if(!$scope.verificaCampos()){
			angular.element('.resultado').slideDown();
			$scope.calculaSaidaPrevista();
			$scope.moveTelaPara('#HoraDeSaidaPrevista');
		}
	}
	$scope.moveTelaPara = function(id){
		window.scroll(0,angular.element(id)[0].offsetTop);
	}
});
