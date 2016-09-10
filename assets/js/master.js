//Set up 3 test accounts on M2X
const userIds = [{
    user: 'Mark',
    id: '46230de63122e9df67a7d3df0a0e0e92'
}, {
    user: 'Shuyu',
    id: 'dd29ae7ca234ff3ed30efe21853e8ebf'
}, {
    user: 'Waqid',
    id: '7e4f635b06d3c8e77bfad7d50bec96d4'
}];


function updateLocation(lat, lng) {
    initMap(lat, lng);
}

$('#start').click(function() {
    setTimeout(function() {
        simulate();
    }, 2000);

    setInterval(function() {
        $('#eta').html('');
        for (let i = 0; i < userIds.length; i++) {
            getOtherLocation(userIds[i].user, userIds[i].id);
        }
    }, 5000);
})

let map = null;
const markers = [];
const destLat = 40.751332;
const destLng = -74.006414;

function initMap(lat, lng) {

    const myLatLng = {
        lat: destLat,
        lng: destLng
    };

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: myLatLng
    });
    map.panTo(myLatLng);
    const marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        icon: 'assets/icons/dest.png'
    });
}

function addMarker(user, lat, lng) {
    const myLatLng = {
        lat: lat,
        lng: lng
    };
    const marker = new google.maps.Marker({
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
    const url = 'http://api-m2x.att.com/v2/devices/' + id + '/location';
    $.ajax({
        url: url
    }).done(function(response) {
        console.log(response);
        const eta = getETA(response.waypoints[0].latitude, response.waypoints[0].longitude, destLat, destLng, calculateRate(response));
        console.log(eta);

        $('#eta').append('<h5>' + user + '<small> will arrive in ' + eta + ' </small></h5>');
        addMarker(user, response.latitude, response.longitude);
    });
}


////ETA CODE


function millisecondsToStr(milliseconds) {
    let str = '';

    function numberEnding(number) {
        return (number > 1) ? 's' : '';
    }

    let temp = Math.floor(milliseconds / 1000);
    const years = Math.floor(temp / 31536000);
    if (years) {
        str += years + ' year' + numberEnding(years) + ' ';
    }
    //TODO: Months! Maybe weeks?
    const days = Math.floor((temp %= 31536000) / 86400);
    if (days) {
        str += days + ' day' + numberEnding(days) + ' ';
    }
    const hours = Math.floor((temp %= 86400) / 3600);
    if (hours) {
        str += hours + ' hour' + numberEnding(hours) + ' ';
    }
    const minutes = Math.floor((temp %= 3600) / 60);
    if (minutes) {
        str += minutes + ' minute' + numberEnding(minutes) + ' ';
    }
    const seconds = temp % 60;
    if (seconds) {
        str += seconds + ' second' + numberEnding(seconds) + ' ';
    }
    if (str == '')
        return 'Less than a second';
    return str;
}

function getETA(currentLat, currentLong, destLat, destLong, rate) {
    const distanceToDestination = getDistance(currentLat, currentLong, destLat, destLong);
    const time = distanceToDestination / rate;
    const result = (millisecondsToStr(time));
    return result;

}

function getTimeDiff(date1, date2) {
    const diff = date1 - date2;
    return diff;
}

function parseDate(dateString) {
    const year = dateString.substring(0, 4);
    const month = dateString.substring(5, 7);
    const day = dateString.substring(8, 10);
    const hour = dateString.substring(11, 13)
    const minute = dateString.substring(14, 16)
    const second = dateString.substring(17, 19)
    const newDate = new Date(year, month, day, hour, minute, second, 0);
    return newDate;
}

//Rate in meters / millisec
function calculateRate(data) {
    const length = data.waypoints.length;
    if (length < 4)
        return 1609.34 / 1200000;
    const distance = getDistance(data.waypoints[0].latitude, data.waypoints[0].longitude, data.waypoints[3].latitude, data.waypoints[3].longitude);
    const timeDiff = getTimeDiff(parseDate(data.waypoints[0].timestamp), parseDate(data.waypoints[3].timestamp));
    return (distance / timeDiff);
}

function getDistance(lat0, long0, lat3, long3) {
    const distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(lat0, long0), new google.maps.LatLng(lat3, long3));
    return distance;
}



//////SIMULATION DATA

const mark = {
    name: 'Mark',
    id: '46230de63122e9df67a7d3df0a0e0e92',
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

const shuyu = {
    name: 'Shuyu',
    id: 'dd29ae7ca234ff3ed30efe21853e8ebf',
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

const waqid = {
    name: 'Waqid',
    id: '7e4f635b06d3c8e77bfad7d50bec96d4',
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


function simulate() {
    sendLocation(mark.data[0].lat, mark.data[0].lng, mark.id);
    sendLocation(shuyu.data[0].lat, shuyu.data[0].lng, shuyu.id);
    sendLocation(waqid.data[0].lat, waqid.data[0].lng, waqid.id);
    let i = 1;
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
    console.info(id);
    const jsonData = {
        latitude: lat,
        longitude: lng
    };
    const str = JSON.stringify(jsonData);
    const url = 'http://api-m2x.att.com/v2/devices/' + id + '/location';
    $.ajax({
        beforeSend: function(xhr) {
            xhr.setRequestHeader('X-M2X-KEY', '<replace-with-key>');
        },
        type: 'PUT',
        url: url,
        data: str,
        contentType: 'application/json',

    }).done(function(response) {
        console.log(response);
    });
}
