'use strict';

var createStore = require('flux-util').createStore;
var dispatcher = require('../../AppDispatcher');
var AppConstants = require('../Constants/AppConstants');
var FeedStore = require('./FeedStore');

var React = require('react-native');
var {
  AsyncStorage,
  AlertIOS,
} = React;

var KEY = '@FeedList';

var store = createStore({
  bootstrap(complete) {
    AsyncStorage.getItem(KEY, (error, feeds) => {
      if (error) {
        console.log('Error getting profile from local storage! ' + error.message);
        AlertIOS.alert('error');
        complete();
      } else {
        FeedStore.setState(JSON.parse(feeds));
        complete();
      }
    })
  },

  dispatcherIndex: dispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.actionType) {
      case AppConstants.ADD_FEED:
        var feeds = FeedStore.getState();
        AsyncStorage.setItem(KEY, JSON.stringify(feeds), (error) => {
          store.emitChange(action);
        });
        break;
    }

    return true;
  })
})

module.exports = store;
