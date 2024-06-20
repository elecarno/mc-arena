<script>
	import { Router, Route, Link } from 'svelte-routing';
	import Home from './routes/Home.svelte';
	import Navbar from './lib/Navbar.svelte';
    import Matches from './routes/Matches.svelte';
    import Statistics from './routes/Statistics.svelte';
</script>

<Navbar/>
<div class="app">
	<Router>
		<Route path="/" component={Home}/>
		<Route path="/matches" component={Matches}/>
		<Route path="/stats" component={Statistics}/>
	</Router>
</div>
<footer>
	<p>MC Arena by github.com/elecarno, <a href="https://discord.gg/dvNcM2zK8Q">join the discord to play</a> </p>
</footer>

<style>
  .app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	/* main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	} */

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}
</style>
