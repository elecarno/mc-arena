<script>
  import {onMount} from 'svelte';
  import {calculateTotalKills, calculatePlayerPoints, countTotalKills} from '../lib/data_utils.js'
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

  export let totalKills = countTotalKills(data)
  export let seasonKills = countTotalKills(data)
  
  onMount(() => {
    for (const player in season1Data){
      totalKills += season1Data[player]
    }

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
  <h2>Welcome to the MC Arena Database.</h2>
  <div id="killboards">
    <div class="killboard">
      <h1>{totalKills}</h1>
      <p>Total Kills</p>
    </div>
    <div class="killboard">
      <h1>{seasonKills}</h1>
      <p>Kills This Season</p>
    </div>
    <div class="killboard">
      <h1>{Object.keys(matchData).length}</h1>
      <p>Matches This Season</p>
    </div>
  </div>

  <h3>Season 2 Current Champion: <PlayerName name={currentChampion}/></h3>
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
    width: 85%;
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
    border-radius: 15px;
  }

  .title {
    margin-top: 10px;
  }

  #killboards {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .killboard {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .killboard h1 {
    margin: 0;
    font-size: 50px;
  }

  .killboard p {
    margin: 0;
    margin-top: 5px;
  }
</style>