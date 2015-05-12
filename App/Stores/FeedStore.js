'use strict';

var createStore = require('flux-util').createStore;
var dispatcher = require('../../AppDispatcher');
var AppConstants = require('../Constants/AppConstants');
var _ = require('lodash');

var _feeds = [];

var store = createStore({

  setState(feeds) {
    _feeds = (feeds && feeds.slice()) || [];
  },

  getState() {
    return _feeds.slice();
  },

  dispatcherIndex: dispatcher.register((payload) => {
    var action = payload.action;

    switch(action.actionType) {
      case AppConstants.ADD_FEED:
        _feeds.push(_.omit(action.data, 'entries'));
        store.emitChange(action);
        break;
      case AppConstants.REMOVE_FEED:
        _feeds.splice(_feeds.indexOf(action.data), 1);
        store.emitChange(action);
        break;
    }

    return true;
  })
})

module.exports = store;
