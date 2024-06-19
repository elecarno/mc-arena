<script>
    import { onMount } from 'svelte';
    import { Chart, registerables } from 'chart.js';
  
    Chart.register(...registerables);
  
    export let chartData = {};
  
    let canvas;
  
    onMount(() => {
      const ctx = canvas.getContext('2d');
  
      const labels = Object.keys(chartData);
      const data = Object.values(chartData);
  
      const colors = [
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(153, 102, 255, 0.8)',
        'rgba(255, 159, 64, 0.8)',
        'rgba(255, 0, 0, 0.8)',
        'rgba(0, 255, 0, 0.8)',
        'rgba(0, 0, 255, 0.8)',
        'rgba(128, 128, 0, 0.8)'
      ];
  
      const borderColors = colors.map(color => color.replace('0.8', '1'));
  
      const chart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [{
            label: 'Dataset',
            data: data,
            backgroundColor: colors,
            borderColor: borderColors,
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            tooltip: {
              callbacks: {
                label: (tooltipItem) => {
                  const label = tooltipItem.label;
                  const value = tooltipItem.raw.toFixed(2);
                  const dataset = tooltipItem.chart.data.datasets[0];
                  const total = dataset.data.reduce((acc, data) => acc + data, 0);
                  const percentage = ((dataset.data[tooltipItem.dataIndex] / total) * 100).toFixed(2);
                  return `${label}: ${value} (${percentage}%)`;
                }
              }
            }
          }
        }
      });
  
      return () => chart.destroy();
    });
  </script>
  
  <div class="chart-container">
    <canvas bind:this={canvas}></canvas>
  </div>
  
  <style>
    .chart-container {
      width: 50%;
    }
  </style>
  