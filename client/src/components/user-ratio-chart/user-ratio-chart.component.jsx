import React from 'react';
import {Pie, Doughnut} from 'react-chartjs-2';

const state = {
  labels: ['Self', 'Group', 'Corporate',
           'Others',],
  datasets: [
    {
      label: 'Rainfall',
      backgroundColor: [
        '#B21F00',
        '#C9DE00',
        '#2FDE00',
        '#00A6B4',
      ],
      hoverBackgroundColor: [
      '#501800',
      '#4B5000',
      '#175000',
      '#003350'
      ],
      data: [65, 59, 80, 81]
    }
  ]
}

export default class UserChart extends React.Component {
  render() {
    return (
      <div style = {{marginTop: "100px"}}>
        <Pie
          data={state}
          options={{
            title:{
              display:true,
              text:'Types of Registered Users',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
      </div>
    );
  }
}