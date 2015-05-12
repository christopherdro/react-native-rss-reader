var dispatcher = require('../../AppDispatcher');
var AppConstants = require('../Constants/AppConstants');

module.exports = {
  addFeed(feed) {
    dispatcher.handleViewAction({
      actionType: AppConstants.ADD_FEED,
      data: feed,
    });
  }
}
