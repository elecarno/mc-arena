<svelte:options customElement="leaderboard-entry"/>

<script>
    import PlayerName from "./PlayerName.svelte"

    export let position
    export let name
    export let data
</script>

<div class="leaderboard-entry">
    <p style="margin: 0; margin-right: 10px;">{position}.</p>
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
        margin-bottom: 10px;
        font-size: 17px;
    }
</style>