<script>
  import data from '../data/matches.json';
  import {countKillsPerClass, averageKillsPerClassPerMatch, countClassUsage, averagePicksPerClassPerMatch, totalKillsPerMap} from '../lib/data_utils.js'
  import CompoundBarChart from "../lib/CompoundBarChart.svelte";
  import BarChart from "../lib/BarChart.svelte";
  import PieChart from "../lib/PieChart.svelte";
  const matchData = JSON.parse(JSON.stringify(data))

  export let classTotalKills = countKillsPerClass(matchData)
  export let classAvgMatchKills = averageKillsPerClassPerMatch(matchData)
  export let classTotalUsage = countClassUsage(matchData)
  export let classAvgMatchUsage = averagePicksPerClassPerMatch(matchData)
  export let mapTotalKills = totalKillsPerMap(matchData)
</script>

<div class="stats">
  <p>Use the selectors at the top of each chart to show specific data.</p>
  <h3>Kills per Class</h3>
  <CompoundBarChart totalData={classTotalKills} averageData={classAvgMatchKills}/>
  <h3>Picks per Class</h3>
  <CompoundBarChart totalData={classTotalUsage} averageData={classAvgMatchUsage}/>
  <h3>Kills per Map</h3>
  <BarChart data={mapTotalKills}/>
</div>

<style>
  .stats {
    margin: 2rem;
  }
</style>