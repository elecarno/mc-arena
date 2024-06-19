<script>
  import {onMount} from 'svelte';
  import data from '../data/matches.json';
  import {unixTimestampToDateTime, convertVersionString, capitalizeAndRemoveUnderscores, reorderPlayersBySum} from '../lib/data_utils.js'
  // @ts-ignore
  // @ts-ignore
  import MatchDisplay from '../lib/MatchDisplay.svelte';
  import MatchEntry from '../lib/MatchEntry.svelte';
  const matchData = JSON.parse(JSON.stringify(data))

  let gamemodes = {
    "FFA-DM": "FFA Deathmatch",
    "PD-FFA": "Permadeath FFA"
  }

  let matchesContainer
  let rundownContainer

  onMount(() => {
    for (const match in matchData){
      const matchDisplay = document.createElement('match-display');
    
      matchDisplay.id = match
      // @ts-ignore
      matchDisplay.version = convertVersionString(matchData[match]["version"])
      // @ts-ignore
      matchDisplay.timestamp = unixTimestampToDateTime(matchData[match]["timestamp"])
      // @ts-ignore
      matchDisplay.length = matchData[match]["length"]
      // @ts-ignore
      matchDisplay.gamemode = gamemodes[matchData[match]["gamemode"]]
      // @ts-ignore
      matchDisplay.map = capitalizeAndRemoveUnderscores(matchData[match]["map"])
      // @ts-ignore
      matchDisplay.moderator = matchData[match]["moderator"]
      // @ts-ignore
      matchDisplay.players = matchData[match]["players"]
      
      if (matchData[match]["rounds"] != undefined){
        // @ts-ignore
        matchDisplay.rounds = matchData[match]["rounds"]
      }

      // @ts-ignore
      if (matchDisplay.length != "N/A") {
        // @ts-ignore
        matchDisplay.length += " mins"
      }

      let rundownDisplay = document.createElement('match-entry')
      // @ts-ignore
      rundownDisplay.matchId = match
      // @ts-ignore
      rundownDisplay.date = unixTimestampToDateTime(matchData[match]["timestamp"])
      // @ts-ignore
      rundownDisplay.gamemode = gamemodes[matchData[match]["gamemode"]]
      // @ts-ignore
      rundownDisplay.map = capitalizeAndRemoveUnderscores(matchData[match]["map"])

      let reorderedPlayers = reorderPlayersBySum(matchData[match]["players"]);

      // @ts-ignore
      rundownDisplay.winner = Object.keys(reorderedPlayers)[0]

      matchesContainer.prepend(matchDisplay);
      rundownContainer.prepend(rundownDisplay)
    }
	});
</script>

<div class="matches">
  <h1>Season 2 Matches</h1>
  <p>Showing {Object.keys(matchData).length} matches played since 2024-06-17.</p>
  <div id="rundown-container" style="margin-bottom: 35px;" bind:this={rundownContainer}>
    
  </div>
  <h3>Full Match Details</h3>
  <div bind:this={matchesContainer}>

  </div>
</div>

<style>
  .matches {
    margin: 2rem;
  }
</style>