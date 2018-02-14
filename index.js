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

  const updateDataset = (chart, city) => {
      let newData = cityData[city].map((score) => score.score_out_of_10);
      chart.data.datasets[0].data = newData;
      chart.update();
  };

  var ctx = document.getElementById('myChart1').getContext('2d');

  var chart1 = new Chart(ctx, {
      // The type of chart we want to create
      type: 'horizontalBar',
      // The data for our dataset
      data: {
          labels: ["Housing", "Cost of Living", "Startups", "Venture Capital", "Travel Connectivity", "Commute", "Business Freedom", "Safety", "Healthcare", "Education", "Environmental Quality", "Economy", "Taxation", "Internet Access", "Leisure & Culture", "Tolerance", "Outdoors"],
          datasets: [{
              label: "Atlanta - Life Quality Scores",
              backgroundColor: 'rgb(255, 99, 132)',
              borderColor: 'rgb(255, 99, 132)',
              data: [
                cityData["atlanta"][0]["score_out_of_10"],
                cityData["atlanta"][1]["score_out_of_10"],
                cityData["atlanta"][2]["score_out_of_10"],
                cityData["atlanta"][3]["score_out_of_10"],
                cityData["atlanta"][4]["score_out_of_10"],
                cityData["atlanta"][5]["score_out_of_10"],
                cityData["atlanta"][6]["score_out_of_10"],
                cityData["atlanta"][7]["score_out_of_10"],
                cityData["atlanta"][8]["score_out_of_10"],
                cityData["atlanta"][9]["score_out_of_10"],
                cityData["atlanta"][10]["score_out_of_10"],
                cityData["atlanta"][11]["score_out_of_10"],
                cityData["atlanta"][12]["score_out_of_10"],
                cityData["atlanta"][13]["score_out_of_10"],
                cityData["atlanta"][14]["score_out_of_10"],
                cityData["atlanta"][15]["score_out_of_10"],
                cityData["atlanta"][16]["score_out_of_10"]
              ]
          }]
      },
      // Configuration options go here
      options: {}
  });

  var updateChart1 = document.getElementById('chart1Selection');
  updateChart1.onchange = function() { updateDataset(chart1, "boston"); };
};
