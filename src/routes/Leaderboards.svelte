<script>
  import {onMount} from 'svelte';
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

  function calculateTotalKills(data) {
    let totalKills = {};

    for (const gameKey in data) {
        const game = data[gameKey];
        for (const player in game.players) {
            if (!totalKills[player]) {
                totalKills[player] = 0;
            }
            for (const stat in game.players[player]) {
                totalKills[player] += game.players[player][stat];
            }
        }
    }

    const sortedKills = Object.entries(totalKills)
        .sort(([, a], [, b]) => b - a)
        .reduce((acc, [player, kills]) => {
            acc[player] = kills;
            return acc;
        }, {});

    return sortedKills;
  }

  let seasonKillsContainer
  let lifetimeKillsContainer

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

    let lifetimeKills = {}
    for (const player in seasonKills) {
      lifetimeKills[player] = seasonKills[player]
      if (season1Data[player] != undefined){
        lifetimeKills[player] += season1Data[player]
      }
    }

    let positionLifetimeKills = 0
    for (const player in lifetimeKills) {
      positionLifetimeKills += 1;
      let leaderboardEntry = document.createElement("leaderboard-entry")
      // @ts-ignore
      leaderboardEntry.position = positionLifetimeKills
      // @ts-ignore
      leaderboardEntry.name = player
      // @ts-ignore
      leaderboardEntry.data = lifetimeKills[player] +
      lifetimeKillsContainer.appendChild(leaderboardEntry)
    }

  })

</script>

<div class="leaderboards">
  <div id="board-container">
    <div class="leaderboard" bind:this={seasonKillsContainer}>
      <h3>Season 2 Kills</h3>
    </div>
    <div class="leaderboard">
      <h3>Season 2 Points</h3>
    </div>
    <div class="leaderboard" bind:this={lifetimeKillsContainer}>
      <h3>Lifetime Kills</h3>
    </div>
    <div class="leaderboard">
      <h3>Lifetime Points</h3>
    </div>
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
  }
</style>