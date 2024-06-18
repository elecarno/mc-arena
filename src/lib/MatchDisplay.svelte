<svelte:options customElement="match-display"/>

<script>
    export let id = "[id]"
    export let version = "[version]"
    export let timestamp = "[timestamp]"
    export let length = "[length]"
    export let gamemode = "[gamemode]"
    export let map = "[map]"
    export let moderator = "[moderator]"
</script>

<div class="match-display">
    {id}
    {version}
    {timestamp}
    {length}
    {gamemode}
    {map}
    {moderator}
</div>

<style>
    .match-display {
        background-color: gray;
        width: 100%;
    }
</style>