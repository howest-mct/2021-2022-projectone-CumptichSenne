const lanIP = `${window.location.hostname}:5000`;
const socket = io(`http://${lanIP}`);

// #region ***  DOM references                           ***********
// #endregion

// #region ***  Callback-Visualisation - show___         ***********

const ShowHistoriek = function (jsonObject) {

  htmlRoute.innerHTML = '';
  let htmlstring = '';
  console.log(jsonObject);
  for (const trein of jsonObject.trein) {
    console.log(trein);
    htmlstring += `
			<div class="c-traject">
				<div class="c-traject__info">
					<h2 class="c-traject__name">${trein.stad}</h2>
					<p class="c-traject__train-id">Trein ${trein.idtrein}</p>
				</div>
				<div class="c-traject__departure">
					${trein.vertrek}
				</div>
				<div class="c-traject__track">
					${trein.spoor}
				</div>
				<div class="c-traject__delay">
				${trein.vertraging ? trein.vertraging : '-'}
				</div>
				<div class="c-traject__cancelled">
					${
            trein.afgeschaft
              ? '<span class="c-traject__cancelled-label">afgeschaft</span>'
              : ''
          }
        </div>
        <div class="c-traject__updatevertraging">
						<a href="vertraging.html?TreinID=${trein.idtrein}">
							<svg class="c-traject__updatevertraging-symbol" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#222222" stroke-width="2" stroke-linecap="round" stroke-linejoin="arcs">
                <polygon points="16 3 21 8 8 21 3 21 3 16 16 3"></polygon>
							</svg>
						</a>
					</div>
        <div class="c-traject__update">
          <a href="aanpassen.html?TreinID=${trein.idtrein}">
						<svg class="c-traject__update-symbol" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#222222" stroke-width="2" stroke-linecap="round" stroke-linejoin="arcs">
							<polygon points="16 3 21 8 8 21 3 21 3 16 16 3"></polygon>
            </svg>
          </a>
				</div>
				<div class="c-traject__delete">
					<svg class="c-traject__delete-symbol" data-train-id=${
            trein.idtrein
          } xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#222222" stroke-width="2" stroke-linecap="round" stroke-linejoin="arcs">
						<polyline points="3 6 5 6 21 6"></polyline>
						<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
						<line x1="10" y1="11" x2="10" y2="17"></line>
						<line x1="14" y1="11" x2="14" y2="17"></line>
					</svg>
				</div>
			</div>`;
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
});
// #endregion
