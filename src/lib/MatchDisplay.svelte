<svelte:options customElement="match-display"/>

<script>
    import PlayerName from '../lib/PlayerName.svelte'

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
    CONTENT
</div>

<style>
    .match-display {
        background-color: lightgray;
        width: 85%;
        margin-bottom: 15px;
    }

    #header-bar {
        height: 25px;
        background-color: gray;
        color: white;
        padding: 5px;
        padding-left: 10px;
        display: flex;
        flex-direction: stretch;
        align-items: center;
    }

</style>