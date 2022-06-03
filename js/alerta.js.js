function getBasePath(service) {
    return "https://chilealerta.com/api/query/?user=demo&select=" + service;
}

function createRowDisaster(reference, magnitude, latitude, longitude, local_time) {
    return '<tr><td>' + reference + '</td><td>' + magnitude + '</td><td>' + latitude + '</td><td>' + longitude + '</td><td>' + local_time + '</td></tr>';
}

function createRowDisaster2(state, url, post_title, alert_region, alert_date) {
    return '<tr><td>' + state + '</td><td>' + url + '</td><td>' + post_title + '</td><td>' + alert_region + '</td><td>' + alert_date + '</td></tr>';
}
