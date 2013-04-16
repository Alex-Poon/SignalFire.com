// ******************************* Configuration **************************//
// ***********************************************************************//
// ********************************* Start ******************************// 

// =======================================================================// 
// Twitter                                                               //        
// =====================================================================//

//Set true or false to enable/disable
var twitter_enabled = true;

//Your twitter username
var twitter_username = 'pixelthrone';

// =======================================================================// 
// Google Maps                                                           //        
// =====================================================================//

// Point 1
var google_maps_latitude = 37.78382;
var google_maps_longitude = -122.39203;

// Point 2 (Set to null if you want to disable)
var google_maps_latitude_2 = null;
var google_maps_longitude_2 = null;

//Circle color
var google_maps_circle_color = '#fb8047';

//Landscape color
var google_maps_landscape_color = '#0e0e0e';

//Water color
var google_maps_water_color = '#282828';

// =======================================================================// 
// Timer                                                                 //        
// =====================================================================//

//Set true or false to enable/disable
var timer_enabled = false;

//Year
var countdown_year = 2013; 
        
//Month
var countdown_month = 1;
        
//Day
var countdown_day = 1;

// =======================================================================// 
// Slideshow                                                             //        
// =====================================================================//


//Time between slide changes in milliseconds. (1000 = 1 second)
var slideshow_slide_interval = 9000;

//Slideshow transition effect (Available: none, fade, cover, uncover, scrollUp, scrollDown, scrollLeft, scrollRight, scrollHorz, scrollVert)
var slideshow_transition = 'fade'; 

//Speed of transitions in milliseconds. (1000 = 1 second)
var slideshow_transition_speed = 2000;

// =======================================================================// 
// Newsletter form                                                       //        
// =====================================================================//

////Set true or false to enable/disable ajax (If you want to use third-party services like Mailchimp, Campaign Monitor,you should disable ajax form)
var ajax_form = true;


// ******************************* Configuration **************************//
// ***********************************************************************//
// ********************************** End *******************************// 




/* Do not modify below unless you know what you are doing */

var brwsr = $.browser;

$('.block').addClass('unloaded');
$('.block.unloaded .container > *').css({'opacity' : 0});

$(document).ready(function() {

	/* Pre-loading */
    if ( !brwsr.msie || (brwsr.msie && brwsr.version.slice(0,3) >= "9") )
    {
    	$("body").queryLoader2({
    		backgroundColor: '',
    		barColor: '',
    		barHeight:0,
    		onComplete: function() { 

    			$('body').switchClass( "unloaded", "loaded", 1, 'easeInOutQuad',  function() { 

    				$('#main').animate({ 'opacity' : 1 }, 1).switchClass('unloaded', 'loaded');

    				$('.block').switchClass('unloaded', 'loaded', 1, 'easeInOutExpo');

                    $('#timer').animate({ 'opacity' : 0.1 });

    				$('.block').each(function(index) {

    					var t = 2000;

    					$(this).find('.container').children(':not(#timer)').each(function(index) {
    						$(this).delay(t).animate({ 'opacity' : 1 }, { queue: true, duration: 1500 });
    						t += 750;
    					});

    				});
    				
    			});

    		}
    	});
    }

    else
    {
        $('body, .block, #main').switchClass( "unloaded", "loaded");
        $('.block.unloaded .container > *, #main').css({'opacity' : 1});

         $('#timer').animate({ 'opacity' : 0.1 });

        $('.block').each(function(index) {
            $(this).find('.container').children(':not(#timer)').each(function(index) {
                $(this).css({ 'opacity' : 1 });
            });
        });
    }


    if (timer_enabled == true)
    {
        var date_target = new Date(countdown_year, countdown_month-1, countdown_day);

        $('#timer').countdown({
            until: date_target, 
            layout: '<span class="hours">{dn}D/{hn}h</span><span class="minutes">{mn}m/<span class="seconds">{sn}s</span></span>'
        });
    }

    else
    {
        $('#timer').hide().remove();
    }


	$('.loader').spin({ color: '#fff' });

	/* Block heights */
	$('.block').css({ 'min-height' : $(window).height()-110 });

	$(window).resize(function() {
		$('.block').css({ 'min-height' : $(window).height()-110 });
	});

    if (twitter_enabled == true)
    {
        $(".twitter-feed").tweet({
            join_text : "",
            count : 1,
            loading_text : "loading tweets...",
            username : twitter_username,
            template : "{text}{join}{time}"
        });    
    }

    else
    {
        $('.twitter-feed').hide().remove();
    }

	
/*
	$('.btn-home-mail').click(function() {
		$('.newsletter-opened').hide('drop', { direction: "right", easing: 'easeInQuad' }, 500, function(){
			$('.newsletter-closed').show('drop', { direction: "left", easing: 'easeOutQuad' }, 500);
		});

		return false;
	});
*/
    
    $('.btn-home-mail').click(function() {
        setTimeout(function(){toastr.error("That username and password combination is incorrect.", "Login Failed"); $('.container header img').fadeOut();},2500);
        $('.container header img').fadeIn();
        return false;
    });
	$('.btn-home-close').click(function() {
		$('.newsletter-closed').hide('drop', { direction: "right", easing: 'easeInQuad' }, 500, function(){
			$('.newsletter-opened').show('drop', { direction: "left", easing: 'easeOutQuad' }, 500);
		});

		return false;
	});

	$.localScroll({
		easing : 'easeInOutExpo',
		hash : true
	});


    if ($('#slideshow video').length)
    {
        $('video, object').maximage('maxcover');
        $('html, body').css({'overflow-x' : 'hidden'});
    }

    else
    {
       
        $('#slideshow').maximage({
            cycleOptions: {
                fx : slideshow_transition,
                speed : slideshow_transition_speed,
                timeout : slideshow_slide_interval
            },
            cssTransitions : false
        });
    }

    $('.home').css({'background' : 'none'});


    /* Form Submit */
    $('.newsletter-home').submit(function() {
        
        var form_data = $(this).serialize();

        if (validateEmail($('input[name=email]').attr('value')))
        {
            
            if (typeof ajax_form !== "undefined" && ajax_form === true)
            {
                
                $.post($(this).attr('action'), form_data, function(data) {
                    $('.form-newsletter .span4, .form-newsletter .span1').fadeOut('slow', function() { 
                        $('.form-newsletter').html('<div class="form-msg span4" style="height:52px;">' + data + '</div>');
                        setTimeout(function() { $('.btn-home-close').trigger('click') } , 5000);
                    });
                    $('.spam').html('&nbsp;');
                });
            }
            
        }

        else
        {
            $('.spam').text('Please enter a valid e-mail').filter(':not(:animated)').effect("pulsate", { times:3 }, 2000);
        }

        return false;
        
    });

	//Init Google Maps
	startGmap();

    $('input, textarea').placeholder();

    if ( !brwsr.msie )
    {
        $('.newsletter-home button').hover(function () {
            $('.newsletter-home button span').hide('drop', { direction: "up", easing: 'easeOutQuad' }, 250, function() {
                $('.newsletter-home button span').show('drop', { direction: "down", easing: 'easeOutQuad' }, 250);
            });
        }, function () {
           $('.newsletter-home button span').hide('drop', { direction: "up", easing: 'easeOutQuad' }, 250, function() {
                $('.newsletter-home button span').show('drop', { direction: "down", easing: 'easeOutQuad' }, 250);
            });
        });

	}

    $('.logo').retina();

});

