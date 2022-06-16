
// #region ***  DOM references                           ***********

let htmlHistoriek
let htmlDevices

// #endregion

// #region ***  Callback-Visualisation - show___         ***********

const ShowHistoriek = function (jsonObject) {
  let htmlstring = '';
  for(const waarde of jsonObject.historiek){
    const datum = new Date(waarde.actiedatum).toLocaleDateString()
    const tijd = new Intl.DateTimeFormat("it-IT" , {
      timeStyle: 'medium',
      timeZone: 'UTC'
    }).format(new Date(waarde.actiedatum))
    htmlstring += `<div class="c-traject-historiek">
            <h2 class="c-historiekid-waarde">${waarde.HistoriekID}</h2>
            <div class="c-datum-waarde">${datum + " " + tijd}</div>
            <div class="c-waarde-waarde">${waarde.Waarde}</div>
            <div class="c-device-waarde">${waarde.Sensor}</div>
          </div>`
  }
  htmlHistoriek.innerHTML  = htmlstring
  listenToClickFilter();
}

const ShowHistoriekbyFilter = function(jsonObject) {
  let htmlstring = '';
  for(const waarde of jsonObject.device){
    const datum = new Date(waarde.actiedatum).toLocaleDateString()
    const tijd = new Intl.DateTimeFormat("it-IT" , {
      timeStyle: 'medium',
      timeZone: 'UTC'
    }).format(new Date(waarde.actiedatum))
    htmlstring += `<div class="c-traject-historiek">
            <h2 class="c-historiekid-waarde">${waarde.HistoriekID}</h2>
            <div class="c-datum-waarde">${datum + " " + tijd}</div>
            <div class="c-waarde-waarde">${waarde.Waarde}</div>
            <div class="c-device-waarde">${waarde.Sensor}</div>
          </div>`
  }
  htmlHistoriek.innerHTML  = htmlstring
}

const ShowDevices = function(jsonObject){
  let htmlstring = '';
  let teller = 0;
  let teller2 = 3
  for(const waarde of jsonObject.devices){
    teller += 1
    teller2 += 1
    if(waarde.Geactiveerd == 1){
      htmlstring += `<div class="c-sensoren ">
              <div class="c-datum-waarde">${waarde.Beschrijving}</div>
                <div class="c-icon js-icon">
                  <svg class=" js-activeer svg-icon-uitgegrijsd" id="${teller}" viewBox="0 0 20 20">
                    <path fill="none" d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"></path>
                  </svg>
                </div>
                <div class="c-icon js-icon">
                  <svg class=" svg-icon-deactivate js-deactiveer" id="${teller2}" viewBox="0 0 20 20">
                    <path fill="none" d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"></path>
                  </svg>
                </div>
            </div>`
    }
    else if(waarde.Geactiveerd == 0){
      htmlstring += `<div class="c-sensoren ">
              <div class="c-datum-waarde">${waarde.Beschrijving}</div>
                <div class="c-icon js-icon">
                  <svg class=" js-activeer svg-icon-activate" id="${teller}" viewBox="0 0 20 20">
                    <path fill="none" d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"></path>
                  </svg>
                </div>
                <div class="c-icon js-icon">
                  <svg class=" svg-icon-uitgegrijsd js-deactiveer" id="${teller2}" viewBox="0 0 20 20">
                    <path fill="none" d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"></path>
                  </svg>
                </div>
            </div>`
    }
  }
  htmlDevices.innerHTML = htmlstring
  listenToActiveerDevice()
  listenToDeactiveerDevice()
}

