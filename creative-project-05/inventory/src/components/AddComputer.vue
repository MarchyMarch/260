<template>
	<div>
		<div class="main-title">
			<h1>Add A Computer</h1>
			<p>Add a computer to the inventory</p>
		</div>
		<div class="form-div">
			<form class="form" v-on:submit.prevent="addComputer()">
				<div class="make">
					<label for="make">Make: </label>
					<input type="text" v-model="make" name="item_make">
				</div>
				<div class="model">
					<label for="model">Model: </label>
					<input type="text" v-model="model" name="item_model">
				</div>
				<div class="opp-sys">
					<label for="os">OS: </label>
					<input type="text" v-model="os" name="item_os">
				</div>
				<div class="screen-size">
					<label for="screen">Screen Size: </label>
					<input type="text" v-model="screen_size" name="item_scrn_size">
				</div>
				<div class="processor-div">
					<label for="processor">Processor: </label>
					<input type="text" v-model="processor" name="item_processor">
				</div>
				<div class="ram-div">
					<label for="ram">RAM: </label>
					<select v-model="ram" class="ram-select">
						<option v-for="option in ramOptions" v-bind:value="option.value">{{option.label}}</option>
					</select>
				</div>
				<div class="hdd-div">
					<label for="storageSize">Storage Size: </label>
					<select v-model="hdd">
						<option v-for="option in sizeOptions" v-bind:value="option.value">{{option.label}}</option>
					</select>
					<label for="type">Type: </label>
					<select v-model="hdd_type">
						<option v-for="type in typeOptions" v-bind:value="type.value">{{type.label}}</option>
					</select>
				</div>
				<div class="graphics-dic">
					<label for="graphics">Graphics Card: </label>
					<input type="textarea" v-model="graphics" name="item_graphics">
				</div>
				<div class="description">
					<label for="description">Description: </label>
					<textarea v-model="description" name="item_description"></textarea>
				</div>
				<!-- <div class="add-photo">
					<label for="photo">Add Photo:</label>
					<input type="file" id="photo" name="item_photo" accept="image/*">
					<button class="add-photo-button">Choose File</button>
					<img src="../images/default-placeholder.png" alt="gray-photo">
				</div> -->
				<button class="submit-button">Submit</button>
			</form>
		</div>
	</div>
</template>

<script>
	export default{
		name: 'AddComputer',
		data(){
			return{
				make: '',
				model: '',
				os: '',
				screen_size: '',
				processor: '',
				ram: '',
				hdd: '',
				hdd_type: '',
				graphics: '',
				description: '',
				ramOptions: [
					{id: "2", label: "2 GB", value: "2 GB"},
					{id: "4", label: "4 GB", value: "4 GB"},
					{id: "8", label: "8 GB", value: "8 GB"},
					{id: "16", label: "16 GB", value: "16 GB"}
				],
				sizeOptions: [
					{id: "128", label: "128 GB", value: "128"},
					{id: "256", label: "256 GB", value: "256"},
					{id: "500", label: "500 GB", value: "500"},
					{id: "750", label: "750 GB", value: "750"},
					{id: "1000", label: "1 TB", value: "1000"}
				],
				typeOptions: [
					{id: "hdd", label: "HDD", value: "HDD"},
					{id: "ssd", label: "SSD", value: "SSD"}
				],
			}
		},
		methods:{
			addComputer: function(){
				this.$store.dispatch('addComputer', {
					make: this.make,
					model: this.model,
					os: this.os,
					screen_size: this.screen_size,
					processor: this.processor,
					ram: this.ram,
					hdd: this.hdd,
					hdd_type: this.hdd_type,
					graphics: this.graphics,
					description: this.description,
					checked_out: false,
					user_id: 1,
					name: ''
				});

				this.$router.push({name: 'HomePage'});
			},
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