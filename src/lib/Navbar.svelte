<nav>
  <h1 style="margin-left: 50px; float: left">MC Arena</h1>
  <div id="nav-button-container">
    <li class="navbar-element"><a class="nav-link" href="/stats">Statistics</a></li>
    <li class="navbar-element"><a class="nav-link" href="/matches">Match History</a></li>
    <li class="navbar-element"><a class="nav-link" href="/leaderboards">Leaderboards</a></li>
    <li class="navbar-element"><a class="nav-link" href="/">Home</a></li>
  </div>
</nav>

<style>
	nav {
		background-color: gray;
		color: white;
		height: 70px;
	}

	.navbar-element {
		color: white;
		list-style: none;
		font-size: 20px;
		margin: auto;
	}

	.nav-link {
		color: white;
		text-decoration: none;
	}

	#nav-button-container {
		float: right; 
		display: flex; 
		flex-direction: row-reverse;
		width: 50%; height: 100%;
		align-items: center;
		justify-content: center;
	}
</style>
