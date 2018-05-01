import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

const DATA_STORAGE_KEY = 'UdaciCards:data'
const NOTIFICATION_KEY = "Udacicards:notification"

export async function getDecks() {
  let data = await AsyncStorage.getItem(DATA_STORAGE_KEY)
  let decks = JSON.parse(data)
  return decks || {}
}

export async function getDeck(deckTitle) {
  const decks = await getDecks()
  return decks[deckTitle] || {}
}

export async function saveDeckTitle(deckTitle) {
  const newDeck = {
		[deckTitle]: {
			title: deckTitle,
			questions: [],
		}
	}
  return await AsyncStorage.mergeItem(DATA_STORAGE_KEY, JSON.stringify(newDeck))
}

export async function saveCardToDeck(deckTitle, question, answer) {
  const decks = await getDecks()
  const newQuestion = {
    question,
    answer,
  }
  decks[deckTitle].questions.push(newQuestion)
  return await AsyncStorage.mergeItem(DATA_STORAGE_KEY, JSON.stringify(decks))
}

export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification () {
  return {
    title: 'Pending Quiz!',
    body: "👋 don't forget to complete quiz for today!",
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(18)
              tomorrow.setMinutes(0)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}
