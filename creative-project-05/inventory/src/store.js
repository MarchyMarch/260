import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		user: {},
		loggedIn: false,
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
			console.log("store username: " + user.username);
			axios.post("/api/users",user).then(response => {
				context.commit('setUser', response.data.user);
				context.commit('setLoggedIn',true);
				context.commit('setRegisterError',"");
				context.commit('setLoginError',"");
				this.$router.push({name: 'HomePage'});
			}).catch(error => {
				context.commit('setLoginError',"");
				context.commit('setLoggedIn',false);
				if (error.response) {
					if (error.response.status === 403)
						context.commit('setRegisterError',"That username already has an account.");
					return;
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
			axios.post("/api/users/" + context.state.user.id + "/items", item).then(response => {
				return context.dispatch('getCheckedOut');
			}).catch(error => {
				console.log("Item checkout failed: " + error);
			});
		},

		// Check out computer works for returning as well
		checkOutComputer(context, computer){
			axios.post("/api/users/" + context.state.user.id + "/computers", computers).then(response => {
				return context.dispatch('getCheckedOut');
			}).catch(error => {
				console.log("Computer checkout failed: " + error);
			});
		},
		
		// Add an item
		addItem(context, item){
			axios.post("/api/items", item).then(response => {
				return context.dispatch('getAllItems');
			}).catch(error => {
				console.log("Add item failed: " + error);
			});
		},
		// Add a computer
		addComputer(context, computer){
			axios.post("/api/computers", computer).then(response => {
				return context.dispatch('getAllComputers');
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
	}
});