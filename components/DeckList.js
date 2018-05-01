import React, { Component } from 'react'
import { View, TouchableOpacity, ScrollView } from 'react-native'
import DeckHeader from './DeckHeader'
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
      <View style={{flex: 1, }}>
        <ScrollView>
          {
            deckList.map((deck) => (
              <TouchableOpacity
                key={deck.title}
                onPress={() => this.props.navigation.navigate(
                  'QuizEntryPage',
                  {entryId: deck}
                )}
              >
                <DeckHeader
                  numOfQuestions={deck.numOfQuestions}
                  title={deck.title}
                />
              </TouchableOpacity>
            ))
          }
      </ScrollView>
      </View>
    )
  }
}

function mapStateToProps(decks) {
  return { decks }
}

export default connect(mapStateToProps)(DeckList)
