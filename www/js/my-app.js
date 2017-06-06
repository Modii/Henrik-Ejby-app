

var myApp = new Framework7();

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});

  $$('.login-screen .list-button').on('click', function () {
    myApp.closeModal('.login-screen');
});


$$('.panel-close').on('click', function () {
    var animated = false;
    myApp.closePanel(animated);
});


google.maps.event.addDomListener(window,'load',initMap);

var map, infoWindow;
      function initMap() {

        /* datasæt til markers herunder */
        var locations = [
           ['<div class="test">ejbybolig1</div>',55.006765, 11.958317, 1],
           ['<div class="test">ejbybolig2</div>',55.002286, 11.981101, 1],
           ['<div class="test">ejbybolig3</div>',55.001000, 11.961219, 1],
           ['<div class="test">ejbybolig4</div>',55.001951, 11.956188, 1],
           ['<div class="merebolig">' +
           '<img class="merebolig-img" src="img/boliger/naverparken13.png">' +
           '<p class="merebolig-tekst"> Naverparken 13, Nyråd <br>'+
           '4760 Vordingborg <br>'+
           'Kontantpris: 1.295.000 <br>'+
           'Ejer udgifter pr. md.: 2355,72 <br>'+
           'Boligareal: 142 <br></p>' +
           '<a href="#" class="laesmereknap">LÆS MERE</a></div>',55.006123, 11.969393, 1],

           ['<div class="merebolig">' +
           '<img class="merebolig-img" src="img/boliger/gedservej8.jpg">' +
           '<p class="merebolig-tekst"> Gedservej 8, Nykøbing F <br>'+
           '4800 Nykøbing F <br>'+
           'Kontantpris: 750.000 <br>'+
           'Ejer udgifter pr. md.: 1322,14 <br>'+
           'Boligareal: 71 <br></p>' +
           '<a href="#" class="laesmereknap">LÆS MERE</a></div>',54.759255, 11.876671, 1],

           ['<div class="merebolig">' +
           '<img class="merebolig-img" src="img/boliger/kongensgade6.jpg">' +
           '<p class="merebolig-tekst"> Kongensgade 6, Nykøbing F <br>'+
           '4800 Nykøbing F <br>'+
           'Kontantpris: 3.995.000 <br>'+
           'Ejer udgifter pr. md.: 2670,41 <br>'+
           'Boligareal: 298 <br></p>' +
           '<a href="#" class="laesmereknap">LÆS MERE</a></div>',54.768241, 11.869110, 1],
        ];

        /* her oprettes vores kort */
        map = new google.maps.Map(document.getElementById('map'), {
          disableDefaultUI: true,
          zoom: 12,
          draggable: true,
          mapTypeControlOptions: {
          mapTypeIds: ['hybrid']
      }
        });
        map.mapTypes.set('hybrid');
        map.setMapTypeId('hybrid');
        var infoWindow = new google.maps.InfoWindow;


        /* infobubble er vores læs mere vinduer på kortet, herunder customizes de */
        infoBubble = new InfoBubble({
          map: map,
          maxWidth: 250,
          maxHeight: 260,
          shadowStyle: 0,
          padding: 5,
          backgroundColor: '#fff',
          borderRadius: 0,
          arrowSize: 12,
          borderWidth: 1,
          borderColor: '#fff',
          disableAutoPan: true,
          hideCloseButton: false,
          closeSrc: 'img/infobubbleclosebutton.png',
          arrowPosition: 30,
          backgroundClassName: 'boligmarkerbackground',
          arrowStyle: 0
        });

        var marker, i;

        /* Dette for loop opretter bolig markers */
        for (i = 0; i < locations.length; i++) {
          marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            map: map,
            icon: 'img/boligmarker.png',
            animation:google.maps.Animation.DROP
          });

          /* følgende loop gør så infovinduet lukkes ved klik på map */
          google.maps.event.addListener(marker, 'click', function() {
                     if(!marker.open){
                         infoBubble.open(map,marker);
                         marker.open = true;
                     }
                     else{
                         infoBubble.close();
                         marker.open = false;
                     }
                     google.maps.event.addListener(map, 'click', function() {
                         infoBubble.close();
                         marker.open = false;
                     });
         });
          /* denne funktion venter på klik og åbner et info vindue til boligerne */
          google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
              infoBubble.close();
              infoBubble.setContent(locations[i][0]);
              map.setCenter(marker.getPosition());
              infoBubble.open(map, marker);
              /* centrerer læs mere boksen ved at rykke kortet 50px til venstre og 170px op */
              map.panBy(50, -170);
            }
          })(marker, i));
        }

        // geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            var iconBase = 'img/';
            var icons = {
              hermarker: {
                icon: iconBase + 'hermarker.png'
              }
            };
            var features = [
              {
                position: new google.maps.LatLng(pos),
                type: 'hermarker'
              }
            ];
                  // Create markers.
                  features.forEach(function(feature) {
                    var marker = new google.maps.Marker({
                      position: feature.position,
                      icon: icons[feature.type].icon,
                      map: map,
                      animation:google.maps.Animation.DROP
                    });
                  });
            map.setCenter(pos);

          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }



      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your phone doesn\'t support geolocation.');
        infoWindow.open(map);
      }

}

// Callbacks to run specific code for specific pages, for example for About page:
myApp.onPageInit('about', function (page) {
    // run createContentPage func after link was clicked
    $$('.create-page').on('click', function () {
        createContentPage();
    });
});
myApp.onPageBeforeInit('index', function(myApp){
  var mapOptions = {
    disableDefaultUI: true,
    zoom: 12,
    draggable: true
}
  //map = new google.maps.Map(document.getElementById('map'), mapOptions);
  initMap();
  google.maps.event.trigger(map, "resize");
});


// Generate dynamic page
var dynamicPageIndex = 0;
function createContentPage() {
	mainView.router.loadContent(
        '<!-- Top Navbar-->' +
        '<div class="navbar">' +
        '  <div class="navbar-inner">' +
        '    <div class="left"><a href="#" class="back link"><i class="icon icon-back"></i><span>Back</span></a></div>' +
        '    <div class="center sliding">Dynamic Page ' + (++dynamicPageIndex) + '</div>' +
        '  </div>' +
        '</div>' +
        '<div class="pages">' +
        '  <!-- Page, data-page contains page name-->' +
        '  <div data-page="dynamic-pages" class="page">' +
        '    <!-- Scrollable page content-->' +
        '    <div class="page-content">' +
        '      <div class="content-block">' +
        '        <div class="content-block-inner">' +
        '          <p>Here is a dynamic page created on ' + new Date() + ' !</p>' +
        '          <p>Go <a href="#" class="back">back</a> or go to <a href="services.html">Services</a>.</p>' +
        '        </div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>'
    );
	return;
}

/* JQuery below */
