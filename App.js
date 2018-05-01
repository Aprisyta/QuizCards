import React from 'react'
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import Card from './components/Card'
import { Constants } from 'expo'
import { black, white } from './utils/colors'
import AddDeck from './components/AddDeck'
import AddCard from './components/AddCard'
import QuizEntryPage from './components/QuizEntryPage'
import DeckList from './components/DeckList'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { setLocalNotification } from './utils/api'

function CustomStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
    },
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck'
    },
  }
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: white,
    style: {
      height: 56,
      backgroundColor: black,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  QuizEntryPage: {
    screen: QuizEntryPage,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: black,
      }
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: black,
      }
    }
  },
  Card: {
    screen: Card,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: black,
      }
    }
  },
})

export default class App extends React.Component {

  componentDidMount () {
    setLocalNotification()
  }
  
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={styles.container}>
          <CustomStatusBar backgroundColor={black} barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
