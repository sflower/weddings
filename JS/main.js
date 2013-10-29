// /* This is the initial files for the holding page */

// Loads on document ready - acts as the console
$(document).ready(function() 
{

  adjustMarginBelowLimit();
  adjustHeightToScale();
   checkHelp();
  adjustCategories();
  adjustGame();
  changeimage();

 
});


// Runs when window is resized - acts as secondary console
$(window).resize(function () 
{ 
	
	adjustMarginBelowLimit();
	adjustHeightToScale();
	
	adjustCategories();
	adjustGame();
	imageSize();
	
});

//runs when window fully loaded - literally the last thing ever
window.onload = function(){
	 $('#overlay').fadeOut('slow', function() {
     // Animation complete.
  });
}


 

// these ones just run wehenever
$(".categoryHelp").on("click", function()
{

		checkHelp();
	
});

$("#imageHolder").on("mouseenter", function()
{

		console.log('imageHolder');	

		if ($('#helpOverlay').hasClass('dontShow')) {

			$('#imageText').fadeIn();

		};
		

});

$("#imageHolder").on("mouseleave", function()
{

		console.log('imageHolder');	

		if ($('#helpOverlay').hasClass('dontShow')) {

			$('#imageText').fadeOut();

		};
		

});


$(".actualCategory").on("click", function()
{

		$(this).toggleClass('unselected');
	
});

var completed = 1;

$(".catsFilter").on("click", function()
{
	if ($('.categoryFilter').hasClass('unselected')) 
	{

		
		$('#filters').fadeOut(function()
		{ 
			$('#game').fadeIn(); 
			$(".categoryFilter").removeClass('unselected');
		});
	}
	else
	{
		
		if (completed==1) 
		{

			$(".category").removeClass('unselected');
			completed = 0;	
			$("#game, #Login, #Help").fadeOut().promise().done(function() 
			{
		    	$("#filters").fadeIn();
		    	$(".categoryFilter").addClass('unselected');
		    	completed = 1;

			});
			
		};
		
	};
	
});

$(".catsLogin").on("click", function()
{
	if ($('.categoryLogin').hasClass('unselected')) {
		

		$('#Login').fadeOut(function(){ 
			$('#game').fadeIn(); 
			$(".categoryLogin").removeClass('unselected');
		});
	}
	else
	{
		
		if (completed==1) 
		{

			$(".category").removeClass('unselected');
			completed = 0;	
			$("#game, #filters, #Help").fadeOut().promise().done(function() 
			{
		    	$("#Login").fadeIn();
		    	$(".categoryLogin").addClass('unselected');
		    	completed = 1;

			});
			
		};
		
	};
	
});




$("#like").on("click", function()
{
	
	changeimage();
	
});

$("#nope").on("click", function()
{
	changeimage();
	
});

$('#realImage').load(function() {
      $('#realImage').animate({opacity : 1},400);
    });


function adjustMarginBelowLimit(){

	// changes margins

	// change this to change the limit
	 var limit = 600;

	 // finds the difference between the screen size and the div
	 var gap = limit - $(window).height(); 

	 // finds the difference between window and object - if it hasn't room
	 if (gap>0) 
	 {
	 	if (gap<80) 
	 	{
	 		// there is limited room so reduce margin
	 		$('#content').css({'marginTop': 40 - gap/2}); 
		
	 	}

	 	else
	 	{
	 		// if no room then no margin and no radius
	 		$('#content').css({'marginTop': 0}); 
	 		
	 	};
	 	
	 }

	 else
	 {
	 	// it has enough room - add border radius and margins
		$('#content').css({'marginTop': 40});

	 };
}

function adjustHeightToScale() {

	// Changes the height of the divs based on the height of the screen

	var limit = 600;

	// finds the current margins at the top of div
	var contentTopMargin = $('#content').css('marginTop'); 


	// makes this a number
	contentTopMargin = parseInt(contentTopMargin);

	// Adjusts heights to scale of page
	var calculatedHeight = $(window).height() - 100 - 2 * contentTopMargin; 

	// stops height from changing below limit
	if (calculatedHeight < limit - 180) 
		{
			calculatedHeight = limit - 180;
			
		};

	// Change this to change ratio of box
  	var gameRatio = 1.5;

  	// changes width to be ratio
	var calculatedWidth = calculatedHeight / gameRatio; 

	// changes widthextra to be needed size
	var calculatedWidthExtra = calculatedWidth * 2 + 45;


	
	if (calculatedWidthExtra + 20 > $(window).width()) 
	{
		$('#theShopContainer').css({'display': 'none'});	
		
		$('#shop').css({'display': 'inline-block'});
		$('#footerContainer').css({'width': '75%'});
		var calculatedWidthExtra = calculatedWidth;
	}

	else
	{
		$('#theShopContainer').css({'display': 'inline-block'});
		$('#footerContainer').css({'width': '100%'});
		$('#shop').css({'display': 'none'});
	};

	// adds extra 100 for non header boxes
	var calculatedHeightExtra = calculatedHeight + 100;

	//converts to pixels
	var calculatedWidthMargin = calculatedWidth - 26 + "px";
	calculatedWidth = calculatedWidth + "px"
	
	calculatedWidthExtra = calculatedWidthExtra + "px";
	calculatedHeight = calculatedHeight - 80 + "px";
	calculatedHeightExtra = calculatedHeightExtra + "px";

	// Changes CSS
  	$('.calculatedHeight').css({'height': calculatedHeight});
	$('.calculatedHeightExtra').css({'height': calculatedHeightExtra});
  	$('.calculatedWidth').css({'width': calculatedWidth});
  	$('.calculatedWidthExtra').css({'width': calculatedWidthExtra});
  	$('.close').css({'margin-left':calculatedWidthMargin});

 }

