'use strict';

var Api = require('../Api/RssFeedApi');
var AppActions = require('../Actions/AppActions');
var FeedStore = require('../Stores/FeedStore');
var FeedDetail = require('./FeedDetail');
var React = require('react-native');
var _ = require('lodash');

var {
  ActivityIndicatorIOS,
  AsyncStorage,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} = React;


class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feeds: [],
      loading: true,
    }
  }

  componentWillMount() {
    FeedStore.addChangeListener(this._updateFeedsFromStore.bind(this));
    this._updateFeedsFromStore();
  }

  componentWillUnmount() {
    FeedStore.removeChangeListener(this._updateFeedsFromStore.bind(this));
  }

  _updateFeedsFromStore() {
    this.setState({feeds: FeedStore.getState()});
  }

  _renderLoading() {
    if (this.state.loading) {
      return (
        <ActivityIndicatorIOS animated={true} size='large' style={{marginTop: 30}} />
      )
    }
  }

  _showFeedDetails(feed:any) {
    Api.fetchRss(feed.feedUrl)
    .then((res) => {
      if(res.responseStatus == 200) {
        var entries = res.responseData.feed.entries;
          this.props.navigator.push ({
            component: FeedDetail,
            title: feed.title,
            passProps: {
              entries: entries
            }
          })
        } else {
        AlertIOS.alert(res.responseDetails);
      }
    });
  }

  _renderFeed(feed:any) {
    return (
      <TouchableHighlight
        underlayColor="rgba(0,0,0,.1)"
        onPress={() => { this._showFeedDetails(feed) }}
        key={feed.length}>
        <View style={styles.wrapper}>
          <View style={styles.header}>
            <Text style={styles.title}>{feed.title}</Text>
          </View>
          <View style={styles.footer}>
            <Text style={styles.description}>{feed.description}</Text>
            <Text style={styles.smallText}>{feed.feedUrl}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <ScrollView style={styles.scrollView}>
        {this.state.feeds.map((feed) => { return this._renderFeed(feed) })}
      </ScrollView>
    );
  }
};

var styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  wrapper: {
    paddingTop: 20,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e9e9e9',
  },
  title: {
    paddingTop: 2,
    paddingBottom: 3,
    paddingRight: 15,
    fontWeight: 'bold',
    fontSize: 16,
  },
  description: {
    color: "#B4AEAE",
    fontSize: 12,
    marginBottom: 5,
  },
  smallText: {
    fontSize: 11,
    textAlign: 'right',
    color: "#B4AEAE",
  }
});

module.exports = HomeScreen;