const ShowTempRadial = function(jsonObject) {
  let waardes = 0
  let max_waarde = 0
  console.log(jsonObject)
  for(waarde of jsonObject.TempRadial){
    waardes = waarde.waarde
    max_waarde = (waarde.waarde * 100) / 50
  }
  var options2 = {
      chart: {
        height: 400,
        type: 'radialBar',
      },

      series: [100/50*waardes],
      colors: ['#2699FB'],
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 135,
          hollow: {
            margin: 15,
            size: '65%',
          },
          track: {
            background: '#BCE0FD',
            startAngle: -135,
            endAngle: 135,
            // strokeWidth: '75%',
          },
          dataLabels: {
            name: {
              show: true,
              fontSize: '20px',
              fontWeight: 400,
              fontFamily: 'Degular',
              color: '#7F7F7F',
              offsetY: 20,
            },
            value: {
              formatter: function (waarde){
                return (waarde / 100 *50).toFixed(2)
              },
              fontSize: '40px',
              fontWeight: 700,
              fontFamily: 'Degular',
              color: '#7F7F7F',
              show: true,
              offsetY: -20,
            },
          },
        },
      },
      responsive: [
        {
          breakpoint: 900,
          options: {
            chart: { height: '200px' },
            plotOptions: {
              radialBar: {
                dataLabels: {
                  name: { fontSize: '14px' },
                  value: { fontSize: '30px' },
                },
              },
            },
          },
        },
      ],
      fill: {
        type: 'solid',
        // gradient: {
        //   shade: "dark",
        //   type: "horizontal",
        //   // gradientToColors: ["#87D4F9"],
        //   stops: [0, 100]
        // }
      },
      stroke: {
        lineCap: 'round',
      },
      labels: ['Temperatuur (°C)'],
    };
    var chart2 = new ApexCharts(document.querySelector('.js-chart1'),options2);
    chart2.render();
}

const ShowKwaliteitRadial = function(jsonObject) {
  let waardes = 0
  let max_waarde = 0
  console.log(jsonObject)
  for(waarde of jsonObject.KwaliteitRadial){
    waardes = waarde.waarde
    max_waarde = (waarde.waarde * 100) / 500
  }
  var options2 = {
      chart: {
        height: 400,
        type: 'radialBar',
      },

      series: [(100/500*waardes).toFixed(0)],
      colors: ['#2699FB'],
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 135,
          hollow: {
            margin: 15,
            size: '65%',
          },
          track: {
            background: '#BCE0FD',
            startAngle: -135,
            endAngle: 135,
            // strokeWidth: '75%',
          },
          dataLabels: {
            name: {
              show: true,
              fontSize: '20px',
              fontWeight: 400,
              fontFamily: 'Degular',
              color: '#7F7F7F',
              offsetY: 20,
            },
            value: {
              formatter: function (waarde){
                return (waarde / 100 *500).toFixed(0)
              },
              fontSize: '40px',
              fontWeight: 700,
              fontFamily: 'Degular',
              color: '#7F7F7F',
              show: true,
              offsetY: -20,
            },
          },
        },
      },
      responsive: [
        {
          breakpoint: 900,
          options: {
            chart: { height: '200px' },
            plotOptions: {
              radialBar: {
                dataLabels: {
                  name: { fontSize: '14px' },
                  value: { fontSize: '30px' },
                },
              },
            },
          },
        },
      ],
      fill: {
        type: 'solid',
        // gradient: {
        //   shade: "dark",
        //   type: "horizontal",
        //   // gradientToColors: ["#87D4F9"],
        //   stops: [0, 100]
        // }
      },
      stroke: {
        lineCap: 'round',
      },
      labels: ['Water kwaliteit'],
    };
    var chart2 = new ApexCharts(document.querySelector('.js-chart2'),options2);
    chart2.render();
}

const ShowPhRadial = function(jsonObject) {
  let waardes = 0
  let max_waarde = 0
  console.log(jsonObject)
  for(waarde of jsonObject.phRadial){
    waardes = waarde.waarde
    max_waarde = (waarde.waarde * 100) / 14
  }
  var options3 = {
      chart: {
        height: 400,
        type: 'radialBar',
      },

      series: [100/14*waardes],
      colors: ['#2699FB'],
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 135,
          hollow: {
            margin: 15,
            size: '65%',
          },
          track: {
            background: '#BCE0FD',
            startAngle: -135,
            endAngle: 135,
            // strokeWidth: '75%',
          },
          dataLabels: {
            name: {
              show: true,
              fontSize: '20px',
              fontWeight: 400,
              fontFamily: 'Degular',
              color: '#7F7F7F',
              offsetY: 20,
            },
            value: {
              formatter: function (waarde){
                return (waarde / 100 *14).toFixed(2)
              },
              fontSize: '40px',
              fontWeight: 700,
              fontFamily: 'Degular',
              color: '#7F7F7F',
              show: true,
              offsetY: -20,
            },
          },
        },
      },
      responsive: [
        {
          breakpoint: 900,
          options: {
            chart: { height: '200px' },
            plotOptions: {
              radialBar: {
                dataLabels: {
                  name: { fontSize: '14px' },
                  value: { fontSize: '30px' },
                },
              },
            },
          },
        },
      ],
      fill: {
        type: 'solid',
        // gradient: {
        //   shade: "dark",
        //   type: "horizontal",
        //   // gradientToColors: ["#87D4F9"],
        //   stops: [0, 100]
        // }
      },
      stroke: {
        lineCap: 'round',
      },
      labels: ['PH-waarde'],
    };
    var chart3 = new ApexCharts(document.querySelector('.js-chart3'),options3);
    chart3.render();
}

