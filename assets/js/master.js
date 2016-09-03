
var user_ids = [{
    "user": "Mark",
    "id": "46230de63122e9df67a7d3df0a0e0e92"
}, {
    "user": "Shuyu",
    "id": "dd29ae7ca234ff3ed30efe21853e8ebf"
}, {
    "user": "Waqid",
    "id": "7e4f635b06d3c8e77bfad7d50bec96d4"
}]

var x = document.getElementById("demo");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude;
    updateLocation(position.coords.latitude, position.coords.longitude);
}


function updateLocation(lat, lng) {

    initMap(lat, lng);

}

$('#start').click(function() {
    setTimeout(function() {
        simulate();
    }, 2000);

    setInterval(function() {
        $('#eta').html("");
        for (var i = 0; i < user_ids.length; i++) {
            getOtherLocation(user_ids[i].user, user_ids[i].id);
        }

    }, 5000);
})

var map;
var markers = [];
var dest_lat = 40.751332;
var dest_lng = -74.006414;

function initMap(lat, lng) {

    var myLatLng = {
        lat: dest_lat,
        lng: dest_lng
    };

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: myLatLng
    });
    map.panTo(myLatLng);
    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        icon: 'assets/icons/dest.png'
    });
}

function addMarker(user, lat, lng) {
    var myLatLng = {
        lat: lat,
        lng: lng
    };
    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        icon: 'assets/icons/circle.png',
        label: {
            text: user,
            color: 'white'
        }
    });


}


function getOtherLocation(user, id) {
    var url = "http://api-m2x.att.com/v2/devices/" + id + "/location";
    $.ajax({
        url: url

    }).done(function(response) {
        console.log(response);
        var eta = getETA(response.waypoints[0].latitude, response.waypoints[0].longitude, dest_lat, dest_lng, calculateRate(response));
        console.log(eta);

        $('#eta').append("<h5>"+ user + "<small> will arrive in " + eta + " </small></h5>");
        addMarker(user, response.latitude, response.longitude);


    });
}


////ETA CODE


function millisecondsToStr(milliseconds) {
    var str = "";

    function numberEnding(number) {
        return (number > 1) ? 's' : '';
    }

    var temp = Math.floor(milliseconds / 1000);
    var years = Math.floor(temp / 31536000);
    if (years) {
        str += years + ' year' + numberEnding(years) + " ";
    }
    //TODO: Months! Maybe weeks? 
    var days = Math.floor((temp %= 31536000) / 86400);
    if (days) {
        str += days + ' day' + numberEnding(days) + " ";
    }
    var hours = Math.floor((temp %= 86400) / 3600);
    if (hours) {
        str += hours + ' hour' + numberEnding(hours) + " ";
    }
    var minutes = Math.floor((temp %= 3600) / 60);
    if (minutes) {
        str += minutes + ' minute' + numberEnding(minutes) + " ";
    }
    var seconds = temp % 60;
    if (seconds) {
        str += seconds + ' second' + numberEnding(seconds) + " ";
    }
    if (str == "")
        return "Less than a second";
    return str;
}

function getETA(currentLat, currentLong, destLat, destLong, rate) {
    var distanceToDestination = getDistance(currentLat, currentLong, destLat, destLong);
    var time = distanceToDestination / rate;

    var result = (millisecondsToStr(time));
    return result;

}

function getTimeDiff(date1, date2) {
    var diff = date1 - date2;
    return diff;
}

function parseDate(dateString) {
    var year = dateString.substring(0, 4);
    var month = dateString.substring(5, 7);
    var day = dateString.substring(8, 10);
    var hour = dateString.substring(11, 13)
    var minute = dateString.substring(14, 16)
    var second = dateString.substring(17, 19)
    var newDate = new Date(year, month, day, hour, minute, second, 0);
    return newDate;
}

//Rate in meters / millisec
function calculateRate(data) {
    var length = data.waypoints.length;
    if (length < 4)
        return 1609.34 / 1200000;
    var distance = getDistance(data.waypoints[0].latitude, data.waypoints[0].longitude, data.waypoints[3].latitude, data.waypoints[3].longitude);
    var timeDiff = getTimeDiff(parseDate(data.waypoints[0].timestamp), parseDate(data.waypoints[3].timestamp));
    return (distance / timeDiff);
}

function getDistance(lat0, long0, lat3, long3) {
    var distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(lat0, long0), new google.maps.LatLng(lat3, long3));
    return distance;
}



//////SIMULATION DATA

var mark = {
    name: 'Mark',
    id: '46230de63122e9df67a7d3df0a0e0e92',
    data: [{
        "lat": 40.804528,
        "lng": -73.957717
    }, {
        "lat": 40.801410,
        "lng": -73.960206
    }, {
        "lat": 40.798551,
        "lng": -73.963339
    }, {
        "lat": 40.795725,
        "lng": -73.966215
    }, {
        "lat": 40.794458,
        "lng": -73.971279
    }]
};

var shuyu = {
    name: 'Shuyu',
    id: 'dd29ae7ca234ff3ed30efe21853e8ebf',
    data: [{
        "lat": 40.708536,
        "lng": -73.961019
    }, {
        "lat": 40.712584,
        "lng": -73.968404
    }, {
        "lat": 40.717392,
        "lng": -73.984053
    }, {
        "lat": 40.719303,
        "lng": -73.990116
    }, {
        "lat": 40.723011,
        "lng": -73.992948
    }]
};

var waqid = {
    name: 'Waqid',
    id: '7e4f635b06d3c8e77bfad7d50bec96d4',
    data: [{
        "lat": 40.705688,
        "lng": -74.070226
    }, {
        "lat": 40.724504,
        "lng": -74.060504
    }, {
        "lat": 40.733283,
        "lng": -74.049715
    }, {
        "lat": 40.728688,
        "lng": -74.031923
    }, {
        "lat": 40.728385,
        "lng": -74.007166
    }]
};


function simulate() {
    sendLocation(mark.data[0].lat, mark.data[0].lng, mark.id);
    sendLocation(shuyu.data[0].lat, shuyu.data[0].lng, shuyu.id);
    sendLocation(waqid.data[0].lat, waqid.data[0].lng, waqid.id);
    var i = 1;
    setInterval(function() {
        if (i < 5) {
            sendLocation(mark.data[i].lat, mark.data[i].lng, mark.id);
            sendLocation(shuyu.data[i].lat, shuyu.data[i].lng, shuyu.id);
            sendLocation(waqid.data[i].lat, waqid.data[i].lng, waqid.id);
            i++;
        }

    }, 5000);
}





function sendLocation(lat, lng, id) {

    console.log(id);
    var jsonData = {
        "latitude": lat,
        "longitude": lng
    };
    var str = JSON.stringify(jsonData);
    var url = "http://api-m2x.att.com/v2/devices/" + id + "/location";
    $.ajax({
        beforeSend: function(xhr) {
            xhr.setRequestHeader("X-M2X-KEY", "{enter-at&t-m2x-key}");
        },
        type: "PUT",
        url: url,
        data: str,
        contentType: "application/json",

    }).done(function(response) {
        console.log(response);
    });


}
