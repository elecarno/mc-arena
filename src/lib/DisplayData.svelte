<!-- DataDisplay.svelte -->
<!-- <script>
    import { onMount } from 'svelte';
    
    let items;
  
    onMount(async () => {
      try {
        const response = await fetch('src/data/matches.json'); // Adjust the path as necessary
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        items = data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    });
</script> -->

<script>
  import data from '../data/matches.json';
</script>
  
<h2>Data from JSON:</h2>
<pre>{JSON.stringify(data, null, 2)}</pre>