const ShowTemp = function(jsonObject){
  console.log(jsonObject)
  let waardes = []
  let datums = []
  for(waarde of jsonObject.temperatuur){
    waardes.push(waarde.waarde)
    const tijd = new Intl.DateTimeFormat("it-IT" , {
      timeStyle: 'medium',
      timeZone: 'UTC'
    }).format(new Date(waarde.actiedatum))
    datums.push(tijd)
  }
          var options = {
          series: [
          {
            name: "Temperatuur",
            data: waardes
          },
        ],
          chart: {
          height: 350,
          type: 'line',
          dropShadow: {
            enabled: true,
            color: '#000',
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2
          },
          toolbar: {
            show: false
          }
        },
        colors: ['#77B6EA', '#545454'],
        dataLabels: {
          enabled: true,
        },
        stroke: {
          curve: 'smooth'
        },
        title: {
          text: 'Temperatuur van de 7 voorbije metingen',
          align: 'left'
        },
        grid: {
          borderColor: '#e7e7e7',
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          },
        },
        markers: {
          size: 1
        },
        xaxis: {
          categories: datums,
          title: {
            text: 'Tijd van de meting'
          }
        },
        yaxis: {
          title: {
            text: 'Temperatuur (in °C)'
          },
          min: 1,
          max: 40
        },
        legend: {
          position: 'top',
          horizontalAlign: 'right',
          floating: true,
          offsetY: -25,
          offsetX: -5
        }
        };

        var chart = new ApexCharts(document.querySelector(".js-chart1"), options);
        chart.render();
}

const ShowKwaliteit = function(jsonObject){
  let waardes = []
  let datums = []
  for(waarde of jsonObject.kwaliteit){
    waardes.push(waarde.waarde)
    const tijd = new Intl.DateTimeFormat("it-IT" , {
      timeStyle: 'medium',
      timeZone: 'UTC'
    }).format(new Date(waarde.actiedatum))
    datums.push(tijd)
  }
          var options = {
          series: [
          {
            name: "Kwaliteit",
            data: waardes
          },
        ],
          chart: {
          height: 350,
          type: 'line',
          dropShadow: {
            enabled: true,
            color: '#000',
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2
          },
          toolbar: {
            show: false
          }
        },
        colors: ['#77B6EA', '#545454'],
        dataLabels: {
          enabled: true,
        },
        stroke: {
          curve: 'smooth'
        },
        title: {
          text: 'Kwaliteit van de 7 voorbije metingen',
          align: 'left'
        },
        grid: {
          borderColor: '#e7e7e7',
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          },
        },
        markers: {
          size: 1
        },
        xaxis: {
          categories: datums,
          title: {
            text: 'Tijd van de meting'
          }
        },
        yaxis: {
          title: {
            text: 'Kwaliteit (in deeltjes per miljoen (DPM))'
          },
          min: 1,
          max: 500
        },
        legend: {
          position: 'top',
          horizontalAlign: 'right',
          floating: true,
          offsetY: -25,
          offsetX: -5
        }
        };

        var chart = new ApexCharts(document.querySelector(".js-chart2"), options);
        chart.render();
}

const ShowPh = function(jsonObject){
  let waardes = []
  let datums = []
  for(waarde of jsonObject.ph){
    waardes.push(waarde.waarde)
    const tijd = new Intl.DateTimeFormat("it-IT" , {
      timeStyle: 'medium',
      timeZone: 'UTC'
    }).format(new Date(waarde.actiedatum))
    datums.push(tijd)
  }
          var options = {
          series: [
          {
            name: "PH",
            data: waardes
          },
        ],
          chart: {
          height: 350,
          type: 'line',
          dropShadow: {
            enabled: true,
            color: '#000',
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2
          },
          toolbar: {
            show: false
          }
        },
        colors: ['#77B6EA', '#545454'],
        dataLabels: {
          enabled: true,
        },
        stroke: {
          curve: 'smooth'
        },
        title: {
          text: 'PH-waarde van de 7 voorbije metingen',
          align: 'left'
        },
        grid: {
          borderColor: '#e7e7e7',
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          },
        },
        markers: {
          size: 1
        },
        xaxis: {
          categories: datums,
          title: {
            text: 'Tijd van de meting'
          }
        },
        yaxis: {
          title: {
            text: 'PH-waarde'
          },
          min: 1,
          max: 14
        },
        legend: {
          position: 'top',
          horizontalAlign: 'right',
          floating: true,
          offsetY: -25,
          offsetX: -5
        }
        };

        var chart = new ApexCharts(document.querySelector(".js-chart3"), options);
        chart.render();
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

