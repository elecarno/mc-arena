<svelte:options customElement="player-entry"/>

<script>
    import {onMount} from 'svelte';
    export let name
    export let data
    
    let container

    onMount(() => {
        for (const classSelected in data){
            let p = document.createElement("p")
            p.textContent = classSelected + ": " + data[classSelected]
            p.style.paddingLeft = "20px"
            p.style.margin = "0"
            container.appendChild(p)
        }
    })
</script>

<div class="playerentry" bind:this={container}>
  <p class="playername" style="width: 10%; margin: 0">{name}</p>  
</div>

<style>
    .playerentry {
        background-color: lightgray;
        color: black;
        width: 100%;
        padding-bottom: 4px;
        display: flex;
        flex-direction: stretch;
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
</style>