<template>
	<div>
	<div class="main-container">
		<div class="main-title">
			<h1>CSR Inventory System</h1>
			<P>This is the inventory system for the College of Fine Arts and communications run through the CSRs.  It keeps track of loaner computers as well as cables and converters that are available to be used.</P>
			<img src="static/images/HFAC_Exterior_2.jpg">
		</div>
	</div>
	</div>
</template>

<script>
	export default{
		name: 'WelcomePage',
		data() {
			return {
			}
		},
		computed: {
		},
		methods:{

		},
	}
</script>

<style scoped>
	body{
		background: #fffff0;
	}

	/*--------------------------------------*/
	/*-------------- Main ------------------*/
	/*--------------------------------------*/

	.main-title{
		background:#fffff0;
		width: 100%;
		position: relative;
		overflow: hidden;
		display: block;
		margin: 0 auto;
		font-family: Gotham, "Helvetica Neue", Helvetica, Arial, "sans-serrif";
		text-align: center;
		padding-top: 3vw;
	}

	.main-title h1{
		position: relative;
		text-align: center;
		font-size: 3em;
		letter-spacing: .1em;
		color: #002255;
		text-shadow: 2px 2px 8px rgba(197, 125, 175, .5);
	}

	.main-title p{
		position: relative;
		text-align: center;
		font-size: 1.5em;
		margin: 0 5vw;
		padding-top: 1.5em;
		padding-right: 10vw;
		padding-left: 10vw;
		margin-bottom: 5vw;
		color: #002255;
		text-shadow: 2px 2px 6px rgba(197, 125, 175, .5);
	}

	.main-title img{
		width: 70vw;
		margin-bottom: 5vw;
	}
</style>