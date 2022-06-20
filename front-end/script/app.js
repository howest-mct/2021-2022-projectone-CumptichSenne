
// #region ***  DOM references                           ***********

let htmlHistoriek;
let htmlDevices;
let temperatuur;
let kwaliteit;
let ph;
let temperatuurLine;
let kwaliteitLine;
let phLine;
let radial = {
  temperatuur : {},
  kwaliteit : {},
  ph : {}
};

let line = {
  temperatuurLine: {},
  kwaliteitLine: {},
  phLine: {},
}

let options1 = {
    chart: {
      height: 400,
      type: 'radialBar',
    },

    series: [50],
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
        breakpoint: 950,
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

let options2 = {
    chart: {
      height: 400,
      type: 'radialBar',
    },

    series: [250 / 5],
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
        breakpoint: 950,
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

let options3 = {
  chart: {
    height: 400,
    type: 'radialBar',
  },

  series: [14 * 3.565],
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
      breakpoint: 950,
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

const lanIP = `${window.location.hostname}:5000`;
const socket = io(`http://${lanIP}`);

// #endregion

// #region ***  Callback-Visualisation - show___         ***********

const ShowDevices = function(jsonObject){
  let htmlstring = '';
  let teller = 0;
  let actief = '';
  for(const waarde of jsonObject.devices){
    teller += 1
    if(waarde.Geactiveerd == 1){
      actief = 'Actief'
      htmlstring += `<div class="c-sensoren ">
              <div class="c-datum-waarde">${waarde.Beschrijving}</div>
              <div class="c-status js-status">${actief}</div>
              <div class="c-button-deactief js-button" id="${teller}">deactiveren</div>
            </div>`
    }
    else if(waarde.Geactiveerd == 0){
      actief = 'Niet actief'
      htmlstring += `<div class="c-sensoren ">
              <div class="c-datum-waarde">${waarde.Beschrijving}</div>
              <div class="c-status">${actief}</div>
              <div class="c-button-actief js-button"  id="${teller}">activeren</div>
            </div>`
    }
  }
  htmlDevices.innerHTML = htmlstring
  listenToStatus()
}

const ShowTemperatuur = function(jsonObject){
  let waardes = []
  let datums = []
    for(let waarde of jsonObject.temperatuur){
      waardes.push(waarde.waarde)
      const datetime = new Date(waarde.actiedatum)
      const uur = datetime.getHours()
      const minuut = datetime.getMinutes()
      const tijd = uur +':' + minuut
      datums.push(tijd)
    }
    let optionsLine1 = {
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
      tickAmount: 8,
      min: 0,
      max: 40,
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      floating: true,
      offsetY: -25,
      offsetX: -5
    }
    };     
    let chart = new ApexCharts(document.querySelector(".js-chart1"), optionsLine1);
    chart.render();
}

const ShowKwaliteit = function(jsonObject){
  let waardes = []
  let datums = []
  for(let waarde of jsonObject.kwaliteit){
    waardes.push(waarde.waarde)
    const datetime = new Date(waarde.actiedatum)
    const uur = datetime.getHours()
    const minuut = datetime.getMinutes()
    const tijd = uur +':' + minuut
    datums.push(tijd)
  }
  let optionsLine2 = {
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
        text: 'Kwaliteit (in ppm (Parts Per Million))'
      },
      tickAmount: 8,
      min: 0,
      max: 400
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      floating: true,
      offsetY: -25,
      offsetX: -5
    }
  };         
    let chart = new ApexCharts(document.querySelector(".js-chart2"), optionsLine2);
    chart.render();
}

const ShowPh = function(jsonObject){
  let waardes = []
  let datums = []
  for(let waarde of jsonObject.ph){
    waardes.push(waarde.waarde)
    const datetime = new Date(waarde.actiedatum)
    const uur = datetime.getHours()
    const minuut = datetime.getMinutes()
    const tijd = uur +':' + minuut
    datums.push(tijd)
  }
  let optionsLine3 = {
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
      tickAmount: 13,
      min: 1,
      max: 14,
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      floating: true,
      offsetY: -25,
      offsetX: -5
    }
  };
    let chart = new ApexCharts(document.querySelector(".js-chart3"), optionsLine3);
    chart.render();
}

// #endregion

// #region ***  Callback-No Visualisation - callback___  ***********


const callbackUpdateStatus = function (data) {
  console.log('UPDATE antw van server');
  if (data.deviceid > 0) {
    console.log('UPDATE gelukt');
    console.log(data);
    window.location.href = 'index.html';
  }
};

// #endregion

// #region ***  Data Access - get___                     ***********

const getDevices = function() {
  handleData(
    `http://${window.location.hostname}:5000/api/v1/devices/`, ShowDevices
  );
}

