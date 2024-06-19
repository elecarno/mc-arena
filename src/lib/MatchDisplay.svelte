<svelte:options customElement="match-display"/>

<script>
    import {onMount} from 'svelte';
    import PlayerName from '../lib/PlayerName.svelte'
    import PlayerEntry from './PlayerEntry.svelte';

    export let id = "[id]"
    export let version = "[version]"
    export let timestamp = "[timestamp]"
    export let length = "[length]"
    export let gamemode = "[gamemode]"
    export let map = "[map]"
    export let moderator = "[moderator]"
    export let winner = "[winner]"

    export let players = {
        "example_player_1": {
            "FA": 26,
            "Ne": 19
        },
        "example_player_2": {
            "Sw": 16,
            "Sp": 24
        }
    }

    export let rounds = undefined

    function reorderPlayersBySum(players) {
        // Convert the players object to an array of [name, data] pairs
        let playersArray = Object.entries(players);

        // Calculate the sum of values for each player
        playersArray.forEach(player => {
            let sum = Object.values(player[1]).reduce((acc, val) => acc + val, 0);
            player.push(sum);  // Add the sum to the player's array entry
        });

        // Sort the array based on the sum
        playersArray.sort((a, b) => b[2] - a[2]);

        // Convert the array back to an object, without the sum
        let orderedPlayers = {};
        playersArray.forEach(player => {
            orderedPlayers[player[0]] = player[1];
        });

        return orderedPlayers;
    }

    function getMostFrequentName(rounds) {
        // Create an object to store the count of each name
        let countMap = {};

        // Iterate over the rounds array and count occurrences
        rounds.forEach(name => {
            countMap[name] = (countMap[name] || 0) + 1;
        });

        // Determine the name with the highest count
        let mostFrequentName = null;
        let maxCount = 0;

        for (let name in countMap) {
            if (countMap[name] > maxCount) {
                maxCount = countMap[name];
                mostFrequentName = name;
            }
        }

        return mostFrequentName;
    }

    let reorderedPlayers = reorderPlayersBySum(players);
    let position = 0

    let playersContainer
    let roundsContainer
    let roundsSegment
    onMount(() => {
        for (const player in reorderedPlayers){
            position += 1
            let playerEntry = document.createElement("player-entry")
            playerEntry.name = player
            playerEntry.data = players[player]
            playerEntry.position = position
            playersContainer.appendChild(playerEntry)

            if (position == 1 && rounds == undefined){
                winner = player
                roundsSegment.style.display = "none"
            }

            if (rounds != undefined){
                winner = getMostFrequentName(rounds)
            }
        }

        if (rounds != undefined){
            for (let round  = 0; round < rounds.length; round++) {
                let playername = document.createElement("player-name")
                let p = document.createElement("p")
                let div = document.createElement("div")
                div.style.display = "flex"
                div.style.flexDirection = "row"
                div.style.justifyContent = "left"
                div.style.alignItems = "center"
                div.style.marginBottom = "10px"
                div.style.fontSize = "14px"
                p.style.margin = "0"
                p.style.marginRight = "10px"
                p.textContent = (round + 1) + "."
                playername.name = rounds[round]
                div.appendChild(p)
                div.appendChild(playername)
                roundsContainer.appendChild(div)
            }
        }

    })

</script>

<div class="match-display">
    <div class="header-bar">
        <div style="width: 50%">
            {id} • {version}
        </div>
        <div style="width: 50%; font-size: 14px">
            {gamemode}
        </div>
        <div style="width: 50%; font-size: 14px">
            {map}
        </div>
        <div style="width: 40%; font-size: 13px">
            M: <PlayerName name={moderator}/> 
        </div>
        <div style="width: 50%;">
            <p style="font-size: 13px;">{timestamp} ({length})</p>
        </div>
    </div>
    <div style="padding: 15px;">
        <div id="winner-tag"><p style="margin: 0; margin-right: 10px">Won by:</p> <PlayerName name={winner}/></div>
        <div class="horiz-separator"></div>

        <div style="display: flex; flex-direction: row; justify-content: center; align-items: center; color: #444444; font-size: 14px">
            <p style="width: 3%"></p>
            <p style="width: 19%">Username</p>
            <p style="width: 11%">Kills</p>
            <p style="width: 100%">(per Class)</p>
            <p style="width: 5%">pts.</p>
        </div>
        <div id="players-container" bind:this={playersContainer}></div>

        <div id="rounds-segment" bind:this={roundsSegment}>
            <div class="horiz-separator" style="border-color: #AAAAAA; margin-top: 15px"></div>
            <p style="font-size: 14px; color: #444444; margin-left: 20px"> Rounds</p>
            <div id="rounds-container" style="margin-left: 20px"bind:this={roundsContainer}></div>
        </div>
    </div>
</div>

<style>
    .match-display {
        background-color: lightgray;
        width: 85%;
        margin-bottom: 15px;
    }

    .header-bar {
        height: 25px;
        background-color: gray;
        color: white;
        padding: 5px;
        padding-left: 10px;
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    #players-container {
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }

    #winner-tag {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 100%;
        margin-bottom: 10px;
    }

    .horiz-separator {
        width: 55%;
        border: solid 2px gray;
        margin: 0 auto;
    }
</style>