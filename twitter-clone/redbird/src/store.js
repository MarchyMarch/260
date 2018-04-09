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
    feed: [],
    userView: [],
    feedView: [],
    following: [],
    followers: [],
  },
  getters: {
  	user: state => state.user,
    loggedIn: state => state.loggedIn,
    loginError: state => state.loginError,
    registerError: state => state.registerError,
    feed: state => state.feed,
    feedView: state => state.feedView,
    userView: state => state.userView,
    following: state => state.following,
    followers: state => state.followers,
    isFollowing: state => (id) => {
      return state.following.reduce((val,item) => {
       if (item.id === id)
         return true;
       else
         return val;
      },false);
    },
  },
  mutations: {
  	setUser (state, user) {
      state.user = user;
    },
    setLogin (state, status) {
      state.loggedIn = status;
    },
    setLoginError (state, message) {
      state.loginError = message;
    },
    setRegisterError (state, message) {
      state.registerError = message;
    },
    setFeed (state, feed) {
      state.feed = feed;
    },
    setUserView (state, user) {
      state.userView = user;
    },
    setFeedView (state, feed) {
      state.feedView = feed;
    },
    setFollowing (state, following) {
      state.following = following;
    },
    setFollowers (state, followers) {
      state.followers = followers;
    },
  },
  actions: {
    doHashTagSearch(context,hashtag) {
      axios.get("/api/tweets/hash/" + hashtag).then(response => {
  context.commit('setFeed',response.data.tweets);
      }).catch(err => {
  console.log("doHashTagSearch failed:",err);
      });
    },
  	// Registration, Login //
    register(context,user) {
      axios.post("/api/users",user).then(response => {
	context.commit('setUser', response.data.user);
	context.commit('setLogin',true);
	context.commit('setRegisterError',"");
	context.commit('setLoginError',"");
      }).catch(error => {
	context.commit('setLoginError',"");
	context.commit('setLogin',false);
	if (error.response) {
	  if (error.response.status === 403)
	    context.commit('setRegisterError',"That email address already has an account.");
	  else if (error.response.status === 409)
	    context.commit('setRegisterError',"That user name is already taken.");
	  return;
	}
	context.commit('setRegisterError',"Sorry, your request failed. We will look into it.");
      });
    },

    login(context,user) {
      axios.post("/api/login",user).then(response => {
	context.commit('setUser', response.data.user);
	context.commit('setLogin',true);
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
    // Logout
    logout(context,user) {
      context.commit('setUser', {});
      context.commit('setLogin',false);
    },

     // Tweeting //
    getFeed(context) {
      axios.get("/api/users/" + context.state.user.id + "/tweets").then(response => {
	context.commit('setFeed',response.data.tweets);
      }).catch(err => {
	console.log("getFeed failed:",err);
      });
    },

    addTweet(context,tweet) {
      	axios.post("/api/users/" + context.state.user.id + "/tweets",tweet).then(response => {
			return context.dispatch('getFeed');
      	}).catch(err => {
				console.log("addTweet failed:",err);
      	});
    },

    doSearch(context,keywords) {
      axios.get("/api/tweets/search?keywords=" + keywords).then(response => {
       context.commit('setFeed',response.data.tweets);
      }).catch(err => {
       console.log("doSearch failed:",err);
      });
    },

    // Users //
    // get a user, must supply {username: username} of user you want to get
    getUser(context,user) {
      return axios.get("/api/users/" + user.id).then(response => {
  context.commit('setUserView',response.data.user);
      }).catch(err => {
  console.log("getUser failed:",err);
      });
    },

    // get tweets of a user, must supply {id:id} of user you want to get tweets for
    getUserTweets(context,user) {
      return axios.get("/api/users/" + user.id + "/tweets").then(response => {
  context.commit('setFeedView',response.data.tweets);
      }).catch(err => {
  console.log("getUserTweets failed:",err);
      });
    },

    // get list of people you are following
    getFollowing(context) {
      return axios.get("/api/users/" + context.state.user.id + "/follow").then(response => {
  context.commit('setFollowing',response.data.users); 
      }).catch(err => {
  console.log("following failed:",err);
      });
    },

    // get list of people who are following you
    getFollowers(context) {
      return axios.get("/api/users/" + context.state.user.id + "/followers").then(response => {
  context.commit('setFollowers',response.data.users);
      }).catch(err => {
  console.log("following failed:",err);
      });
    },

    // follow someone, must supply {id: id} of user you want to follow
    follow(context,user) {
      return axios.post("/api/users/" + context.state.user.id + "/follow",user).then(response => {
       context.dispatch('getFollowing');
      }).catch(err => {
       console.log("follow failed:",err);
      });
    },

    // unfollow someone, must supply {id: id} of user you want to unfollow
    unfollow(context,user) {
      return axios.delete("/api/users/" + context.state.user.id + "/follow/" + user.id).then(response => {
       context.dispatch('getFollowing');
      }).catch(err => {
       console.log("unfollow failed:",err);
      });
    },

    // get tweets of people you follow
    getFeed(context) {
      return axios.get("/api/users/" + context.state.user.id + "/feed").then(response => {
  context.commit('setFeed',response.data.tweets);
      }).catch(err => {
  console.log("getFeed failed:",err);
      });
    },

  }
});