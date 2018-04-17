<template>
	<nav class="nav-bar">
		<div class="nav-logo">
			<router-link to="/"><img src="/static/images/logo-64.jpg" id="logo"></router-link>	
		</div>
		<ul id="menu">
			<li class="right" v-if="loggedIn"><a @click="logout" href="#">Logout</a></li>
			<li class="right" id="username" v-if="loggedIn">{{user.username}}</li>
			<div v-else class="center">
				<div class="right">
				<form class="right" v-on:submit.prevent="login">
					<input v-model="username" placeholder="Username">
					<input v-model="password" type="password" placeholder="Password">
					<button class="submit-button" type="submit">Login</button>
				</form>
				<button class="submit-button" v-on:click="register()">Register</button>
				</div>
			</div>
		</ul>
		<div class="flexWrapper errorPlace">
			<p v-if="loginError" class="flexRight error">{{loginError}}</p>
		</div>
	</nav>
</template>

<script>
	export default{
		name: 'NavBar',
		data(){
			return{
				username: '',
				password: '',
			}
		},
		computed: {
			user: function() {
				return this.$store.getters.user;
			},
			loggedIn: function(){
				return this.$store.getters.loggedIn;
			},
			loginError: function(){
				return this.$store.getters.loginError;
			},
		},
		methods: {
			login: function(){
				this.$store.dispatch('login', {
					username: this.username,
					password: this.password,
				}).then(user => {
					this.username = '';
					this.password = '';
				});
			},
			logout: function(){
				this.$store.dispatch('logout');
			},
			register: function(){
				this.$router.push({name: 'Register'});
			}
		}
	}
</script>

<style scoped>
	#logo{
		height: 64px;
		vertical-align: middle;
		float: left;
		padding-top: 12px;
		margin-bottom: 12px;
		margin-left: 16px;
	}

	.nav-bar{
		background-color: #002255;
		height: 88px;
		display: block;
		float: none;
		overflow: hidden;
	}

	.nav-bar ul{
		vertical-align: middle;
	}

	.right{
		display: flex;
		float: right;
		padding-right: .5vw;
		background: #002255;
	}

	.center{
		padding-top: 12px;
	}

	.right a{
		width: 100%;
		display: block;
		margin: 0 auto;
		margin-right: 1vw;
		margin-top: .5vw;
		padding-top: .5em;
		padding-bottom: .5em;
		text-align: center;
		padding-right: .4vw;
		padding-left: .4vw;
		background: #002255;
		border: 2px solid #c5af7d;
		text-decoration: none;
		color: #c5af7d;
	}

	.right a:hover{
		background-color: rgb(75, 131, 218);
		border-bottom: 1px solid #c5af7d;
	}

	#username{
		color: #c5af7d;
		margin-right: 1vw;
		margin-top: 1vw;
	}

	.right input{
		margin: 0px 8px;
	}

	.right button{
		margin: 0px 8px;
	}

	.submit-button{
		width: 25%;
		display: block;
		margin: 0 auto;
		margin-top: 1em;
		padding-top: .5em;
		padding-bottom: .5em;
		text-align: center;
		background: #002255;
		border: 2px solid #c5af7d
	}

	.submit-button{
		text-decoration: none;
		color: #c5af7d;
	}
</style>