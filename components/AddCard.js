import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { black, white } from '../utils/colors'
import { saveCardToDeck } from '../utils/api'
import { addCard } from '../actions'
import { connect } from 'react-redux'

class AddCard extends Component {

  state = {
    questionText: '',
    answerText: '',
  }

  static navigationOptions = {
    title: 'Add Card'
  }

  onPress = () => {
    const { questionText, answerText } = this.state
    if(questionText === '' || answerText === '') {
      return
    }
    const title = this.props.navigation.state.params.entryId
    saveCardToDeck(title, questionText, answerText)

    this.props.dispatch(addCard(
      title,
      { question: questionText, answer: answerText }
    ))

    this.props.navigation.goBack()
  }

  render () {
    const title = this.props.navigation.state.params.entryId
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.inputBox}
          placeholder="Type question here!"
          onChangeText={(questionText) => this.setState({questionText})}
        />
        <TextInput
          style={styles.inputBox}
          placeholder="Type answer here!"
          onChangeText={(answerText) => this.setState({answerText})}
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
    justifyContent: 'flex-start',
    padding: 40,
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

export default connect(null)(AddCard)
