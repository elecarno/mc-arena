<script>
  import {onMount} from 'svelte';
  import {calculateTotalKills, calculatePlayerPoints} from '../lib/data_utils.js'
  // @ts-ignore
  import PlayerName from '../lib/PlayerName.svelte'
  // @ts-ignore
  import LeaderboardEntry from '../lib/LeaderboardEntry.svelte';
  import data from '../data/matches.json';
  import s1Data from '../data/season_1.json'
  // @ts-ignore
  const matchData = JSON.parse(JSON.stringify(data))
  // @ts-ignore
  const season1Data = JSON.parse(JSON.stringify(s1Data))

  let seasonKillsContainer
  let lifetimeKillsContainer
  let seasonPointsContainer
  let lifetimePointsContainer

  let currentChampion = "N/A"

  onMount(() => {
    let seasonKills = calculateTotalKills(matchData)
    
    let positionSeasonKills = 0
    for (const player in seasonKills) {
      positionSeasonKills += 1;
      let leaderboardEntry = document.createElement("leaderboard-entry")
      // @ts-ignore
      leaderboardEntry.position = positionSeasonKills
      // @ts-ignore
      leaderboardEntry.name = player
      // @ts-ignore
      leaderboardEntry.data = seasonKills[player]
      seasonKillsContainer.appendChild(leaderboardEntry)
    }

    let lifetimeKills = seasonKills
    for (const player in seasonKills) {
      if (season1Data[player] != undefined){
        lifetimeKills[player] += season1Data[player]
      }
    }
    for (const player in season1Data) {
      if (lifetimeKills[player] == undefined){
        lifetimeKills[player] = season1Data[player]
      }
    }
    lifetimeKills = Object.entries(lifetimeKills)
    .sort(([, a], [, b]) => b - a)
    .reduce((acc, [player, kills]) => {
        acc[player] = kills;
        return acc;
    }, {}); 

    let positionLifetimeKills = 0
    for (const player in lifetimeKills) {
      positionLifetimeKills += 1;
      let leaderboardEntry = document.createElement("leaderboard-entry")
      // @ts-ignore
      leaderboardEntry.position = positionLifetimeKills
      // @ts-ignore
      leaderboardEntry.name = player
      // @ts-ignore
      leaderboardEntry.data = lifetimeKills[player]
      lifetimeKillsContainer.appendChild(leaderboardEntry)
    }

    let seasonPoints = calculatePlayerPoints(matchData)
    let positionSeasonPoints = 0
    for (const player in seasonPoints) {
      positionSeasonPoints += 1;
      let leaderboardEntry = document.createElement("leaderboard-entry")
      // @ts-ignore
      leaderboardEntry.position = positionSeasonPoints
      // @ts-ignore
      leaderboardEntry.name = player
      // @ts-ignore
      leaderboardEntry.data = seasonPoints[player]
      seasonPointsContainer.appendChild(leaderboardEntry)

      if (positionSeasonPoints == 1){
        currentChampion = player
      }
    }
  })

</script>

<div class="leaderboards">
  <h1>Season 2 Current Champion: <PlayerName name={currentChampion}/></h1>
  <div id="board-container">
    <div class="leaderboard" bind:this={seasonKillsContainer}>
      <h3 class="title">Season 2 Kills</h3>
    </div>
    <div class="leaderboard" bind:this={seasonPointsContainer}>
      <h3 class="title">Season 2 Points</h3>
    </div>
    <div class="leaderboard" bind:this={lifetimeKillsContainer}>
      <h3 class="title">Lifetime Kills</h3>
    </div>
    <!-- <div class="leaderboard" bind:this={lifetimePointsContainer}>
      <h3 class="title">Lifetime Points</h3>
    </div> -->
  </div>
</div>


<style>
  .leaderboards {
    margin: 2rem;
  }

  #board-container {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .leaderboard {
    background-color: lightgrey;
    width: 100%;
    margin: 10px;
    padding: 10px;
    padding-left: 30px;
    padding-right: 30px;
  }

  .title {
    margin-top: 10px;
  }
</style>