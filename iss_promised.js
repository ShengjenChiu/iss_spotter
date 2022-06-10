const request = require('request-promise-native');

const fetchMyIP = function() {
  return request('https://www.ipify.org?format=json');
};

/*
 * Makes a request to freegeoip.app using the provided IP address, to get its geographical information (latitude/longitude)
 * Input: JSON string containing the IP address
 * Returns: Promise of request for lat/lon
 */
const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  const url = `https://freegeoip.app/json/${ip}`;

  return request(url);

};

const fetchISSFlyOverTimes = function() {
  const { latitude, longitude } = JSON.parse(body);
  const url = `https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;

  return request(url);
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};


module.exports = {
  // fetchMyIP,
  // fetchCoordsByIP,
  // fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
};