const getHistoriekbyFilter = function(DeviceID) {
  handleData(
    `http://${window.location.hostname}:5000/api/v1/historiek/${DeviceID}/`, ShowHistoriekbyFilter
  );
}

const getDevices = function() {
  handleData(
    `http://${window.location.hostname}:5000/api/v1/devices/`, ShowDevices
  );
}

const getTemperatuur = function() {
  handleData(
    `http://${window.location.hostname}:5000/api/v1/temperatuur/`, ShowTemp
  )
}

const getKwaliteit = function() {
  handleData(
    `http://${window.location.hostname}:5000/api/v1/kwalitiet/`, ShowKwaliteit
  )
}

const getPh = function() {
  handleData(
    `http://${window.location.hostname}:5000/api/v1/ph/`, ShowPh
  )
}

const getTempRadial = function() {
  handleData(
    `http://${window.location.hostname}:5000/api/v1/temp/radial/`, ShowTempRadial
  )
}

const getKwaliteitRadial = function() {
  handleData(
    `http://${window.location.hostname}:5000/api/v1/kwaliteit/radial/`, ShowKwaliteitRadial
  )
}

const getPHRadial = function() {
  handleData(
    `http://${window.location.hostname}:5000/api/v1/ph/radial/`, ShowPhRadial
  )
}

// #endregion

// #region ***  Event Listeners - listenTo___            ***********

const listenToClickFilter = function () {
  const buttons = document.querySelectorAll('.js-filter');
  for (const btn of buttons) {
    btn.addEventListener('click', function () {
      const id = btn.getAttribute('data-filter-id');
      currentDestinationID = id;
      console.log(id)
      getHistoriekbyFilter(id);
    });
  }
};

const listenToActiveerDevice = function () {
  const buttons = document.querySelectorAll('.js-activeer')
  for(const btn of buttons) {
    btn.addEventListener('click', function () {
      const id = btn.getAttribute('id');
      var element = document.getElementById(id)
      var element2 = document.getElementById(parseInt(id) + 3)
      if(element.classList.contains("svg-icon-activate")){
        element.classList.remove("svg-icon-activate")
        element.classList.add("svg-icon-uitgegrijsd")
        element2.classList.remove("svg-icon-uitgegrijsd")
        element2.classList.add("svg-icon-deactivate")
      }
    })
  }
}

const listenToDeactiveerDevice = function () {
  const buttons = document.querySelectorAll('.js-deactiveer')
  for(const btn of buttons) {
    btn.addEventListener('click', function () {
      const id = btn.getAttribute('id');
      var element = document.getElementById(id)
      var element2 = document.getElementById(parseInt(id-3))
     if(element.classList.contains("svg-icon-deactivate")){
        element.classList.remove("svg-icon-deactivate")
        element.classList.add("svg-icon-uitgegrijsd")
        element2.classList.remove("svg-icon-uitgegrijsd")
        element2.classList.add("svg-icon-activate")
      }
    })
  }
}

// #endregion

// #region ***  Init / DOMContentLoaded                  ***********

document.addEventListener("DOMContentLoaded", function () {
  console.info("DOM geladen");
  Historiek = document.querySelector('.js-historiek-body')
  Beheren = document.querySelector('.js-beheren-body')
  index = document.querySelector('.js-index-body')
  Grafiek = document.querySelector('.js-grafiek-body')
  if(index){
    getTempRadial()
    getKwaliteitRadial()
    getPHRadial()
  }
  else if(Grafiek){
    getTemperatuur();
    getKwaliteit();
    getPh();
  }
  else if(Historiek){
    htmlHistoriek = document.querySelector('.js-historiek')
    getHistoriek();
  }
  else if(Beheren){
    htmlDevices = document.querySelector('.js-beheren')
    getDevices()
  }
});
// #endregion
