const lanIP = `${window.location.hostname}:5000`;

// #region ***  DOM references                           ***********
// #endregion

// #region ***  Callback-Visualisation - show___         ***********

const ShowHistoriek = function (jsonObject) {
  //Toon menu
  console.log(jsonObject);
};
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

const listenToSocket = function () {
  socket.on("connected", function () {
    console.log("verbonden met socket webserver");
  });

  socket.on("B2F_status_lampen", function (jsonObject) {
    console.log("alle lampen zijn automatisch uitgezet");
    console.log("Dit is de status van de lampen");
    console.log(jsonObject);
    for (const lamp of jsonObject.lampen) {
      const room = document.querySelector(`.js-room[data-idlamp="${lamp.id}"]`);
      if (room) {
        const knop = room.querySelector(".js-power-btn");
        knop.dataset.statuslamp = lamp.status;
        clearClassList(room);
        if (lamp.status == 1) {
          room.classList.add("c-room--on");
        }
      }
    }
  });

  socket.on("B2F_verandering_lamp", function (jsonObject) {
    console.log("Er is een status van een lamp veranderd");
    console.log(jsonObject.lamp.id);
    console.log(jsonObject.lamp.status);

    const room = document.querySelector(`.js-room[data-idlamp="${jsonObject.lamp.id}"]`);
    if (room) {
      const knop = room.querySelector(".js-power-btn"); //spreek de room, als start. Zodat je enkel knop krijgt die in de room staat
      knop.dataset.statuslamp = jsonObject.lamp.status;

      clearClassList(room);
      if (jsonObject.lamp.status == 1) {
        room.classList.add("c-room--on");
      }
    }
  });
  socket.on("B2F_verandering_lamp_from_HRDWR", function (jsonObject) {
    console.log(jsonObject)
  }) 

};

// #endregion

// #region ***  Init / DOMContentLoaded                  ***********

document.addEventListener("DOMContentLoaded", function () {
  console.info("DOM geladen");
  listenToSocket();
});
// #endregion
