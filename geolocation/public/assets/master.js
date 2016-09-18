//keep a reference of interval timer for debugging purpose
let timer = null;


//web socket to listen to location event
const socket = io();
//TODO: move to sessions
let sessionId = getURLParam('id', location.href);
if (sessionId) {
    joinSession();
}
//default map
let map = null;

//initialize the map with destination marker
function initMap() {
    const destination = {
        lat: 40.751332,
        lng: -74.006414
    };
    map = new google.maps.Map(document.getElementById('map'), {
        center: destination,
        zoom: 12
    });
    const marker = new google.maps.Marker({
        position: destination,
        map: map,
        icon: '/assets/dest.png'
    });
}

function joinSession() {
    console.info('joining session.. ', sessionId);
    socket.on(`session_${sessionId}`, function(data) {
        const marker = new google.maps.Marker({
            position: data.pos,
            map: map,
            icon: '/assets/dot.png',
            // label: {
            //     text: data.name,
            //     color: 'white'
            // }
        });
        map.setCenter(data.pos);
    });
    // A $( document ).ready() block.
    $(document).ready(function() {
        $('#share-link').html(`<h5><small>Share this link with your friends: </small>${location.href}</h5>`);
    });

    timer = setInterval(function() {
        updateUserLocation();
    }, 5000);


}






function updateUserLocation() {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var location = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            console.info('Emiting ', `session_${sessionId}`);
            socket.emit(`session`, {
                // name: '',
                pos: location,
                sessionId: sessionId
            });
        }, function() {
            console.error('The Geolocation service failed.');
        });
    } else {
        // Browser doesn't support Geolocation
        console.error('Your browser doesn\'t support geolocation.');
    }
}



function getURLParam(name, url) {
    if (!url) url = location.href;
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(url);
    return results == null ? null : results[1];
}
