
//STARTING FUNCTIONS//
var userID = undefined;
var productID = null;
var itemURL;
var imageURL;
var shopID;
var shopURL;
var shopJSON;
var filter;
var myImgs;
var source;
var NumberOfLikes = 0;
var help = $.cookie('help')

if (help==null) 
{
	$('#fadedOverlay').removeClass('dontShow');
	$('#Help').removeClass('dontShow');
	$("#Help, #fadedOverlay").on
		("click", function()
			{
				$('#fadedOverlay').addClass('dontShow');
				$('#Help').addClass('dontShow');
				$.cookie('help', 'done', { expires: 365*10, path: '/', domain: 'hintweddings.com'});
			}
		)
};

// loads when website started
$(document).ready
(function() 
	{
		//this block pulls out the queries into the vars array
		var vars = [], hash;
		var q = document.URL.split('?')[1];
		    if(q != undefined){
		        q = q.split('&');
		        for(var i = 0; i < q.length; i++){
		            hash = q[i].split('=');
		            vars.push(hash[1]);
		            vars[hash[0]] = hash[1];
		        }
		}

		var search = vars['prodID'];
		var filter = $.cookie('filters');
		var test = vars['test'];
		if (vars['category']) {filter = vars['category']}
		console.log(search);
		

		if (!filter) {filter='All'};
		console.log(filter);
		$.cookie('filters', filter, { expires: 365*10, path: '/', domain: 'hintweddings.com' });	


		$("#shop").on
		("click", function()
			{
				$.get("../PHP/click.php", { event: "shop", userID: userID, productID: "productID"} );
				ga('send', 'event', 'shop', 'click', 'shop', 1);
				console.log('ok');
			}
		);



		 
		
		
		//sets userID from cookie or loads new by increasing maximum by 1
		userID = $.cookie('userID');
		if (userID != undefined && test) 
			{
				$.get
				(
				"../PHP/testUpdate.php", { userID:userID }
				)
			};
		if (userID == undefined) 
		{
			$.get
			(
				"../PHP/user.php", { search:test } , function(data)
				{	
					var something = JSON.parse(data);	
					userID = (something.userID);
					$.cookie('userID', userID, { expires: 365*10, path: '/', domain: 'hintweddings.com'});
				}
			);
		};

		//adjust size of window and images
		adjustSizes();

		//add Images to game
		addImages();
		
		//add Images to shop
		addShop();
			
		//loads when website changed size
		$(window).resize
		(function () 
			{ 
				adjustSizes();
				imageSize();
			}
		);

		// Last thing to load on page
		window.onload = function()
		{
			// kills the loading div
			$('#loadingOverlay').css({'display': 'none'});
		}

		//
		var sessionClicks = 0;
		
		//loads title text when image hovered on
		$("#imageHolder").on
		("mouseenter", function()
			{
				$('#imageText').fadeIn();
			}
		);

		//removes title text on image hover off
		$("#imageHolder").on
		("mouseleave", function()
			{
				$('#imageText').fadeOut();
			}
		);

		//toggles filters
		$(".actualCategory").on
		("click", function()
			{
				var filterName = $(this).children('h4').text();
				$.cookie('filters', filterName, { expires: 365*10, path: '/', domain: 'hintweddings.com' });
				window.location.replace("http://hintweddings.com");
			}
		);

		var completed = 1;

		// need to change so that it does it on click
		$(".catsFilter").on
		("click", function()
			{
				if ($('.categoryFilter').hasClass('unselected')) 
				{
					window.location.replace("http://hintweddings.com");
				}
				else
				{
					$(".category").removeClass('unselected');
					//turns the categories into selected or not
					
					
						$('.actualCategory h4:contains('+ filter + ')').parent().addClass('unselected');
						console.log(': ' + filter);
				

					$("#game").fadeOut().promise().done
					(function() 
						{
						    $("#filters").fadeIn();
						    $("#filters").addClass('thisSelected');
						    $(".categoryFilter").addClass('unselected');
						}
					);
					
				};
				
			}
		);

		//USED FUNCTIONS//

		//adjusts sizes based on screen size
		function adjustSizes()
		{	
			// change this to change the limit for mobile detection 
			var screenRatioMax = 1;

			// change this to change the limit for not stretching
			var screenRatioMax2 = 1.2;

			// finds the screen height
			var screenHeight = $(window).height(); 

			// finds the screen width
			var screenWidth = $(window).width();

			// finds the screen ratio
			var screenRatio = screenWidth / screenHeight;

			// find out whether screen ratio is small enough for just game
			if (screenRatio < screenRatioMax) 
			{

				// change this to change the limit for mobile height
				var screenHeightMax = 450

				//if iphone 4 size
				if (screenHeight < screenHeightMax) 
				{
					//remove the header as it just gets in the way
					$('#header').addClass('dontShow'); 
					//scale the game to be the correct size
					var gameHeight = screenHeight - 80;
					$('#theGame').css({'height': gameHeight}); 
				}
				
				//if mobile size bigger than iphone 4
				else
				{
					$('#header').removeClass('dontShow');
					//scale the game to be the right size
					var gameHeight = screenHeight - 100 - 80;
					$('#theGame').css({'height': gameHeight}); 
				};

				//adds the shop filter
				$('#shop').css({'display': 'inline-block'});
				//remove shop container from view
				if ($('#theGameContainer').css('display')!='none') 
				{
					$('#theShopContainer').css({'display': 'none'});
				};
					
				//changes the percentage of the lower filters to 25%
				$('.percent100').addClass('percent25');
				$('.percent100').removeClass('percent100');

				//remove margins around the divs
				$('#theGameContainer').removeClass('margins');
				$('#theShopContainer').removeClass('margins'); 
				$('#theGameContainer').css({'width': '100%'});
				$('#theShopContainer').css({'width': '100%'});
				$('#theShopContainer').css({'margin': '0px'});
				$('#verticalOverlay').css({'display': 'none'});
				$('#theGameButton').css({'display': 'inline-block'});
				$('.scrollBox').css({'height': screenHeight-80});

				//reset margin on game container
				$('#theGameContainer').css({'margin-left': 0});
				$('#theShopContainer').css({'height': screenHeight});

			}
			//if ratio enough for both containers
			else
			{	
				$('#header').removeClass('dontShow');
				//check whether it can actually show both side by side
				if (screenHeight > 450) 
				{
					var gameHeight = screenHeight - 100 - 80 - 40;
					$('#theGame').css({'height': gameHeight});

					var shopHeight = screenHeight - 40;
					$('#theShopContainer').css({'height': shopHeight});
					$('.scrollBox').css({'height': shopHeight-120});
					//removes the shop filter
					$('#shop').css({'display': 'none'});
					//displays the shop
					$('#theGameContainer').css({'display': 'inline-block'});
					$('#theShopContainer').css({'display': 'inline-block'});
					$('#theGameButton').css({'display': 'none'});
					$('.scrollBox').css({'height': '100%'});
					$('#theShopContainer').css({'margin-top': '20px'});

					//changes the percentage of the lower filters to 33%
					$('.percent25').addClass('percent100');
					$('.percent25').removeClass('percent25'); 
					//add margin around the divs
					$('#theGameContainer').addClass('margins'); 

					$('#verticalOverlay').css({'display': 'none'});

					//fits with stretching of divs
					if (screenRatio < screenRatioMax2) 
					{
						//set the large divs to be the right size
						var gameContainerWidth = (screenWidth - 60)/2;
						$('#theGameContainer, #theShopContainer').css({'width': gameContainerWidth});
						$('#theGameContainer').css({'margin-left': 20});
					}
					//divs remain the same ratio
					else
					{
						//set the large divs to be the right size
						var gameContainerWidth2 = ((screenHeight * screenRatioMax2) - 60)/2;
						$('#theGameContainer, #theShopContainer').css({'width': gameContainerWidth2});
						var gameContainerMargin = (screenWidth - 2 * gameContainerWidth2 - 20)/2;
						$('#theGameContainer').css({'margin-left': gameContainerMargin});
					};

				}
				//cant show both side by side then it says rotate 
				else
				{
					$('#verticalOverlay').css({'display': 'block'});			
				};

			};

			//scale the like and no buttons correctly
			var buttonWidth = ($('#theGameContainer').width() - 60)/2;
			$('#like, #nope').css({'width': buttonWidth});

			//scale the game height correctly
			var imageHolderHeight = $('#game').height() - 110;
			$('#imageHolder').css({'height': imageHolderHeight});
				
			//scale the game width correctly
			var imageHolderWidth = $('#game').width() - 40;
			$('#imageHolder').css({'width': imageHolderWidth});
			$('#imageText').css({'width': imageHolderWidth});

		}

		function imageSize()
		{

			var imageRatio = $('#realImage').attr('class');

			var holderHeight = $('#imageHolder').height();

			var holderWidth = $('#imageHolder').width();

			var holderRatio = holderWidth / holderHeight;

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
			
			$("#like").off("click");
			$("#nope").off("click");
			$('#realImage').animate
			(
				{opacity : 0},400,function()
				{
					var imgURL = source[sessionClicks].image;
					imageURL = imgURL;
					shopID = source[sessionClicks].supplierID;
					shopURL = source[sessionClicks].supplierURL;
					var categoryIMG = "IMG/" + source[sessionClicks].category + ".svg";
					var label = source[sessionClicks].name;
					var imgRatio;
					itemURL = source[sessionClicks].url;
					var img = $('<img src="'+imgURL+'"/>').load
					(function()
						{
	    					imgRatio = this.width / this.height;
	    					$('#realImage').attr('class',imgRatio);
	    					imageSize();
						}
					);
					$("#realImage").attr("src",imgURL);
					$("#categoryImage img").attr("src",categoryIMG);
					$("#imageText").text(label);
			  		$('#realImage').attr('idnumber',source[sessionClicks].id);
			  		productID = source[sessionClicks].id;
					sessionClicks++;
					$('#like').css({'opacity': '1'})
					$('#nope').css({'opacity': '1'})
						
					//changes the image on click
					$("#like").on
					("click", function()
						{
							ga('send', 'event', 'like', 'click', 'like', 1);
							$('#like').css({'opacity': '0.8'})
							$.get("../PHP/click.php", { event: "like", userID: userID, productID: productID} );
							changeimage();
							NumberOfLikes = NumberOfLikes + 1;
							$('#congratulations h2:nth-of-type(1)').text("You've liked your first " + NumberOfLikes + " items!");
							if (NumberOfLikes % 5 === 0 && $('#theShopContainer').is(":hidden")) 
								{
									$('.top').removeClass('dontShow');
									$('#fadedOverlay2').removeClass('dontShow');
									$('#fadedOverlay3').removeClass('dontShow');
									$('#congratulations').removeClass('dontShow');
									$("#congratulations, #fadedOverlay2, #fadedOverlay3, #shop").on
										("click", function()
											{
												$('#fadedOverlay2').addClass('dontShow');
												$('#fadedOverlay3').addClass('dontShow');
												$('#congratulations').addClass('dontShow');
												$('.top').addClass('dontShow');
											}
										)

								};
							if (sessionClicks>20) {location.reload()};
							$('#shop h3').animate({"font-size": '32px'}, 200);
							$('#shop h3').html(parseInt($('#shop h3').html(), 10)+1);
							$('#shop h3').animate({"font-size": '24px'}, 200);
							addToShop();
							
						}
					);

					//changes the image on click
					$("#nope").on
					("click", function()
						{
							ga('send', 'event', 'nope', 'click', 'nope', 1);
							$('#nope').css({'opacity': '0.8'})
							$.get("../PHP/click.php", { event: "nope", userID: userID, productID: productID} );
							changeimage();
							if (sessionClicks>20) {location.reload()}; 	
						}
					);

					//changes the shop page on click
					$("#shop").on
					("click", function()
						{
							$('#theShopContainer').css({'display': 'inline-block'});
							$('#theGameContainer').css({'display': 'none'});
						}
					);

					$("#theGameButton").on
					("click", function()
						{

							$('#theShopContainer').css({'display': 'none'});
							$('#theGameContainer').css({'display': 'inline-block'});
							adjustSizes();
							imageSize();

						}
					);


				}
			);
		}

		function addImages() 
		{
			if (userID==undefined) 
					{
						userID = 9999999;
					};	
				
			$.get
			(
				"../PHP/image.php", { filter: filter, user: userID, search:search } ,function(data)
				{
					source = JSON.parse(data);	
					console.log(source);
					changeimage();
					cacheImages();
				}
			);
			
		}
		
		function cacheImages() 
		{
			myImgs = [source[0].image, source[1].image,source[2].image,source[3].image,source[4].image,source[5].image,source[6].image,source[7].image,source[8].image,source[9].image,source[10].image,source[11].image,source[12].image,source[13].image,source[14].image,source[15].image,source[16].image,source[17].image,source[18].image,source[19].image];
			preload(myImgs);

		}

		function preload(imgs) 
		{
			var img;
			for (var i = 0, len = imgs.length; i < len; ++i) 
			{
			    img = new Image();
			    img.src = imgs[i];
			}	
		}

		function addToShop() 
		{
			//loops through each one and finds if the text is found
			var selectionContainsNumber = 0;
			var actualSelection;
			var selectionsContains =  $(".shopTag a:contains("+ shopID + ")");
			selectionsContains.each
			(function(index,value)
				{
					if ($(this).text()==shopID) 
					{
						selectionContainsNumber = 1;
						actualSelection = $(this);
					};
				}
			)
			if (selectionContainsNumber ==1) 
			{
				actualSelection.parent().children('div').append("<a href=" + itemURL + " target='_blank' class='imageClick'><img src="+ imageURL +"></img></a>");
	            //this is where it is ordered
	            var likeNumber = parseInt(actualSelection.parent().children('h1').text())+1;
	            actualSelection.parent().children('h1').text(likeNumber);
	            $(".shopTag h1:contains(" + (likeNumber-1) + ")").first().parent().before( actualSelection.parent() );
	   		}
	        else
	        {
				$('.scrollBox').append("<div class='shopTag'></div>");
				$('.shopTag:last').append("<h1>1</h1>");
				$('.shopTag:last').append("<a href=" + 'http://' + shopURL + " target='_blank' class='shopClick shopName' >" + shopID + "</a>");
				$('.shopTag:last').append("<a href=" + 'http://' + shopURL + " target='_blank' class='shopClick shopButton' >Visit Site</a>");
				$('.shopTag:last').append("<div></div>");
				$('.shopTag:last div').append("<a href=" + itemURL + " target='_blank' class='imageClick'><img src="+ imageURL +"></img></a>");
				};

			
		

			$(".shopClick").off('click');
			$(".imageClick").off('click');

			//logs clicks 
			$(".shopClick").on
			('click' , function()
				{
					console.log('sorted');
					ga('send', 'event', 'client', 'click', 'client', 1);
					var shop = $(this).parent().children('.shopName').text();
					$.get
					(
						"../PHP/external.php", {  userID: userID, shop: shop, item: 0}
					);

						
				}
			);

			$(".imageClick").on
			('click' , function()
				{
					console.log('sorted');
					ga('send', 'event', 'client', 'click', 'client', 1);
					var shop = $(this).parent().parent().children('.shopName').text();
					var item = $(this).attr('href');
					$.get
					(
						"../PHP/external.php", {  userID: userID, shop: shop, item: item}
					);
				}
			);
		}

		function addShop()
		{
			$.get
			(
				"../PHP/shop.php", { userID: userID },function(data)
				{
					shopJSON = JSON.parse(data);
					console.log(shopJSON);
					for (var i = 0; i < shopJSON.length ; i++) 
					{
						shopID = shopJSON[i].shop;
						shopURL = shopJSON[i].URL;
						itemURL = shopJSON[i].item_url;
						imageURL = shopJSON[i].image_url;
						addToShop();
						NumberOfLikes = shopJSON.length;
						$('#shop h3').text(shopJSON.length);
					};
				}
			);
		}

		$('#realImage').load
		(function() 
			{
				$('#realImage').animate({opacity : 1},400);
			}
		);

		$("#realImage").error
		(function()
			{
				changeimage();
				if (sessionClicks>20) {location.reload()};
			}
		);


	}
);