/* ###### SETTINGS ###### */
/* TABLE OF CONTENTS

  1. color settings
    a. layout colors
    b. footer colors
    c. overlay opacity
  2. Background
    a. background type
    b. single image background
    c. gallery backgrounds
    d. contact backgrounds
    e. video background
  3. Overlay
    a. overlay type
  4. Animations
    a. subtitle animation
    b. quote rotator / twitter animations
  5. Homepage widget
    a. widget type
    b. twitter settings
    c. quotes & twitter animation duration
    d. countdown settings
  6. Subscription & contact forms
    a. subscription type
    b. subscription settings
    c. contact form settings
    d. mailChimp URL
    e. submit verification messages
  7. Google maps
    a. display control
    b. coordinates
    c. map colors
    d. marker
    e. borders
    f. zoom
    g. styles
*/

/* If you prefer to manually edit style.css file
 * in order to change template visuals, please set
 * following variable to 'false' (it will only disable
 * overwriting style.css values):
 */
var styleOptions = true; //true - settings from this file have priority, false - settings from style.css have priority



//  1. Color settings
//   a. layout colors
var layoutColor = '#2c3e50'; //overlay color
var textColor = '#fff'; //text paragraphs color, menu color, form borders color

//   b. footer colors
var footerColor = '#fff'; //color of footer background
var linksColor = '#2c3e50'; //social links color, youtube controls color, contact top menu color
var copyrightsColor = '#2c3e50'; //copyrights color



//  2. Background
//    a. background type
var backgroundType = 'gallery'; //image - single image, gallery - image for each slide, video - youtube video background, color - for no background, just color (including contact page)

//    b. single image background
var single_img = 'single.jpg'; //Single image for Home/About Us/Services

//    c. gallery backgrounds
var gallery_img1 = 'bg-1.jpg'; //Home
var gallery_img2 = 'bg-2.jpg'; //About Us
var gallery_img3 = 'bg-3.jpg'; //Services

//   d. contact backgrounds
var contact_img = 'map.jpg'; //Contact image without google maps/on mobile

//   e. video background
var videoID = 'PYFjawmvsL4'; //youtube video ID, example: https://youtu.be/Zev0wz87hVw - https://youtu.be/VIDEO-ID
var fallbackImg = 'video.jpg'; //fallback image for tablets and mobiles
var youtubeControls = true; //controls for play/pause and sound control in footer, true - enabled, false - disabled
var youtubeMuted = false; //true - muted, false - plays music/sounds
var youtubeVolume = 25; //volume of sound if unmuted, 0 - lowest, 100 - highest
var startTime = 0; //time of video to start playback from



//  3. Overlay
//   a. overlay type
var overlayType = 'color'; //none, color, image, gradient, colorAndImage
var headerOverlay = true; //display overlay on header part, true - display, false - hide
var mapOverlay = true; //display overlay on contact/map part, true - display, false - hide
//   b. overlay settings
var overlayImage = 'lines'; //file name, example: dots, dots-big, dots-medium, grid, lines, lines-2, lines-horizontal, lines-vertical, noise, strip
var overlayGradient = '180, #262626, 0, #2c3e50, 1'; //gradient format: 'degree, color-1, opacity-1, color-2, opacity-2'
//   b. overlay opacity
var opacity = 0.7; // 0 -transparent, 1 - non-transparent



//  4. Animations
//   a. subtitle animation
var subtitleAnimation = 'fadeInDown'; //animation of subtitle revealing, full list: http://daneden.github.io/animate.css/

//   b. quote rotator / twitter animations
var fadeInAnimation = 'flipInX'; //tweet/quote entering animation, full list: http://daneden.github.io/animate.css/
var fadeOutAnimation = 'flipOutX'; //tweet/quote leaving animation, full list: http://daneden.github.io/animate.css/



//  5. Homepage widget
//   a. widget type
var widget = 'quote'; //possible choices: quote, twitter, text, countdown

//   b. twitter settings
var twitUser = 'twitter_username'; //twitter username (not screen name)

//   c. quotes & twitter animation duration
var displayDuration = 6000; //time in ms between tweet/quote changes

//   d. countdown settings
var endDate = 'June 26, 2015 20:39:00'; //set desired end date, example: 'June 26, 2015 20:39:00'



//  6. Subscription & contact forms
//   a. subscription type
var mailChimp = false; //true - mailchimp, false for ajax form with PHP

//   b. subscription settings
var subscriptionEmail = 'put_your_email_address_here'; //your email address passed to send-subscription.php

//   c. contact form settings
var contactEmail = 'put_your_email_address_here'; //your email address passed to send-contact.php

//   d. mailChimp URL
//Example MailChimp url: http://xxx.xxx.list-manage.com/subscribe/post?u=xxx&id=xxx
var mailchimpURL = 'http://xxx.xxx.list-manage.com/subscribe/post?u=xxx&id=xxx';

//   e. submit verification messages
var msg1 = 'We will be in touch soon!'; //succesfull sending
var msg2 = 'You must enter a valid e-mail address.'; //empty subscription form
var msg3 = 'E-mail address not valid.'; //mistyped email address
var msg4 = 'Fill all fields.'; //empty contact form inputs



//  7. Google maps
//   a. display control
var displayMap = true; //true - display google maps, false - display custom image

//   b. coordinates
//check http://www.gps-coordinates.net/ for coordinates
var lat = 52.05249; //Latitude
var lng = -0.395508; //Longitude
//   c. map colors
var seaColor = '#aaaaaa'; //sea color, example: '#aaaaaa'
var landColor = '#ccccccc'; //land color, example: '#cccccc'

//   d. marker
var marker = '#bd3333'; //marker color, example: '#bd3333', leave false for hidden

//   e. borders
var borderVisibility = 'off'; //'on' - borders enabled, 'off' - disabled
var borderColor = '#aaaaaa'; //borders color, example: '#aaaaaa'
var border = 1; //border width (higher - wider)

//   f. zoom
var zoom = 4; //zoom level of map (higher - closer)

//   g. styles
var mapStyles = [{
        "stylers": [{
            "visibility": "off"
        }]
    },
    {
        "featureType": "water",
        "stylers": [{
            "visibility": "on"
        }, {
            "color": seaColor
        }]
    },
    {
        "featureType": "landscape",
        "stylers": [{
            "visibility": "on"
        }, {
            "color": landColor
        }]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [{
            "visibility": borderVisibility
        }, {
            "color": borderColor
        }, {
            "weight": border
        }]
    }];