

(function($) {
  "use strict";

    var titleAnimation = 'animated ' + subtitleAnimation;
    var fullPageExist = false;
    var bgAnchor = '.backstretch-holder';
    var hashChange = window.location.hash;
    var hash = '#home';
    var copyText = $('.copy').html();
    var aniIn = 'animated ' + fadeInAnimation;
    var aniOut =  'animated ' + fadeOutAnimation;
    var onAnimationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    var map;
    var gradientData = overlayGradient.replace(/\s/g, '').split(',');

    if (backgroundType == 'image') {
      var img1 = 'img\/' + single_img;
    }
    else if (backgroundType == 'gallery') {
      var img1 = 'img\/' + gallery_img1;
      var img2 = 'img\/' + gallery_img2;
      var img3 = 'img\/' + gallery_img3;
    }
    else if (backgroundType == 'video') {
      var img1 = 'img\/' + fallbackImg;
    }
    else if(backgroundType == 'color') {

    }
    var img4 = 'img\/' + contact_img;
    
    if(overlayType != 'none') {
      if(headerOverlay == true && mapOverlay == true) var overlay = $('.mob-overlay, .desk-overlay-header, .desk-overlay-contact');
      else if(headerOverlay == true && mapOverlay == false) var overlay = $('.mob-overlay, .desk-overlay-header');
      else if(headerOverlay == false && mapOverlay == true) var overlay = $('.mob-overlay, .desk-overlay-contact');
      else var overlay = false;

      if(overlay != false) {
        if(overlayType == 'color') overlay.addClass('lj-overlay-color');
        else if(overlayType == 'image') overlay.addClass('lj-overlay-image');
        else if(overlayType == 'gradient') overlay.addClass('lj-overlay-gradient');
        else if(overlayType == 'colorAndImage') { 
          overlay.addClass('lj-overlay-color');
          overlay.addClass('lj-overlay-image');
        };
      };
      
    };

    var quote = false;
    var twitter = false;
    var countdown = false;

    if(widget == 'quote') {
      quote = true;
      $('.lj-quote').css('display', 'block')
    }
    if(widget == 'twitter') {
      twitter = true;
      $('.lj-twitter-feed').css('display', 'block')
    }
    if(widget == 'text') {
      $('.lj-home-paragraph').css('display', 'block')
    }
    if(widget == 'countdown') {
      countdown = true;
      $('.lj-countdown').css('display', 'block')
    }

    if (!$('.mobile')[0]) {
      fullPageExist = true;
      var bgAnchor = '#bg';
    }
    else displayMap = false;

    function hex2rgb(hex, opacity) {
      var h=hex.replace('#', '');
      h =  h.match(new RegExp('(.{'+h.length/3+'})', 'g'));

      for(var i=0; i<h.length; i++)
        h[i] = parseInt(h[i].length==1? h[i]+h[i]:h[i], 16);

      if (typeof opacity != 'undefined')  h.push(opacity);

      return 'rgba('+h.join(',')+')';
    };

    // Fullpage
    function fullPageInit(){
      $('#fullpage').fullpage({
        responsive: 0,
        resize: false,
        scrollOverflow: true,
        controlArrows: false,
        css3: true,
        navigation: false,
        loopHorizontal: false,
        verticalCentered: true,
        slidesNavigation: false,
        animateAnchor: true,
        scrollingSpeed: 700,
        anchors: ['home', 'contact'],
        
        afterResize: function(){
          if (backgroundType != 'color') {
            $(bgAnchor).backstretch("resize");
          };
          googleMaps(displayMap, lat, lng, marker, seaColor, landColor, borderColor, zoom, border);
        },

        afterLoad: function(anchorLink, index){
          $('.lj-map-top-bar').animate({
            height: '70px'
          }, 500);
          $('.footer').animate({
            height: '70px'
          }, 500);
          if(index == 1){
            $('.lj-footer-socials li, .lj-footer-copyrights p').animate({
              opacity: '1'
            }, 500);
          }
          else {
            $('.lj-map-back, .lj-map-menu').animate({
              opacity: '1'
            }, 500);
          };
          
          animateTitle(window.location.hash);
        },

        onLeave: function(index, nextIndex, direction){

          if(index == 1) { 
            $('.footer').animate({
              height: '0%'
            }, 500);
            $('.lj-footer-socials li, .lj-footer-copyrights p').animate({
              opacity: '0'
            }, 150);
          }
          if(index == 2) {
            $('.lj-map-top-bar').animate({
              height: '0%'
            }, 500);
            $('.lj-map-menu, .lj-map-back').animate({
              opacity: '0'
            }, 150);
          }
        },

        afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex){
          if(backgroundType == 'gallery') {
            bgChange(window.location.hash);
          }
          else if(backgroundType == 'image') {
            var actualHash = window.location.hash.split('/');
            actualHash = actualHash[0];
            if(actualHash != hashChange){
              bgChange(window.location.hash);
              hashChange = actualHash;
            };
          };
          
          animateTitle(window.location.hash);
        }
      });
    };

    function animateTitle(hash) {
      $('h1').removeClass(titleAnimation).css('opacity', '0');
      if(hash == '#home') $('.home h1').addClass(titleAnimation).css('opacity', '1');
      if(hash == '#home/about') $('.about h1').addClass(titleAnimation).css('opacity', '1');
      if(hash == '#home/services') $('.services h1').addClass(titleAnimation).css('opacity', '1');
      if(hash == '#contact') $('.contact h1').addClass(titleAnimation).css('opacity', '1');
    };

    // quotes animator
    function lumberQuote() {
      var ticker = $('.lj-quote');
        ticker.children('div:first').show().siblings().hide();        
        setInterval(function() {
          ticker.find('div:visible').addClass(aniOut).one(onAnimationEnd, function() {
            $(this).css('display','none').removeClass(aniOut).appendTo(ticker);
            ticker.children('div:first').css('display', 'block').addClass(aniIn).one(onAnimationEnd, function(){
              $(this).removeClass(aniIn);
            });
          });
        }, displayDuration);
    };

    // Countdown
    function counterup() {
      $('.lj-countdown .row').countdown({
        date: endDate,
        render: function(data) {
          $(this.el).html('<div><div><span>' + (parseInt(this.leadingZeros(data.years, 2)*365,10) + parseInt(this.leadingZeros(data.days, 2),10)) + '</span><span>Days</span></div><div><span>' + this.leadingZeros(data.hours, 2) + '</span><span>Hours</span></div></div><div class="lj-countdown-ms"><div><span>' + this.leadingZeros(data.min, 2) + '</span><span>Minutes</span></div><div><span>' + this.leadingZeros(data.sec, 2) + '</span><span>Seconds</span></div></div>');
        }
      });
    };

    // E-mail validation via regular expression
    function isValidEmailAddress(emailAddress) {
      var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
      return pattern.test(emailAddress);
    };

    // background changer
    function bgChange(page){
        
      if(backgroundType == 'image' || backgroundType == 'video') {

        if(page == '#home') var id = 0;
        if(page == '#home/about') var id = 0;
        if(page == '#home/services') var id = 0;
        if(page == '#contact') var id = 1;

      }
      else if(backgroundType == 'gallery') {

        if(page == '#home') var id = 0;
        if(page == '#home/about') var id = 1;
        if(page == '#home/services') var id = 2;
        if(page == '#contact') var id = 3;

      };

      if (backgroundType != 'color') {
        $(bgAnchor).backstretch('show', id);
      };
      
    };

    // backstretch
    function backstretchBg() {
      if (backgroundType == 'image' || backgroundType == 'video') {
        if(fullPageExist == true) {
          $(bgAnchor).backstretch(
              img1
            );
        }
        else {
          $(bgAnchor).backstretch([
            img1,
            img4
          ], {duration: 4000, fade: 1500});
        };
      }
      else if (backgroundType == 'gallery') {
        if(fullPageExist == true) {
          $(bgAnchor).backstretch([
            img1,
            img2,
            img3
          ], {duration: 4000, fade: 1500});
        }
        else {
          $(bgAnchor).backstretch([
            img1,
            img2,
            img3,
            img4
          ], {duration: 4000, fade: 1500});
        };
      };
      if (backgroundType != 'color') {
        $(bgAnchor).backstretch('pause');
      };
    };

    // youtube background
    function youtubeBg() {

      if($('.desktop')[0]) {
        $('header').prepend('<div class=\"yt-player\" data-property=\"{\
          videoURL:\'http:\/\/youtu.be\/' + videoID + '\',\
          containment:\'header\',\
          startAt:' + startTime + ',\
          mute:' + youtubeMuted + ',\
          autoPlay:true,\
          loop:true,\
          opacity:1,\
          showControls:false,\
          showYTLogo:false,\
          vol:' + youtubeVolume + '\
        }\"><\/div>');
        if(youtubeControls == true) {
          $('.yt-controls').prepend('<a id=\"yt-volume\" class=\"fa fa-volume-up\" href=\"#\"></a><\!\-\-\
          \-\-><a id=\"yt-play\" class=\"fa fa-pause\" href=\"#\"></a>');
        };

        // youtube initialization
        $('.yt-player').mb_YTPlayer();

        // yt controls
        $('#yt-play').on('click',function(event){
          event.preventDefault();
          if ($(this).hasClass("fa-play") ) {
            $('.yt-player').playYTP();
          } else {
            $('.yt-player').pauseYTP(); 
          }
          $(this).toggleClass("fa-play fa-pause");
          return false;
        });

        $('#yt-volume').on('click',function(event){
          event.preventDefault();
          $('.yt-player').toggleVolume();
          $(this).toggleClass('fa-volume-off fa-volume-up');
          return false;
        });

       };
    };

    // google maps
    function googleMaps() {
    
      if(displayMap == false || displayMap != true) {
        if (backgroundType != 'color') {
          if(fullPageExist == false) $(bgAnchor).backstretch(img4);
          else $('.lj-map').backstretch(img4);
        };
        
      }
      else initialize(lat, lng, marker, seaColor, landColor, borderColor, zoom, border);
    };

    function initialize(lat, lng, marker, seaColor, landColor, borderColor, zoom, border) {

      var latLng = new google.maps.LatLng(48.858565, 2.347198);
      var borderVisibility = 'on';

      if(borderColor == false) borderVisibility = 'off';
      
        var myOptions = {
        panControl: false,
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        overviewMapControl: false,
        draggable: false,
        disableDoubleClickZoom: true,
        scrollwheel: false,
            zoom: 5,
            center: latLng,
            styles: mapStyles
      };
        
      map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
            
      if(marker != false) {

        var circle = {
                path: google.maps.SymbolPath.CIRCLE,
                fillColor: marker,
          fillOpacity: 1.0,
          scale: 6,
                strokeColor: marker,
          strokeOpacity: 1.0,
                strokeWeight: 1
            };
        var lat = 48.8516465;
        var lng =  2.4210167;
        var markerlatlng = new google.maps.LatLng(lat, lng);
        
        var marker = new google.maps.Marker({
            position: markerlatlng,
            icon: circle,
            title: 'lj-marker'
            
        });
    
        marker.setMap(map);
      }

    }

    // Tweetie
    function tweet() {
      $('.lj-twitter-feed').twittie({
        username: twitUser,
        count: 5,
        template: '<div><i class="fa fa-twitter"></i><p>{{tweet}}</p><span>{{user_name}}</span></div>',
        apiPath: 'twitter/api/tweet.php',
      }, function () {
        var ticker = $('.lj-twitter-feed ul');
        ticker.children('li:first').show().siblings().hide();        
        setInterval(function() {
          ticker.find('li:visible').addClass(aniOut).one(onAnimationEnd, function() {
            $(this).css('display','none').removeClass(aniOut).appendTo(ticker);
            ticker.children('li:first').css('display', 'block').addClass(aniIn).one(onAnimationEnd, function(){
              $(this).removeClass(aniIn);
            });
          });
        }, displayDuration);
      });
    };

    $.ajaxChimp.translations.lj = {
      'submit': 'Submitting...',
      0: '<i class="fa fa-check"></i> ' + msg1,
      1: '<i class="fa fa-warning"></i> ' + msg2,
      2: '<i class="fa fa-warning"></i> ' + msg3,
      3: '<i class="fa fa-warning"></i> ' + msg3,
      4: '<i class="fa fa-warning"></i> ' + msg3,
      5: '<i class="fa fa-warning"></i> ' + msg3
    };

  $(document).ready(function (){
    'use strict';
    
    // functions for desktops and tablets only
    if (fullPageExist == true) {

      // fullpage initialization
      fullPageInit();

      // back button in footer
      var backLink = $('.lj-map-back a');
      var backIcon = $('.lj-map-back i');
      var backAnimation = 'animated infinite fadeOutLeft';

      backLink.on('click', function(e){
        e.preventDefault();
        $.fn.fullpage.moveSectionUp();
      });
      backLink.on('mouseover', function(){
        backIcon.addClass(backAnimation);
      });
      backLink.on('mouseleave', function(){
        backIcon.removeClass(backAnimation);
      });
    } 
    else {
      //remove footer and map top bar in mobiles
      $('.footer, .lj-map-top-bar').remove();
      $('.lj-mobile-footer').prepend('<span>' + copyText + '</span>');
    };

    // google maps
    googleMaps(googleMaps, lat, lng, marker, seaColor, landColor, borderColor, zoom, border);

    // services link animation only on desktops
    if (!$('.mobile, .tablet')[0]) {
     
      // link button in services
      var servicesBox = $('.lj-icon-box');
      var servicesLink = $('.lj-icon-box a');
      var boxAnimation = 'animated fadeInLeft';
      
      servicesBox.on('mouseover', function(){
        servicesLink.addClass(boxAnimation);
      });
      servicesBox.on('mouseleave', function(){
        servicesLink.removeClass(boxAnimation);
      });

    };

    // YouTube player
    if (backgroundType == 'video') {
      youtubeBg();
    };

    // quote initialization
    if(quote == true) {
      lumberQuote();
    };

    // Countdown
    if(countdown == true) {
      counterup();
    };

    // twitter initialization
    if(twitter == true) {
      tweet();
    };

    // Scroll to menu link on mobiles 
    $(".mobile .lj-menu-short a").click(function(e) { 
      e.preventDefault();
      var target = $(this).data('link');
      var $target = $('#' + target);

      $('html, body').stop().animate({
          'scrollTop': $target.offset().top
      }, 1500, 'easeInOutQuint', function () {
        target = target.split('-');
        target = target[0];
        if(target == 'contact') {
          window.location.hash = '#' + target;
        }
        else window.location.hash = '#home/' + target;
      });         
    });

    // Placeholder
    $('input, textarea').placeholder();


    if(mailChimp == true){
      // Ajax mailchimp
      $('#subscribe').ajaxChimp({
        language: 'lj',
        url: mailchimpURL
      }); 
    }
    else {
      // Subscription form notifications and AJAX function
      $("#subscribe").on('submit', function (event) {
        var input = $('.lj-subscribe-message');
          if(!input.is(':empty')) {
            $('.lj-subscribe-message').stop(true);
          };
          event.preventDefault();
          event.stopImmediatePropagation();

          var email = $("input#subscribe-email").val();

          if (email == "") {

            $(".lj-subscribe-message").stop(true).html('<i class="fa fa-warning"></i> ' + msg2);
            $("input#subscribe-email").focus();
          } 
          else if (!isValidEmailAddress( email )) {
            $(".lj-subscribe-message").stop(true).html('<i class="fa fa-warning"></i> ' + msg3);
            $("input#subscribe-email").focus();
          }
          else {
            $.ajax({
              type: "POST",
              url: "./php/send-subscription.php",
              data: {subscription:email, my_email:subscriptionEmail},
              success: function () {
                $(".lj-subscribe-message").html('<i class="fa fa-check"></i> ' + msg1);
                $('input#subscribe-email').val('');
              }
            });
          };
      });
    };
    
    // Contact form functions
    $("#contactform").on('submit', function (event) {
      var input = $('.lj-contact-message');
        if(!input.is(':empty')) {
          $('.lj-contact-message').stop(true);
        }
        event.preventDefault();
        event.stopImmediatePropagation();

        var name = $("input#contact-name").val();
        var email = $("input#contact-email").val();
        var message = $("textarea#contact-message").val();

        if (name == "" || email == "" || message == "") {

          $(".lj-contact-message").stop(true).html('<i class="fa fa-warning"></i> ' + msg4);
          
        }
        else if (!isValidEmailAddress( email )) {
          $(".lj-contact-message").stop(true).html('<i class="fa fa-warning"></i> ' + msg3);
          $("input#contact-email").focus();
        }
        else {
          $.ajax({
            type: "POST",
            url: "./php/send-contact.php",
            data: {contact_email:email,
                   contact_name:name,
                   contact_message:message,
                   contact_my_email:contactEmail
                 },
            success: function () {
              $(".lj-contact-message").html('<i class="fa fa-check"></i> ' + msg1);
              $('input#contact-name').val('');
              $('input#contact-email').val('');
              $('textarea#contact-message').val('');
            }
          });
        }
    });

    // backstretch
    backstretchBg();
    
    // including settings
    var style = '<style>\
    .lj-subscribe-form input[type=submit]:hover,\
    .lj-contact-form input[type=submit]:hover {\
      color: ' + layoutColor + ';\
    }\
    body,\
    .lj-overlay-color,\
    .lj-preloader {\
      background-color: ' + layoutColor + ';\
    }\
    body {\
      color: ' + textColor + ';\
    }\
    .lj-subscribe-form input[type=submit]:hover,\
    .lj-contact-form input[type=submit]:hover,\
    .lj-quote span:before,\
    .lj-twitter-feed li a:hover:after,\
    .lj-twitter-feed li a.activePage:after,\
    .lj-twitter-feed span:before,\
    .lj-address p > a:hover:after,\
    .lj-address p > a.activePage:after,\
    .lj-menu-long li a:hover:after,\
    .lj-menu-long li a.activePage:after {\
      background-color: ' + textColor + ';\
    }\
    .lj-subscribe-form input[type=text],\
    .lj-subscribe-form input[type=submit],\
    .lj-contact-form input[type=text]#contact-name,\
    .lj-contact-form input[type=text]#contact-email,\
    .lj-contact-form textarea,\
    .lj-contact-form input[type=submit] {\
      border-color: ' + textColor + ';\
    }\
    .lj-footer-copyrights span {\
      color: ' + copyrightsColor + ';\
    }\
    .yt-controls a:hover,\
    .lj-footer-socials li a:hover {\
      color: ' + footerColor + ';\
    }\
    .footer,\
    .lj-map-top-bar {\
      background-color: ' + footerColor + ';\
    }\
    .yt-controls a,\
    .lj-footer-socials li,\
    .lj-footer-socials li:first-child {\
      border-color: ' + linksColor + ';\
    }\
    .yt-controls a,\
    .lj-footer-socials li a,\
    .lj-map-back a,\
    .lj-map-menu a {\
      color: ' + linksColor + ';\
    }\
    .yt-controls a:hover,\
    .lj-footer-socials li a:hover,\
    .lj-map-menu li a:hover:after,\
    .lj-map-menu li a.activePage:after {\
      background-color: ' + linksColor + ';\
    }\
    .lj-overlay-image {\
      background-image: url("img/overlays/' + overlayImage + '.png");\
    }\
    .lj-overlay-gradient {\
      background: -moz-linear-gradient(' + gradientData[0] + 'deg, ' + hex2rgb(gradientData[1], gradientData[2]) +' 0%,' + hex2rgb(gradientData[3], gradientData[4]) +' 100%);\
      background: -webkit-linear-gradient(' + gradientData[0] + 'deg, ' + hex2rgb(gradientData[1], gradientData[2]) +' 0%,' + hex2rgb(gradientData[3], gradientData[4]) +' 100%);\
      background: -o-linear-gradient(' + gradientData[0] + 'deg, ' + hex2rgb(gradientData[1], gradientData[2]) +' 0%,' + hex2rgb(gradientData[3], gradientData[4]) +' 100%);\
      background: -ms-linear-gradient(' + gradientData[0] + 'deg, ' + hex2rgb(gradientData[1], gradientData[2]) +' 0%,' + hex2rgb(gradientData[3], gradientData[4]) +' 100%);\
      background: linear-gradient(' + gradientData[0] + 'deg, ' + hex2rgb(gradientData[1], gradientData[2]) +' 0%,' + hex2rgb(gradientData[3], gradientData[4]) +' 100%);\
      filter: progid:DXImageTransform.Microsoft.gradient( startColorstr="' + gradientData[1] + '", endColorstr="' + gradientData[3] + '",GradientType=1 ) progid:DXImageTransform.Microsoft.AlphaImageLoader(src="img/1x1.png");\
      pointer-events:none;\
    }\
    </style>';
    
    if(styleOptions == true) {
      $('head').append(style);
    };

    $('.lj-opacity').css('opacity', opacity);

  });

  $(window).on('hashchange', function(){
    $('.activePage').removeClass('activePage');
    $('.lj-menu a[href$="' + window.location.hash + '"]').addClass('activePage');

    //mobile exclusive view
    if(fullPageExist == false) {

      //animate title
      animateTitle(window.location.hash);

      //change only on contact for image and video background
      if(backgroundType == 'video' || backgroundType == 'image') {

        var actualHash = window.location.hash.split('/');
        actualHash = actualHash[0];

        if(actualHash != hashChange){
          bgChange(window.location.hash);
          hashChange = actualHash;
        };
      }
      else bgChange(window.location.hash);
    };
  });

  $(window).on('scroll', function(e) {

    //change url while scrolling on mobiles
    $('.mobile .anchor').each( function() {
        if (
          $(this).offset().top < window.pageYOffset + 300
        
          && $(this).offset().top + $(this).height() > window.pageYOffset + 0
        ) {
          var anchor = $(this).attr('id').split('-');
          anchor = anchor[0];

          if(anchor == 'contact' || anchor == 'home') window.location.hash = '#' + anchor;
          else window.location.hash = '#home/' + anchor;
        }
    });
});

  $(window).load(function() {

    // Preloader
    // Change delay and fadeOut speed (in miliseconds)
    $(".lj-preloader").delay(100).fadeOut(500);

    if(fullPageExist == false) {
      animateTitle(window.location.hash);
    }
    else {
      // WOW js
      new WOW().init();
    };
  });

})(jQuery);