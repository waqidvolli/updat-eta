


    //web socket to listen to location event
    const socket = io();
    //TODO: move to sessions
    let sessionId = getURLParam('id', location.href);
    if(sessionId) {
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

    function joinSession(){
        console.info('joining session.. ', sessionId);
        socket.on(`session_${sessionId}`, function(data) {
            const marker = new google.maps.Marker({
                position: data.pos,
                map: map,
                icon: '/assets/circle.png',
                label: {
                    text: data.name,
                    color: 'white'
                }
            });
        });
        // A $( document ).ready() block.
        $( document ).ready(function() {
            $('#share-link').html(`<h5><small>Share this link with your friends: </small>${location.href}</h5>`);
        });

    }



    //simulate person
    function simulatePerson(person) {
        const res = eval(person);
        for (let i = 1; i <= res.data.length; i++) {
            setTimeout(function() {
                updateMap(res.name, res.data[i - 1]);
            }, ((i + 1) * 1000));
        }
    }

    //update map with simulation data
    function updateMap(name, pos) {
        const location = {
            lat: pos.lat,
            lng: pos.lng
        }
        console.info('Emiting ',`session_${sessionId}`);
        socket.emit(`session`, {
            name: name,
            pos: location,
            sessionId : sessionId
        });
    }


    function getURLParam( name, url ) {
          if (!url) url = location.href;
          name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
          var regexS = "[\\?&]"+name+"=([^&#]*)";
          var regex = new RegExp( regexS );
          var results = regex.exec( url );
          return results == null ? null : results[1];
        }





    ////////SIMULATION DATA

    const A = {
        name: 'A',
        data: [{
            lat: 40.804528,
            lng: -73.957717
        }, {
            lat: 40.801410,
            lng: -73.960206
        }, {
            lat: 40.798551,
            lng: -73.963339
        }, {
            lat: 40.795725,
            lng: -73.966215
        }, {
            lat: 40.794458,
            lng: -73.971279
        }]
    };

    const B = {
        name: 'B',
        data: [{
            lat: 40.708536,
            lng: -73.961019
        }, {
            lat: 40.712584,
            lng: -73.968404
        }, {
            lat: 40.717392,
            lng: -73.984053
        }, {
            lat: 40.719303,
            lng: -73.990116
        }, {
            lat: 40.723011,
            lng: -73.992948
        }]
    };

    const C = {
        name: 'C',
        data: [{
            lat: 40.705688,
            lng: -74.070226
        }, {
            lat: 40.724504,
            lng: -74.060504
        }, {
            lat: 40.733283,
            lng: -74.049715
        }, {
            lat: 40.728688,
            lng: -74.031923
        }, {
            lat: 40.728385,
            lng: -74.007166
        }]
    };
