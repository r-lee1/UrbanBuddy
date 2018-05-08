import { getCity } from './api_util';
import Chart from 'chart.js';


window.onload = () => {
//collection of cityData
  const cityData = {};

//fetch city data from Teleport
  const getCityScores = (city) => {
   return getCity(city)
   .then((obj) => {
     cityData[city] = {};
     cityData[city]["scores"] = obj.categories;
     cityData[city]["summary"] = obj.summary;
   });
  };

//update charts with data of newly selected city
  const updateDataset = (chart, city, title) => {
      let newScore = cityData[city]["scores"].map((score) => score.score_out_of_10.toFixed(1));
      chart.data.datasets[0].data = newScore;

      let newColors = cityData[city]["scores"].map((score) => score.color);
      chart.data.datasets[0].backgroundColor = newColors;

      let newLabels = cityData[city]["scores"].map((score) => score.name);
      chart.data.labels = newLabels;

      chart.options.title.text = `${title} - Life Quality Scores`;

      chart.update();
  };

  const updateSummary1 = (city) => {
    $("#summary1").html(cityData[city]["summary"]);
  };

  const updateSummary2 = (city) => {
    $("#summary2").html(cityData[city]["summary"]);
  };

  const ccCity1 = document.getElementById('ccCity1');
  const ccCity2 = document.getElementById('ccCity2');

  const updateComparisonDataset1 = (city, title) => {
      let newScore = cityData[city]["scores"].map((score) => score.score_out_of_10.toFixed(1));
      let newLabel = title;
      comparisonChart.data.datasets[0].data = newScore;
      comparisonChart.data.datasets[0].label = newLabel;
      comparisonChart.update();

      ccCity1.textContent = newLabel;
  };

  const updateComparisonDataset2 = (city, title) => {
      let newScore = cityData[city]["scores"].map((score) => score.score_out_of_10.toFixed(1));
      let newLabel = title;
      comparisonChart.data.datasets[1].data = newScore;
      comparisonChart.data.datasets[1].label = newLabel;
      comparisonChart.update();

      ccCity2.textContent = newLabel;
  };

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  };

//select random cities to display onload
  const randomCitySelector = (chartSelection) => {
    let maxIndex = chartSelection.options.length;
    let index = getRandomInt(maxIndex);
    chartSelection.options[index].selected = true;
    let option = chartSelection.options[index];
    chartSelection.onchange({"target": option});
  };


/* configure charts to be displayed on canvas */
  const chart1Selection = document.getElementById('chart1Selection');

  chart1Selection.onchange = function(e) {
    let city = e.target.value;
    let titleWords = e.target.value.split("-");
    let title;

    if (city === "washington-dc") {
      title = "Washington, D.C";
    } else {
      title = titleWords.map( word => word[0].toUpperCase().concat(word.slice(1)) ).join(" ");
    }

    if (cityData[city]) {
      updateDataset(chart1, city, title);
      updateComparisonDataset1(city, title);
      updateSummary1(city);
    } else {
      getCityScores(city)
        .then(() => {
          updateDataset(chart1, city, title);
          updateComparisonDataset1(city, title);
          updateSummary1(city);
        });
    }
  };

  const chart2Selection = document.getElementById('chart2Selection');

  chart2Selection.onchange = function(e) {
    let city = e.target.value;
    let titleWords = e.target.value.split("-");
    let title;

    if (city === "washington-dc") {
      title = "Washington, D.C";
    } else {
      title = titleWords.map( word => word[0].toUpperCase().concat(word.slice(1)) ).join(" ");
    }

    if (cityData[city]) {
      updateDataset(chart2, city, title);
      updateComparisonDataset2(city, title);
      updateSummary2(city);
    } else {
      getCityScores(city)
        .then(() => {
          updateDataset(chart2, city, title);
          updateComparisonDataset2(city, title);
          updateSummary2(city);
         });
    }
  };

  var ctx1 = document.getElementById('myChart1').getContext('2d');
  var chart1 = new Chart(ctx1, {
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
                    max: 10,
                    fontSize: 15
                }
            }],
            yAxes: [{
              ticks: {
                fontSize: 15
              }
            }],
            scaleLabel: {
              fontSize: 30
            }
        },
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        title: {
          display: true,
          text: "",
          fontSize: 16
        }
      }
  });

  var ctx2 = document.getElementById('myChart2').getContext('2d');
  var chart2 = new Chart(ctx2, {
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
                    max: 10,
                    fontSize: 15
                }
            }],
            yAxes: [{
              ticks: {
                fontSize: 15
              }
            }]
        },
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        title: {
          display: true,
          text: "",
          fontSize: 16
        }
      }
  });

  var ctx3 = document.getElementById('comparisonChart').getContext('2d');
  var comparisonChart = new Chart(ctx3, {
      type: 'horizontalBar',
      data: {
          labels: ["Housing", "Cost of Living", "Startups", "Venture Capital", "Travel Connectivity", "Commute", "Business Freedom", "Safety", "Healthcare", "Education", "Environmental Quality", "Economy", "Taxation", "Internet Access", "Leisure & Culture", "Tolerance", "Outdoors"],
          datasets: [{
              label: "",
              backgroundColor: "#5352ed",
              borderColor: '#f4eb33',
              data: []
          },
          {
              label: "",
              backgroundColor: "#fed330",
              borderColor: '#150e78',
              data: []
          }
        ]
      },
      options: {
        scales: {
            xAxes: [{
                ticks: {
                    beginAtZero: true,
                    max: 10,
                    fontSize: 16
                }
            }],
            yAxes: [{
              ticks: {
                fontSize: 16
              }
            }]
        },
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        title: {
          display: true,
          text: "Comparison Between Cities",
          fontSize: 26
        }
      }
  });


  randomCitySelector(chart1Selection);
  randomCitySelector(chart2Selection);
};
