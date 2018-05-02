import React, { Component } from 'react'
import { View, TouchableOpacity, FlatList } from 'react-native'
import  { DeckHeader } from './DeckHeader'
import { getDecks } from '../utils/api'
import { receiveDecks } from '../actions'
import { connect } from 'react-redux'

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
      <FlatList
        style={{ flex: 1 }}
        data={deckList}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate(
              'QuizEntryPage',
              {entryId: item.title}
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
    )
  }
}

function mapStateToProps(decks) {
  return { decks }
}

export default connect(mapStateToProps)(DeckList)
