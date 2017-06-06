

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
     


/*
var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 55.001, lng: 11.981},
    zoom: 8
  });
  var marker = new google.maps.Marker({
      position: new google.maps.LatLng(55.001383, 11.981929),
      map: map,
      title: "This is a marker!",
      animation: google.maps.Animation.DROP
  });
}
*/
var map, infoWindow;
      function initMap() {
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
        infoWindow = new google.maps.InfoWindow;

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            var iconBase = 'img/';
            var icons = {
              ejbybolig: {
                icon: iconBase + 'boligmarker.png'
              },
              library: {
                icon: iconBase + 'hermarker.png'
              }

            };
            var features = [
              {
                position: new google.maps.LatLng(pos),
                type: 'library'
              }, {
                position: new google.maps.LatLng(55.006765, 11.958317),
                type: 'ejbybolig'
              }, {
                position: new google.maps.LatLng(55.002286, 11.981101),
                type: 'ejbybolig'
              }, {
                position: new google.maps.LatLng(55.001000, 11.961219),
                type: 'ejbybolig'
              }, {
                position: new google.maps.LatLng(55.001951, 11.956188),
                type: 'ejbybolig'
              }, {
                position: new google.maps.LatLng(55.006123, 11.969393),
                type: 'ejbybolig'
              }, {
                position: new google.maps.LatLng(54.759255, 11.876671),
                type: 'ejbybolig'
              }, {
                position: new google.maps.LatLng(54.768241, 11.869110),
                type: 'ejbybolig'
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
