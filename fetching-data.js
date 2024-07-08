const express = require('express');
const app = express();
const axios = require('axios');

app.get('/api/combined-data/:month', async (req, res) => {
  const month = req.params.month;

  const transactionsApi = `http://localhost:3000/api/transactions/${month}`;
  const statisticsApi = `http://localhost:3000/api/statistics/${month}`;
  const barChartApi = `http://localhost:3000/api/bar-chart/${month}`;
  const pieChartApi = `http://localhost:3000/api/pie-chart/${month}`;

  const [transactionsResponse, statisticsResponse, barChartResponse, pieChartResponse] = await Promise.all([
    axios.get(transactionsApi),
    axios.get(statisticsApi),
    axios.get(barChartApi),
    axios.get(pieChartApi),
  ]);

  const combinedData = {
    transactions: transactionsResponse.data,
    statistics: statisticsResponse.data,
    barChart: barChartResponse.data,
    pieChart: pieChartResponse.data,
  };

  res.json(combinedData);
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
