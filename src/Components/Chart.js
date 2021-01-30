import {Line} from 'react-chartjs-2';

import '../scss/Components/Chart.scss';

const Chart = ({chartDate, chartPrice, coin}) => {
  const data = {
    labels: chartDate,
    datasets: [
      {
        label: coin,
        data: chartPrice,
        borderColor: "orange",
        backgroundColor: "transparent",
        fill: ""
      }
    ]
  }
  //console.log(chartDate);
  //console.log(chartPrice);
  return <div className="chart-wrapper">
    <Line data={data} />
  </div>
}

export default Chart;