const getTemperatuur = function() {
  handleData(
    `http://${window.location.hostname}:5000/api/v1/temperatuur/`, ShowTemperatuur
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

// #endregion

// #region ***  Event Listeners - listenTo___            ***********

const listenToStatus = function () {
  const button = document.querySelectorAll('.js-button')
  for(const btn of button) {
    btn.addEventListener('click', function () {
      htmlStatus = document.querySelector('.js-button').innerHTML
      console.log(htmlStatus)
      const id = btn.getAttribute('id');
      if(id == "1" && htmlStatus == 'activeren'){
        socket.emit('F2B_actief', {Geactiveerd: 0,DeviceID: 1});
        document.getElementById(id).innerHTML = `deactiveren`
        document.getElementById(id).classList.remove('c-button-actief')
        document.getElementById(id).classList.add('c-button-deactief')
      }
      else if(id == "1" && htmlStatus == 'deactiveren'){
        socket.emit('F2B_actief', {Geactiveerd: 1,DeviceID: 1});
        document.getElementById(id).innerHTML = `activeren`
        document.getElementById(id).classList.remove('c-button-deactief')
        document.getElementById(id).classList.add('c-button-actief')
      }
      else if(id == "2" && htmlStatus == 'activeren'){
        socket.emit('F2B_actief', {Geactiveerd: 0,DeviceID: 2});
        document.getElementById(id).innerHTML = `deactiveren`
        document.getElementById(id).classList.remove('c-button-actief')
        document.getElementById(id).classList.add('c-button-deactief')
      }
      else if(id == "2" && htmlStatus == 'deactiveren'){
        socket.emit('F2B_actief', {Geactiveerd: 1,DeviceID: 2});
        document.getElementById(id).innerHTML = `activeren`
        document.getElementById(id).classList.remove('c-button-deactief')
        document.getElementById(id).classList.add('c-button-actief')
      }
      else if(id == "3" && htmlStatus == 'activeren'){
        socket.emit('F2B_actief', {Geactiveerd: 0,DeviceID: 3});
        document.getElementById(id).innerHTML = `deactiveren`
        document.getElementById(id).classList.remove('c-button-actief')
        document.getElementById(id).classList.add('c-button-deactief')
      }
      else if(id == "3" && htmlStatus == 'deactiveren'){
        socket.emit('F2B_actief', {Geactiveerd: 1,DeviceID: 3});
        document.getElementById(id).innerHTML = `activeren`
        document.getElementById(id).classList.remove('c-button-deactief')
        document.getElementById(id).classList.add('c-button-actief')
      }
        
    })
  }
}

const listenToUI = function () {
  const knoppen = document.querySelectorAll(".js-power-btn");
  for (const knop of knoppen) {
    knop.addEventListener("click", function () {
      const id = this.dataset.idlamp;
      let nieuweStatus;
      if (this.dataset.statuslamp == 0) {
        nieuweStatus = 1;
      } else {
        nieuweStatus = 0;
      }
      //const statusOmgekeerd = !status;
      clearClassList(document.querySelector(`.js-room[data-idlamp="${id}"]`));
      document.querySelector(`.js-room[data-idlamp="${id}"]`).classList.add("c-room--wait");
      socket.emit("F2B_switch_light", { lamp_id: id, new_status: nieuweStatus });
    });
  }
};

const listenToSocketRadial = function () {
  socket.on("connect", function () {
    console.log("verbonden met socket webserver");
  });

  socket.on("B2F_temp", function (jsonObject) {
    console.log(jsonObject);
    let waardes = 0
    let max_waarde = 0
    for(  let waarde of jsonObject.temperatuur){
      waardes = waarde.waarde
      max_waarde = (waarde.waarde * 100) / 50
    }
    radial.temperatuur.updateSeries([
      waardes *2
    ])
  });

  socket.on("B2F_kwaliteit", function (jsonObject) {
    console.log(jsonObject);
    let waardes = 0
    let max_waarde = 0
    for(waarde of jsonObject.kwaliteit){
      waardes = waarde.waarde
      max_waarde = (waarde.waarde * 100) / 500
    }
    radial.kwaliteit.updateSeries([
      waardes *2 /10
    ])
  });

  socket.on("B2F_ph", function (jsonObject) {
    console.log(jsonObject);
    let waardes = 0
    let max_waarde = 0
    for(waarde of jsonObject.ph ){
      waardes = waarde.waarde
      max_waarde = (waarde.waarde * 100) / 14
    }
    radial.ph.updateSeries([
      waardes *7
    ])
  });
};

const listenToSocketStatus = function () {
  socket.on("connect", function () {
    console.log("verbonden met socket webserver");
  });

  socket.on("B2F_status", function (jsonObject) {
    for (waarde of jsonObject.status){
      console.log(waarde.geactiveerd)
      if(waarde.geactiveerd == 0){
        htmlStatus.innerHTML == 'Niet actief'
      }
      else if(waarde.geactiveerd == 1){
        htmlStatus.innerHTML == 'Actief'
      }
    }
  });
};

// #endregion

// #region ***  Init / DOMContentLoaded                  ***********

document.addEventListener("DOMContentLoaded", function () {
  console.info("DOM geladen");
  Beheren = document.querySelector('.js-beheren-body')
  index = document.querySelector('.js-index-body')
  Grafiek = document.querySelector('.js-grafiek-body')
  if(index){
    radial.temperatuur = new ApexCharts(document.querySelector('#charttemp'),options1);
    radial.temperatuur.render()
    radial.kwaliteit = new ApexCharts(document.querySelector('#chartkwal'),options2);
    radial.kwaliteit.render()
    radial.ph = new ApexCharts(document.querySelector('#chartph'),options3);
    radial.ph.render()
    listenToSocketRadial()
  }
  else if(Grafiek){
    getTemperatuur();
    getKwaliteit();
    getPh();
  }
  else if(Beheren){
    htmlDevices = document.querySelector('.js-beheren')
    htmlStatus = document.querySelector('.js-status')
    getDevices()
    listenToSocketStatus()
  }
});
// #endregion
