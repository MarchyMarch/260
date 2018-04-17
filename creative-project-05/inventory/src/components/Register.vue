<template>
	<div>
		<div class="login-text">
			<h1>Register</h1>
			<p>Please fill out all boxes.</p>
		</div>
		<form class="login-form" v-on:submit.prevent="register">
			<div class="login-container">
				<div>
					<label>Username</label>
					<input type="text" v-model="username" placeholder="Enter Username">
				</div>
				<div>
					<label>Name</label>
					<input type="text" v-model="name" placeholder="Enter Full Name">
				</div>
				<div>
					<label>Email</label>
					<input type="text" v-model="email" placeholder="Enter Email">
				</div>
				<div>
					<label>Password</label>
					<input type="password" v-model="password" placeholder="Enter Password">
				</div>
			</div>
			<div class="login-button">
				<button type="submit">Register</button>
			</div>
		</form>
		<p class="error">{{registerError}}</p>
	</div>
</template>

<script>
	export default{
		name: 'Register',
		data(){
			return{
				username: '',
				name: '',
				email: '',
				password: '',
			}
		},
		computed:{
			registerError: function(){
				return this.$store.getters.registerError;
			},	
		},
		methods:{
			register: function(){
				console.log("username: " + this.username);
				this.$store.dispatch('register',{
					username: this.username,
					name: this.name,
					email: this.email,
					password: this.password,
				});
			},
		},
	}
</script>

<style scoped>
	.login-text{
		padding-top: 2.5vw;
		width: 80%;
		display: block;
		margin: 0 auto;
		text-align: center;
		font-family: Gotham, "Helvetica Neue", Helvetica, Arial, "sans-serrif";
	}

	.login-text h1{
		font-size: 3em;
		color: #002255;
		text-shadow: 2px 2px 8px rgba(197, 125, 175, .5);
		letter-spacing: .1em;
	}

	.login-text p{
		font-size: 1.5em;
		color: #002255;
		text-shadow: 2px 2px 6px rgba(197, 125, 175, .5);
	}

	.login-form{
		margin: 0 auto;
		margin-top: 2.5em;
		width: 30%;
		position: relative;
		overflow: hidden;
		padding: 1em;
		border: 1px solid #CCC;
		border-radius: 1em;
		margin-bottom: 5em;
	}

	.login-container div{
		margin-top: 1em;
	}

	label{
		display: inline-block;
		width: 25%;
		text-align: right;
		font-family: Gotham, "Helvetica Neue", Helvetica, Arial, "sans-serif";
	}

	input{
		font: 1em Gotham, "Helvetica Neue", Helvetica, Arial, "sans-serif";
		width: 50%;
		box-sizing: border-box;
		border: 1px solid #999;
		border-radius: 4px;
	}

	input:focus{
		border-color: #c5af7d;
	}

	.login-button{
		width: 25%;
		display: block;
		margin: 0 auto;
		margin-top: 1em;
		padding-top: .5em;
		padding-bottom: .5em;
		text-align: center;
		background: #002255;
		border: 2px solid #c5af7d;
	}

	.login-button a{
		text-decoration: none;
		color: #c5af7d;
	}

	.error{
		text-align: center;
		font-size: 4vw;
		color: red;
	}
</style>