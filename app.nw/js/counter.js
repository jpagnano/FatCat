$(document).ready(function(){
	var pongOut = $("#pongOut").html(pongNum);
	var poolOut = $("#poolOut").html(poolNum);
	var shuffleOut = $("#shuffleOut").html(shuffleNum);
	var total=0;
	var pongNum = 0;
	var poolNum = 0;
	var shuffleNum = 0;
	// var up = {
	// 	key: 'Up',
	// 	active: function() {
	// 			if($(".pong .plus") && !($(".pool .plus") || $(".shuffle .plus")))
	// 			{
	// 				pongNum += total + 1;
	// 				pongOut.html(pad(pongNum, 3, 0));
	// 			}
	// 			else if (!($(".pong .plus") || $('.shuffle plus')) && ($(".pool .plus") || $(".shuffle .plus")))
	// 			{
	//
	// 			}
	// 	}
	// }
	// var option = {
	// 	key: 'Up',
	// 	active: function() {
	// 		pongNum += total + 1;
	// 		pongOut.html(pad(pongNum, 3, 0));
	// 	},
	// 	failed: function(msg)
	// 	{
	// 		conole.log(msg);
	// 	}
	// };
	//
	// var shortcut = this.shortcut;
	// shortcut = new gui.Shortcut(option);
	// $(".pong").mouseenter(function() {
	// 	$(".pong").keyup(function (){
	//
	// 	});
	// });

	// if(!win.shown){
  //   win.show();
  //   win.show = true;
	// }

	// function getInput() {
	// 	$( "input" ).keyup(function() {
	// 		total = $( this ).val();
	// 		if(total < 10)
	// 		{
	// 			total = $(this).pad(total,3, 0);
	// 		}
	// 		else if (total < 100)
	// 		{
	// 			total = $(this).pad(total, 2, 0);
	// 		}
	// 		else
	// 		{
	// 			$( ".out" ).text( total );
	// 		}
	// 	}).keyup();
	// };

	function pad(input, length, padding) {
  	while((input = input.toString()).length + (padding = padding.toString()).length < length)
  	{
    	padding += padding;
  	}
  		return padding.substr(0, length - input.length) + input;
	 	};

//============ Ping Pong Incrementor ============

		$(".pong .plus").click(function() {
			pongNum += total + 1;
			pongOut.html(pad(pongNum, 3, 0));
		});

//============ Pool Incrementor ============

		$(".pool .plus").click(function(){
			poolNum +=  total + 1;
			poolOut.html(pad(poolNum,3,0));
		});

//=========== Shuffle Board Incrementor ============
		$(".shuffle .plus").click(function(){
			shuffleNum += total + 1;
			shuffleOut.html(pad(shuffleNum,3,0));
		});

//============ Ping Pong Decrementer ============
		$(".pong .minus").click(function(){
		 	pongNum -= 1;
			if(pongNum < 0) {
				pongNum = 0;
				return pongNum;
			}
			pongOut.html(pad(pongNum,3,0));
		});

//============ Pool Decrementer ============
		$(".pool .minus").click(function(){
			poolNum -= 1;
			if(poolNum < 0) {
				poolNum = 0;
				return poolNum;
			}
			poolOut.html(pad(poolNum,3,0));
		});
//============ Shuffle Board Decrementer ============
		$(".shuffle .minus").click(function(){
			shuffleNum -= 1;
			if(shuffleNum < 0) {
				shuffleNum = 0;
				return shuffleNum;
			}
			shuffleOut.html(pad(shuffleNum,3,0));
		});



		// $(".out").click(function (){
		// 		$(this).html()
		// });
	$(function () {
		pongOut.css({
			"background-color": "rgb(0,0,255)",
			"color": "black",
			"font-size": "7em",
			"padding" : "35px",
			"margin": "0 auto",
			"color": "#FFF"
		});
		poolOut.css({
			"background-color": "rgb(0,0,255)",
			"color": "black",
			"font-size": "7em",
			"padding" : "35px",
			"margin": "0 auto",
			"color": "#FFF"
		});
		shuffleOut.css({
			"background-color": "rgb(0,0,255)",
			"color": "black",
			"font-size": "7em",
			"padding" : "35px",
			"margin": "0 auto",
			"color": "#FFF"
		});
	});
});
