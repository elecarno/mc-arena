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

    export let players = {
        "example player 1": {
            "FA": 26,
            "Ne": 19
        },
        "example player 2": {
            "Sw": 16,
            "Sp": 24
        }
    }

    let classes = {
        "FA": "Flame Archer",
        "FK": "Flame Knight",
        "Gl": "Glider",
        "Ne": "Neptune",
        "Ni": "Ninja",
        "Sp": "Spy",
        "Sw": "Swift"
    }

    let playersContainer
    onMount(() => {
        for (const player in players){
            let playerEntry = document.createElement("player-entry")
            playerEntry.name = player
            playerEntry.data = players[player]
            playersContainer.appendChild(playerEntry)
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
        <!-- Winner: <PlayerName name="N/A"/> -->

        <div id="players-container" bind:this={playersContainer}></div>
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
        flex-direction: stretch;
        align-items: center;
    }

    #players-container {
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }
</style>