import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		user: {},
		loggedIn: false,
		user_id: 0,
		loginError: '',
		registerError: '',
		checkedOutItems: [],
		checkedOutComputers: [],
		availableItems: [],
		availableComputers: [],
	},
	getters: {
		user: state => state.user,
		loggedIn: state => state.loggedIn,
		loginError: state => state.loginError,
		registerError: state=> state.registerError,
		checkedOutItems: state => state.checkedOutItems,
		checkedOutComputers: state => state.checkedOutComputers,
		availableItems: state => state.availableItems,
		availableComputers: state => state.availableComputers,
	},
	mutations: {
		setUser(state, user){
			state.user = user;
		},
		setLoggedIn(state, loggedIn){
			state.loggedIn = loggedIn;
		},
		setRegisterError(state, registerError){
			state.registerError = registerError;
		},
		setcheckedOutItems(state, checkedOutItems){
			state.checkedOutItems = checkedOutItems;
		},
		setCheckedOutComputers(state, checkedOutComputers){
			state.checkedOutComputers = checkedOutComputers;
		},
		setavailableItems(state, availableItems){
			state.availableItems = availableItems;
		},
		setAvailableComputers(state, availableComputers){
			state.availableComputers = availableComputers;
		},
		setLoginError(state, loginError){
			state.loginError = loginError;
		},
	},
	actions: {
		// Register a user
		register(context,user) {
			axios.post("/api/users",user).then(response => {
				context.commit('setUser', response.data.user);
				context.commit('setLoggedIn',true);
				context.commit('setRegisterError',"");
				context.commit('setLoginError',"");
				return true;
			}).catch(error => {
				context.commit('setLoginError',"");
				context.commit('setLoggedIn',false);
				if (error.response) {
					if (error.response.status === 403)
						context.commit('setRegisterError',"That username already has an account.");
					return false;
				}
				context.commit('setRegisterError',"Sorry, your request failed. We will look into it.");
			});
		},

		// Login
		login(context,user) {
			axios.post("/api/login",user).then(response => {
				context.commit('setUser', response.data.user);
				context.commit('setLoggedIn',true);
				context.commit('setRegisterError',"");
				context.commit('setLoginError',"");
			}).catch(error => {
				context.commit('setRegisterError',"");
				if (error.response) {
					if (error.response.status === 403 || error.response.status === 400)
						context.commit('setLoginError',"Invalid login.");
						context.commit('setRegisterError',"");
					return;
				}
				context.commit('setLoginError',"Sorry, your request failed. We will look into it.");
			});
		},

		// Log out
		logout(context, user){
			context.commit('setUser', {});
			context.commit('setLoggedIn', false);
		},

		// get checked out for user
		getCheckedOut(context){
			if(context.state.user.admin){
				// implement admin functionality
			}
			else{
				axios.get("/api/users/" + context.state.user.id + "/items").then(response => {
					context.commit('setcheckedOutItems', response.data.items);
				}).catch(error => {
					console.log("get checkedOutItems failed: " + error);
				});

				axios.get("/api/users/" + context.state.user.id + "/computers").then(response => {
					context.commit('setCheckedOutComputers', response.data.computers);
				}).catch(error => {
					console.log("get checkedOutComputers failed: " + error);
				});
			}
		},

		// Check out item works for returning as well
		checkOutItem(context, item){
			axios.post("/api/users/" + context.state.user.id + "/items/" + item.id, item).then(response => {
				context.commit('setcheckedOutItems', response.data.items);
				context.dispatch('getAvailableItems');
				return;
			}).catch(error => {
				console.log("Item checkout failed: " + error);
			});
		},

		// Check out computer works for returning as well
		checkOutComputer(context, computer){
			axios.post("/api/users/" + context.state.user.id + "/computers", computer).then(response => {
				context.commit('setCheckedOutComputers', response.data.computers);
				context.dispatch('getAvailableComputers');
				return;
			}).catch(error => {
				console.log("Computer checkout failed: " + error);
			});
		},

		// Return an item
		returnItem(context, item){
			axios.post("/api/users/" + context.state.user.id + "/items/" + item.id + "/return", item).then(response => {
				context.commit('setavailableItems', response.data.items);
				context.dispatch('getCheckedOut');
				return;
			}).catch(error => {
				console.log("Item checkout failed: " + error);
			});

		},

		// Return a computer
		returnComputer(context, computer){
			axios.post("/api/users/" + context.state.user.id + "/computers/return", computer).then(response => {
				context.commit('setAvailableComputers', response.data.computers);
				context.dispatch('getCheckedOut');
				return;
			}).catch(error => {
				console.log("Computer checkout failed: " + error);
			});
		},
		
		// Add an item
		addItem(context, item){
			axios.post("/api/items", item).then(response => {
				return context.dispatch('getAvailableItems');
			}).catch(error => {
				console.log("Add item failed: " + error);
			});
		},
		// Add a computer
		addComputer(context, computer){
			axios.post("/api/computers", computer).then(response => {
				return context.dispatch('getAvailableComputers');
			}).catch(error => {
				console.log("Add computer failed: " + error);
			});
		},
		// Get all available items
		getAvailableItems(context){
			axios.get("/api/items").then(response => {
				context.commit('setavailableItems', response.data.items);
			}).catch(error => {
				console.log("error in getting items: " + error);
			});
		},
		// Get all available computers
		getAvailableComputers(context){
			axios.get("/api/computers").then(response => {
				context.commit('setAvailableComputers', response.data.computers);
			}).catch(error => {
				console.log("error in getting computers: " + computers);
			});
		},
		// Delete item
		deleteItem(context,item){
			axios.delete("/api/items/" + item.id).then(response =>{
				context.dispatch('getCheckedOut');
				context.dispatch('getAvailableItems');
			}).catch(error =>{
				console.log("Error deleting item: " + error);
			});
		},
		// Delete computer
		deleteComputer(context,computer){
			axios.delete("/api/computers/" + computer.id).then(response =>{
				context.dispatch('getCheckedOut');
				context.dispatch('getAvailableComputers');
			}).catch(error => {
				console.log("Error deleting Computer: " + error);
			});
		}
	}
});