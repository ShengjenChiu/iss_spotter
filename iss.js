const request = require('request');

const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  let url = 'https://api.ipify.org?format=json';
  request(url, (error, response, body) => {
    // inside the request callback ...
    // error can be set if invalid domain, user is offline, etc.
    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    // if we get here, all's well and we got the data
    const ip = JSON.parse(body).ip;

    callback(null, ip);

  });
};


const fetchCoordsByIP = function(ip, callback) {
  const url = `http://ipwho.is/${ip}`; //`https://freegeoip.app/json/${ip}`;  //`http://ipwho.is/${ip}`
  request(url, (error, response, body) => {
    // error can be set if invalid domain, user is offline, etc.
    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    
    const { latitude, longitude } = JSON.parse(body);

    callback(null, { latitude, longitude });
  });

};


const fetchISSFlyOverTimes = function(coords, callback) {
  const url = `https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;
  request(url, (error, response, body) => {
    // error can be set if invalid domain, user is offline, etc.
    if (error) {
      callback(error, null);
      return;
    }

    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for ISS Fly Over Times: ${body}`;
      callback(Error(msg), null);
      return;
    }
    
    const passes = JSON.parse(body).response;

    callback(null, passes);
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if(error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, coordinates) => {
      if(error){
        return callback(error, null);
      }

      fetchISSFlyOverTimes(coordinates, (error, passTimees) => {
        if(error) {
          return callback(error, null)
        }

        callback(null, passTimees);        
      })
    });
  });
};


module.exports = {
  // fetchMyIP,
  // fetchCoordsByIP,
  // fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
};