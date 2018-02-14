import { getCity } from './api_util';
import Chart from 'chart.js';
import { cityData } from './city-data';


window.onload = () => {

   const getCityScores = (city) => {
    let cityScores;
    getCity(city).then((obj) => {
      cityScores = { [city]: obj.categories };
      });
    return cityScores;
  };

  const updateDataset = (chart, city, title) => {
      let newData = cityData[city].map((score) => score.score_out_of_10);
      chart.data.datasets[0].data = newData;

      let newColors = cityData[city].map((score) => score.color);
      chart.data.datasets[0].backgroundColor = newColors;

      let newLabels = cityData[city].map((score) => score.name);
      chart.data.labels = newLabels;

      chart.options.title.text = `${title} - Life Quality Scores`;

      chart.update();
  };

  const updateChart1 = document.getElementById('chart1Selection');

  updateChart1.onchange = function(e) {
    let city = e.target.value;
    let titleWords = e.target.value.split(" ");
    let title = titleWords.map( word => word[0].toUpperCase().concat(word.slice(1)) ).join(" ");
    updateDataset(chart1, city, title);
  };

  const updateChart2 = document.getElementById('chart2Selection');

  updateChart2.onchange = function(e) {
    let city = e.target.value;
    let titleWords = e.target.value.split(" ");
    let title = titleWords.map( word => word[0].toUpperCase().concat(word.slice(1)) ).join(" ");
    updateDataset(chart2, city, title);
  };

  var ctx = document.getElementById('myChart1').getContext('2d');

  var chart1 = new Chart(ctx, {
      type: 'horizontalBar',
      data: {
          labels: [],
          datasets: [{
              label: "",
              backgroundColor: [],
              borderColor: '#fff',
              data: []
          }]
      },
      options: {
        scales: {
            xAxes: [{
                ticks: {
                    beginAtZero: true,
                    max: 10
                }
            }]
        },
        legend: {
          display: false
        },
        title: {
          display: true,
          text: ""
        }
      }
  });

  var ctx = document.getElementById('myChart2').getContext('2d');

  var chart2 = new Chart(ctx, {
      type: 'horizontalBar',
      data: {
          labels: [],
          datasets: [{
              label: "",
              backgroundColor: [],
              borderColor: '#fff',
              data: []
          }]
      },
      options: {
        scales: {
            xAxes: [{
                ticks: {
                    beginAtZero: true,
                    max: 10
                }
            }]
        },
        legend: {
          display: false
        },
        title: {
          display: true,
          text: ""
        }
      }
  });
};
