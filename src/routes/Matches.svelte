<script>
  import {onMount} from 'svelte';
  import data from '../data/matches.json';
  import {unixTimestampToDateTime, convertVersionString, capitalizeAndRemoveUnderscores} from '../lib/data_utils.js'
  // @ts-ignore
  import MatchDisplay from '../lib/MatchDisplay.svelte';
  const matchData = JSON.parse(JSON.stringify(data))

  let gamemodes = {
    "FFA-DM": "FFA Deathmatch",
    "PD-FFA": "Permadeath FFA"
  }

  let container;

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

      container.prepend(matchDisplay);
    }
	});
</script>

<div class="matches">
  <h1>Season 2 Matches</h1>
  <div bind:this={container}>

  </div>
</div>

<style>
  .matches {
    margin: 2rem;
  }
</style>