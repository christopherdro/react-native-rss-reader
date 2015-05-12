/**
 * RssReader
 * Christopher Dro
 */
'use strict';


var React = require('react-native');
var HomeScreen = require('./App/Screens/HomeScreen');
var NewFeed = require('./App/Screens/NewFeed');
var LocalStorage = require('./App/Stores/LocalStorage');

var {
  AlertIOS,
  AppRegistry,
  AsyncStorage,
  NavigatorIOS,
  StyleSheet,
  Text,
  View
} = React;

class RssReader extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      bootstrapped: false
    }
  }

 componentWillMount() {
  // AsyncStorage.removeItem('@FeedList');
    LocalStorage.bootstrap(() => this.setState({bootstrapped: true}));
  }

  render() {
    if (this.state.bootstrapped == false) {
      return <View />;
    }
    return (
      <NavigatorIOS
        ref="mainNav"
        style={styles.container}
        initialRoute={{
          component: HomeScreen,
          title: 'RSS Feeds',
          backButtonTitle: 'Back',
          rightButtonIcon: require('image!NavBarButtonPlus'),
          onRightButtonPress: () => {
            this.refs.mainNav.navigator.push({
              component: NewFeed,
              title: 'New Feed',
            });
          }
        }}
        tintColor="#FFFFFF"
        barTintColor="#183E63"
        titleTextColor="#FFFFFF"/>
    );
  }
};

var styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

AppRegistry.registerComponent('RssReader', () => RssReader);