function adjustbackground(){

	 var screenwidth = $(window).width();
	 var screenheight = $(window).height();

	 var imageRatio = 1.4988

	 if (screenheight > screenwidth / imageRatio)
	 {	
	 	imageheight = screenheight;
	 	imagewidth = screenheight * imageRatio;
	 }
	 else
	 {
	 	imagewidth = screenwidth;
	 	imageheight = screenwidth / imageRatio;
	 };


	 var backgroundSize = imagewidth + "px " + imageheight + "px";


	 $('body').css({'background-size': backgroundSize});

	 console.log(backgroundSize);
}

function adjustCategories(){

	//works out the space required for each category
	
	

}

function adjustGame(){

	//works out the space required for each category
	
	var gameWidth = $('#theGame').width();
	var gameHeight = $('#theGame').height();

	var imagewidth = gameWidth - 40;
	var imageheight = gameHeight - 110;
	var buttonWidth = (gameWidth - 60)/2;

	$('#nope').css({'width': buttonWidth});
	$('#like').css({'width': buttonWidth});
	$('#imageHolder').css({'width': imagewidth});
	$('#imageText').css({'width': imagewidth-20});
	$('#imageHolder').css({'height': imageheight});
}

function imageSize(){

var imageRatio = $('#realImage').attr('class');

var holderHeight = $('#imageHolder').height();

var holderWidth = $('#imageHolder').width();

var holderRatio = holderWidth / holderHeight;

console.log(holderRatio);
console.log(imageRatio);



if (imageRatio > holderRatio) 
	{
		imageWidth = $('#imageHolder').width();
		imageHeight = imageWidth / imageRatio;

		
	}
else
	{
		imageHeight = $('#imageHolder').height();
		imageWidth = imageHeight * imageRatio;
	};


	var marginHeight = (($('#imageHolder').height()) - imageHeight)/2;
	$('#realImage').css({'height': imageHeight});
	$('#realImage').css({'width': imageWidth});
	$('#imageMargin').css({'height': marginHeight});

}

function changeimage() 
{
  	

  	var xmlHttp = getXMLHttp();

	  xmlHttp.onreadystatechange = function()
	  {
	    if(xmlHttp.readyState == 4)
	    {
	      HandleResponse(xmlHttp.responseText);
	    }
	  }
	  
	  var str = 1 + Math.floor(Math.random() * 70);
	  console.log(str);
	  xmlHttp.open("GET", "../PHP/image.php?q="+str, true); 
	  xmlHttp.send(null);

	
}



function getXMLHttp()
{
  var xmlHttp

  try
  {
    //Firefox, Opera 8.0+, Safari
    xmlHttp = new XMLHttpRequest();
  }
  catch(e)
  {
    //Internet Explorer
    try
    {
      xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
    }
    catch(e)
    {
      try
      {
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
      }
      catch(e)
      {
        alert("Your browser does not support AJAX!")
        return false;
      }
    }
  }
  return xmlHttp;
}

function HandleResponse(response)
{
  
  $('#realImage').animate({opacity : 0},400,function(){

  	var source 
  source = (JSON.parse(response));
  console.log(source);
  $("#realImage").attr("src",source.image);
  var imgRatio = source.width / source.height;
  $('#realImage').attr('class',imgRatio);
  $('#realImage').attr('idnumber',source.id);

  imageSize();

  });

  
  
}

function checkHelp()
{

	Helpfile();

}

function Helpfile()
{

	
	step1();

	$("#all").on("click", function()
	{
		
		step2();

		$("#all").on("click", function()
		{
			
			step3();

			$("#all").on("click", function()
			{
			
				step4();

				$("#all").on("click", function()
				{
			
					step5();

				});

			});
		
		});
	
	});

}

function step1()
{

	$('#helpOverlay').removeClass('dontShow');
	$('#header').addClass('helpTop');
	$('.step1').removeClass('dontShow');

}

function step2()
{

	$('#loading').removeClass('dontShow');
	$('#helpOverlay').removeClass('dontShow');
	$('.helpTop').removeClass('helpTop');
	$('.helpText').addClass('dontShow');
	$('#imageHolder').addClass('helpTop');
	$('#filters').addClass('helpTop');
	$('#Login').addClass('helpTop');
	$('.step2').removeClass('dontShow');

	$('.circle').addClass('opacityHalf');
	$('#loading1').removeClass('opacityHalf');

}

function step3()
{
	$('#loading').removeClass('dontShow');
	$('#helpOverlay').removeClass('dontShow');
	$('.helpTop').removeClass('helpTop');
	$('.helpText').addClass('dontShow');
	$('#game').addClass('helpTop');
	$('#filters').addClass('helpTop');
	$('#Login').addClass('helpTop');
	$('.step3').removeClass('dontShow');

	$('.circle').addClass('opacityHalf');
	$('#loading2').removeClass('opacityHalf');

}

function step4()
{
	$('#loading').removeClass('dontShow');
	$('#helpOverlay').removeClass('dontShow');
	$('.helpTop').removeClass('helpTop');
	$('.helpText').addClass('dontShow');
	$('#shop').addClass('helpTop');
	$('#theShopContainer').addClass('helpTop');
	$('#step4').removeClass('dontShow');
	$('#step5').removeClass('dontShow');

	$('.circle').addClass('opacityHalf');
	$('#loading3').removeClass('opacityHalf');

}

function step5()
{
	
	$('.helpTop').removeClass('helpTop');
	$('.helpText').addClass('dontShow');
	$('#helpOverlay').addClass('dontShow');
	$('#loading').addClass('dontShow');

}

