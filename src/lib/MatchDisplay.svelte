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
    <div id="header-bar">
        {id}
    </div>
    {version}
    {timestamp}
    {length}
    {gamemode}
    {map}
    {moderator}
</div>

<style>
    .match-display {
        background-color: lightgray;
        width: 100%;
    }

    #header-bar {
        height: 30px;
        background-color: gray;
        color: white;
        padding: 5px;
        padding-left: 10px;
    }

</style>