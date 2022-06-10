// /**
//  * Makes a single API request to retrieve the user's IP address.
//  * Input:
//  *   - A callback (to pass back an error or the IP string)
//  * Returns (via Callback):
//  *   - An error, if any (nullable)
//  *   - The IP address as a string (null if error). Example: "162.245.144.188"
//  */
const request = require('request');


// const fetchMyIP = function(callback) {
//   // use request to fetch IP address from JSON API
//   let url = 'https://api.ipify.org?format=json';
//   request(url, (error, response, body) => {
//     // inside the request callback ...
//     // error can be set if invalid domain, user is offline, etc.
//     if (error) {
//       callback(error, null);
//       return;
//     }
//     // if non-200 status, assume server error
//     if (response.statusCode !== 200) {
//       const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
//       callback(Error(msg), null);
//       return;
//     }

//     // if we get here, all's well and we got the data
//     const ip = JSON.parse(body).ip;

//     callback(null, ip);

//   });
// };


// const fetchCoordsByIP = function(ip, callback) {
//   const url = `https://freegeoip.app/json/${ip}`;
//   request(url, (error, response, body) => {
//     // error can be set if invalid domain, user is offline, etc.
//     if (error) {
//       callback(error, null);
//       return;
//     }
//     // if non-200 status, assume server error
//     if (response.statusCode !== 200) {
//       const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
//       callback(Error(msg), null);
//       return;
//     }
    
//     const { latitude, longitude } = JSON.parse(body);

//     callback(null, { latitude, longitude });
//   });

// };


// const fetchISSFlyOverTimes = function(coords, callback) {
//   const url = `https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;
//   request(url, (error, response, body) => {
//     // error can be set if invalid domain, user is offline, etc.
//     if (error) {
//       callback(error, null);
//       return;
//     }

//     // if non-200 status, assume server error
//     if (response.statusCode !== 200) {
//       const msg = `Status Code ${response.statusCode} when fetching coordinates for ISS Fly Over Times: ${body}`;
//       callback(Error(msg), null);
//       return;
//     }
    
//     const passes = JSON.parse(body).response;

//     callback(null, passes);
//   });
// };

const nextISSTimesForMyLocation = function(callback) {
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
      const fetchCoordsByIP = function(ip, callback) {
        const url = `https://freegeoip.app/json/${ip}`;
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
        });
      
      };
    });
  };
};


module.exports = {
  // fetchMyIP,
  // fetchCoordsByIP,
  // fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
};