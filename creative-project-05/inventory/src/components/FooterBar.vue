<template>
	<footer>
		<div class="footer">
			<div class="footer-info">
				<p class="author">This site was made by Kyle March</p>
				<p class="documentation">Documentation is found in the GitHub repository</p>
			</div>
			<div class="footer-content">
				<a href="https://github.com/MarchyMarch/creative-project01/tree/master" target="_blank">
					<img class="footer-content-default" src="/static/images/github-byu-tan.png" alt="GitHub">
					<img class="footer-content-hover" src="/static/images/github-white.png" alt="GitHub">
				</a>
			</div>
		</div>
	</footer>
</template>

<script>
	
</script>

<style scoped>
	/*---------------------------------------------------*/
	/*-------------------- Footer -----------------------*/
	/*---------------------------------------------------*/
	footer{
		background-color: #002255;
		height: 10vw;
	}

	.footer{
		width: 100%;
		height: 5.2vw;
		background-color: #002255;
		padding-bottom: 1vw;
	}

	.footer-info{
		margin-top: 1vw;
		display: flex;
		flex-direction: column;
		width: 75%;
		float: left;
	}

	.footer-info p{
		font-family: Gotham, "Helvetica Neue", Helvetica, Arial, "sans-serif";
		color: #c5af7d;
		display: inline-block;
		text-align: left;
		text-transform: uppercase;
		letter-spacing: .5vw;
		padding-left: 2vw;
		float: left;
	}

	.footer-content{
		width: auto;
		float: right;
		display: inline;
		list-style-type: none;
	}

	.footer-content a{
		margin-top: 2.5vw;
		line-height: 3vw;
		display: inline;
		width: 3vw;
		height: 3vw;
		text-align: center;
		vertical-align: middle;
	}

	.footer-content a:hover{

	}

	.footer-content a img{
		width: auto;
		height: 10vw;
		vertical-align: middle;
	}

	.footer-content a .footer-content-hover{
		display: none;
	}

	.footer-content a:hover .footer-content-default{
		display: none;
	}

	.footer-content a:hover .footer-content-hover{
		display: inline;
	}
</style>