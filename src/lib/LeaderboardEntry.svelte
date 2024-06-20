<svelte:options customElement="leaderboard-entry"/>

<script>
    import {onMount} from 'svelte';
    import PlayerName from "./PlayerName.svelte"

    export let position
    export let name
    export let data

    let entry

    onMount(() => {
        if (position == 1){
            entry.style.backgroundColor = "#e3d462"
        } else if (position == 2){
            entry.style.backgroundColor = "#97c6d1"
        } else if (position == 3){
            entry.style.backgroundColor = "#ad8d74"
        }
    })
</script>

<div class="leaderboard-entry" bind:this={entry}>
    <p style="margin: 0; margin-right: 10px; width: 6%">{position}.</p>
    <div style="width: 100%; margin: 0">
        <PlayerName name={name}/>
    </div>
    <p style="margin: 0">{data}</p>

</div>

<style>
    .leaderboard-entry {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin-bottom: 5px;
        font-size: 17px;
        height: 30px;
        padding: 5px;
        border-radius: 5px;
    }
</style>