<script>
  import { onMount } from 'svelte';
  import { Chart, registerables } from 'chart.js';

  Chart.register(...registerables);

  export let totalData = {};
  export let averageData = {};

  let canvas;

  onMount(() => {
    const ctx = canvas.getContext('2d');

    const totalLabels = Object.keys(totalData);
    const totalValues = Object.values(totalData);

    const averageLabels = Object.keys(averageData);
    const averageValues = Object.values(averageData);

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: totalLabels,
        datasets: [
          {
            label: 'Total',
            data: totalValues,
            backgroundColor: 'rgba(75, 192, 192, 1)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          },
          {
            label: 'Average',
            data: averageValues,
            backgroundColor: 'rgba(255, 159, 64, 1)',
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 2, // Adjust this value to control the density of the scale
              precision: 0 // Optional: Number of decimal places
            }
          }
        }
      }
    });
  });
</script>

<div class="chart-container">
    <canvas bind:this={canvas}></canvas>
  </div>
  
  <style>
    .chart-container {
      width: 70%;
      /* height: 100%; */
    }
  </style>
