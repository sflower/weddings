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
  var source = (JSON.parse(response));
  console.log(source);
  $("#realImage").attr("src",source.image);
  var imgRatio = source.width / source.height;
  $('#realImage').attr('class',imgRatio);
  $('#realImage').attr('idnumber',source.id);

  imageSize();

  });

  
  
}





