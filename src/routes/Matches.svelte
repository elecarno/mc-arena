<script>
  import {onMount} from 'svelte';
  import data from '../data/matches.json';
  const matchData = JSON.parse(JSON.stringify(data))

  let gamemodes = {
    "FFA-DM": "FFA Deathmatch",
    "PD-FFA": "Permadeath FFA"
  }

  let container;

  onMount(() => {
    for (const match in matchData){
      const matchDisplay = document.createElement('match-display');
      matchDisplay.id = convertMatchString(match)
      matchDisplay.version = convertVersionString(matchData[match]["version"])
      matchDisplay.timestamp = unixTimestampToDateTime(matchData[match]["timestamp"])
      matchDisplay.length = matchData[match]["length"]
      matchDisplay.gamemode = gamemodes[matchData[match]["gamemode"]]
      matchDisplay.map = capitalizeAndRemoveUnderscores(matchData[match]["map"])
      matchDisplay.moderator = matchData[match]["moderator"]

      if (matchDisplay.length != "N/A") {
        matchDisplay.length += " mins"
      }

      container.appendChild(matchDisplay);
    }
	});

  function unixTimestampToDateTime(timestamp) {
    // Convert Unix timestamp to milliseconds
    const milliseconds = timestamp * 1000;

    // Create a new Date object
    const dateObject = new Date(milliseconds);

    // Extract date components
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so add 1
    const day = dateObject.getDate().toString().padStart(2, '0'); // Get day of the month and pad with leading zero if needed

    // Extract time components
    const hours = dateObject.getHours().toString().padStart(2, '0'); // Get hours (0-23) and pad with leading zero if needed
    const minutes = dateObject.getMinutes().toString().padStart(2, '0'); // Get minutes (0-59) and pad with leading zero if needed

    // Return formatted datetime string
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }

  function convertVersionString(input) {
    let result = '';

    // Check for 'a' (Alpha) in the input string
    if (input.includes('a')) {
      result += 'Alpha ';
    }

    // Parse the version number (e.g., "2.1")
    const versionNumber = input.replace(/^a-/, '').replace(/-dev$/, '');

    // Append the version number
    result += versionNumber;

    // Check for 'dev' (Development) in the input string
    if (input.includes('dev')) {
      result += ' (dev)';
    }

    return result;
  }

  function convertMatchString(input) {
    // Split the input string into parts using "-"
    const parts = input.split('-');

    // Extract season and match numbers
    const season = parts[0].toUpperCase().replace('s', 'S');
    const match = parts[1];

    // Construct the output string
    const result = `${season}, Match ${match}`;

    return result;
  }

  function capitalizeAndRemoveUnderscores(input) {
    // Split the input string by underscores and capitalize each word
    const words = input.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());

    // Join the capitalized words with a space
    const result = words.join(' ');

    return result;
  }

</script>

<style>
  .about {
    margin: 2rem;
  }
</style>

<div class="about" bind:this={container}>
  <h1>Season 2 Matches</h1>
</div>