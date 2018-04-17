<template>
	<div>
		<div id="app">	
		<div class="main-title">
			<h1>Add An Item</h1>
			<p>Add an item to the inventory</p>
		</div>
		<div class="form-div">
			<form class="form" v-on:submit.prevent="addItem()">
				<div class="make">
					<label for="make">Make: </label>
					<input type="text" v-model="make" name="item_make">
				</div>
				<div class="model">
					<label for="model">Model: </label>
					<input type="text" v-model="model" name="item_model">
				</div>
				<div class="description">
					<label for="description">Description: </label>
					<textarea v-model="description" name="item_description"></textarea>
				</div>
				<button class="submit-button">Submit</button>
			</form>
		</div>
	</div>
	</div>
</template>

<script>
	export default{
		name: 'AddItem',
		data(){
			return{
				make: '',
				model: '',
				description: '',
			}
		},
		methods: {
			addItem: function() {
				this.$store.dispatch('addItem', {
					make: this.make,
					model: this.model,
					description: this.description,
					checked_out: false,
					user_id: 1,
					name: ''
				});

				this.$router.push({name: 'HomePage'});
			}
		},
	}
</script>

<style scoped>
	.main-title{
		padding-top: 2.5vw;
		width: 80%;
		display: block;
		margin: 0 auto;
		text-align: center;
		font-family: Gotham, "Helvetica Neue", Helvetica, Arial, "sans-serrif";
	}

	.main-title h1{
		font-size: 3em;
		color: #002255;
		text-shadow: 2px 2px 8px rgba(197, 125, 175, .5);
		letter-spacing: .1em;
	}

	.main-title p{
		font-size: 1.5em;
		color: #002255;
		text-shadow: 2px 2px 6px rgba(197, 125, 175, .5);
	}

	.form{
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

	.form div{
		margin-top: 1em;
	}


	label{
		display: inline-block;
		width: 25%;
		text-align: right;
		font-family: Gotham, "Helvetica Neue", Helvetica, Arial, "sans-serif";
	}

	input, textarea{
		background: white;
		font: 1em Gotham, "Helvetica Neue", Helvetica, Arial, "sans-serif";
		width: 50%;
		box-sizing: border-box;
		border: 1px solid #999;
		border-radius: 4px;
	}

	textarea{
		vertical-align: top;
		height: 5vw;
	}

	input:focus{
		border-color: #c5af7d;
	}

	.add-photo img{
		width: 12.5vw;
		display: block;
		margin: 0 auto;
		margin-top: 1em;
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

	.submit-button a{
		text-decoration: none;
		color: #c5af7d;
	}

	button{
		color: #c5af7d;
	}
</style>