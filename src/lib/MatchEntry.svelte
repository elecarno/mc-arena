<svelte:options customElement="match-entry"/>

<script>
    import PlayerName from "./PlayerName.svelte"

    export let matchId
    export let gamemode
    export let map
    export let winner
    export let date
</script>

<div class="match-entry">
    <p style="margin: 0; width: 7%; color: gray">{matchId}:</p>
    <p style="margin: 0; width: 15%">{gamemode}</p>
    <p style="margin: 0; width: 7%; color: gray">on</p>
    <p style="margin: 0; width: 15%">{map}</p>
    <div style="margin: 0; width: 20%;">
        Won by: <PlayerName name={winner}/>
    </div>
    <p style="margin: 0; width: 15%; text-align: right; font-family: 'Red Hat Mono', monospace; font-size: 13px; color: gray">{date}</p>

</div>

<style>
    .match-entry {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin-bottom: 10px;
        font-size: 14px;
        width: 85%;
        
    }
</style>