/* functions */
//gmaps
function startGmap(){var n={zoom:4,center:new google.maps.LatLng(google_maps_latitude,google_maps_longitude),navigationControlOptions:{style:google.maps.NavigationControlStyle.NORMAL,position:google.maps.ControlPosition.RIGHT_TOP},streetViewControl:false,scrollwheel:false,zoomControl:true,zoomControlOptions:{style:google.maps.ZoomControlStyle.DEFAULT,position:google.maps.ControlPosition.RIGHT_TOP},mapTypeControl:false,mapTypeControlOptions:{style:google.maps.MapTypeControlStyle.DROPDOWN_MENU,position:google.maps.ControlPosition.TOP_RIGHT,mapTypeIds:["ptMap"]}};map=new google.maps.Map(document.getElementById("contact_map"),n);var j=[{featureType:"administrative",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"landscape",elementType:"all",stylers:[{color:google_maps_landscape_color},{visibility:"on"}]},{featureType:"poi",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"road",elementType:"all",stylers:[{visibility:"on"},{lightness:-30}]},{featureType:"transit",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"water",elementType:"all",stylers:[{color:google_maps_water_color}]}];var m={name:"Map"};var l=new google.maps.StyledMapType(j,m);map.mapTypes.set("ptMap",l);map.setMapTypeId("ptMap");var k={path:google.maps.SymbolPath.CIRCLE,fillOpacity:0.75,fillColor:google_maps_circle_color,strokeOpacity:1,strokeColor:google_maps_circle_color,strokeWeight:1,scale:10};var q=new google.maps.LatLng(google_maps_latitude,google_maps_longitude);var p=new google.maps.Marker({position:q,map:map,zIndex:99999,optimized:false,icon:k});if(google_maps_latitude_2&&google_maps_longitude_2){var i={path:google.maps.SymbolPath.CIRCLE,fillOpacity:0.75,fillColor:google_maps_circle_color,strokeOpacity:1,strokeColor:google_maps_circle_color,strokeWeight:1,scale:10};var h=new google.maps.LatLng(google_maps_latitude_2,google_maps_longitude_2);var o=new google.maps.Marker({position:h,map:map,zIndex:99999,optimized:false,icon:i})}};

//spinner
$.fn.spin=function(a){this.each(function(){var c=$(this),b=c.data();if(b.spinner){b.spinner.stop();delete b.spinner}if(a!==false){b.spinner=new Spinner($.extend({color:c.css("color")},a)).spin(this)}});return this};

//validate email
function validateEmail(a){var b=/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;return b.test(a)};
