const lanIP = `${window.location.hostname}:5000`;
const socket = io(`http://${lanIP}`);

// #region ***  DOM references                           ***********
// #endregion

// #region ***  Callback-Visualisation - show___         ***********

const ShowHistoriek = function (jsonObject) {

  htmlRoute.innerHTML = '';
  let htmlstring = '';
  console.log(jsonObject);
  
}
// #endregion

// #region ***  Callback-No Visualisation - callback___  ***********
// #endregion

// #region ***  Data Access - get___                     ***********

const getHistoriek = function() {
  handleData(
    `http://${window.location.hostname}:5000/api/v1/historiek/`, ShowHistoriek
  );
}

// #endregion

// #region ***  Event Listeners - listenTo___            ***********


// #endregion

// #region ***  Init / DOMContentLoaded                  ***********

document.addEventListener("DOMContentLoaded", function () {
  console.info("DOM geladen");
  listenToSocket();
  getHistoriek();
});
// #endregion
