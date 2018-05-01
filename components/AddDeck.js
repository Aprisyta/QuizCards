import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { black, white } from '../utils/colors'
import { saveDeckTitle } from '../utils/api'
import { addDeck } from '../actions'
import { connect } from 'react-redux'

class AddDeck extends Component {

  state = {
    text: '',
  }

  onPress = () => {
    const { text } = this.state
    if(text === '') {
      return
    }

    saveDeckTitle(text)

    const { dispatch } = this.props
    dispatch(addDeck({
      [text]: {
        title: text,
        questions: []
      }
    }))

    this.props.navigation.navigate(
      'QuizEntryPage',
      { entryId: text }
    )

    this.setState({ text: '' })
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>What is the title of your new deck?</Text>
        <TextInput
          value={this.state.text}
          style={styles.inputBox}
          placeholder="Type here to translate!"
          onChangeText={(text) => this.setState({text})}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={this.onPress}
        >
          <Text style={styles.btnText}>Submit</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    fontSize: 40,
    textAlign: 'center',
    marginBottom: 40,
  },
  inputBox: {
    height: 50,
    width: 300,
    borderRadius: 3,
    margin: 2,
    borderWidth: 2,
    borderColor: black,
    padding: 10,
    marginBottom: 40,
  },
  button: {
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: black,
    borderRadius: 3,
  },
  btnText: {
    color: white,
    fontSize: 25,
  }
})

export default connect(null)(AddDeck)
