import React, { Component } from 'react'
import { View, TouchableOpacity, FlatList } from 'react-native'
import DeckHeader from './DeckHeader'
import { getDecks } from '../utils/api'
import { receiveDecks } from '../actions'
import { connect } from 'react-redux'
// import { List, ListItem } from 'react-native-elements'

class DeckList extends Component {

  componentDidMount() {
    const { dispatch } = this.props
    getDecks().then((decks) => dispatch(receiveDecks(decks)))
  }

  render () {
    const { decks } = this.props
    console.log(decks);
    let deckList = []
    for (const key in decks) {
      let deck = new Object(decks[key])
      deck.numOfQuestions = Object.keys(deck.questions).length
      deckList.push(deck)
    }
    return (
      <View style={{flex: 1, }}>
        <FlatList
          data={deckList}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate(
                'QuizEntryPage',
                {entryId: item}
              )}
            >
              <DeckHeader
                numOfQuestions={item.numOfQuestions}
                title={item.title}
              />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.title}
        />
      </View>
    )
  }
}

function mapStateToProps(decks) {
  return { decks }
}

export default connect(mapStateToProps)(DeckList)
