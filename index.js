// index.js
const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });


// fetchCoordsByIP('70.72.164.78', (error, coords) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned GeoCoordinates:', coords);
// });

// const coords = { latitude: '51.06283', longitude: '-113.88871' };

// fetchISSFlyOverTimes(coords, (error, riseTimeDurations) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned Fetch Flyover Times:',riseTimeDurations);

// });

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    console.log("It didn't work!" + error);
  }

  console.log(passTimes);
});