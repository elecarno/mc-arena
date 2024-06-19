<svelte:options customElement="player-entry"/>

<script>
    import {onMount} from 'svelte';
    import {classes, pointsDistribution} from '../lib/data_utils.js'
    export let name
    export let data
    export let position = 0
    export let totalKills = 0
    export let points = 1

    if (pointsDistribution[position] != undefined) {
        points = pointsDistribution[position]
    } 
    
    let container

    onMount(() => {
        for (const classSelected in data){
            let p = document.createElement("p")
            p.textContent = classes[classSelected] + ": " + data[classSelected]
            p.style.paddingLeft = "20px"
            p.style.margin = "0"
            container.appendChild(p)

            totalKills += data[classSelected]
        }
    })
</script>

<div class="playerentry">
    <div class="playerentry" style="width: 30%" >
        <p style="width: 5%; margin:0; margin-right: 10px">{position}.</p>
        <p class="playername" style="width: 50%; margin: 0">{name}</p>
        <p class="total" style="width: 20%; margin: 0; margin-left: 10px">{totalKills}</p>
    </div>
    <div class="playerentry" style="width: 100%" bind:this={container}>

    </div>
    <p class="total" style="float: right; width: 5%; margin: 0; margin-left: 10px">{points}</p>
</div>

<style>
    .playerentry {
        background-color: lightgray;
        color: black;
        width: 100%;
        padding-bottom: 4px;
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .playername {
        background-color: #555555;
        color: white;
        font-family: "Red Hat Mono", monospace;
        font-size: 14px;
        padding-left: 3px;
        padding-right: 3px;
        border-radius: 4px;
    }

    .total {
        background-color: #555555;
        color: white;
        font-family: "Red Hat Mono", monospace;
        font-size: 14px;
        text-align: center;
        padding-left: 3px;
        padding-right: 3px;
        border-radius: 4px;
    }
</style>