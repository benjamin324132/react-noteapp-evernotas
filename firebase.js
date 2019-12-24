import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'
const firebase = require("firebase");
require("firebase/firestore");

const config = {
  apiKey: "AIzaSyCESfRZbKU7HHZJRGl_Sy6va1Eiex4Skcs",
    authDomain: "noteapp-fdc89.firebaseapp.com",
    databaseURL: "https://noteapp-fdc89.firebaseio.com",
    projectId: "noteapp-fdc89",
    storageBucket: "noteapp-fdc89.appspot.com",
    messagingSenderId: "390014541473",
    appId: "1:390014541473:web:5331527661e3dd75ca1ae0"
}
 
class Firebase {
	constructor() {
    if (!firebase.apps.length) {
		app.initializeApp(config)
		this.auth = app.auth()
		this.db = app.firestore()
    }
	}

	login(email, password) {
		return this.auth.signInWithEmailAndPassword(email, password)
	}

	logout() {
		return this.auth.signOut()
	}

	async register(name, email, password) {
		await this.auth.createUserWithEmailAndPassword(email, password)
		return this.auth.currentUser.updateProfile({
			displayName: name
		})
	}

	addQuote(quote) {
		if(!this.auth.currentUser) {
			return alert('Not authorized')
		}

		return this.db.doc(`users/${this.auth.currentUser.uid}`).set({
			quote
		})
	}

	isInitialized() {
		return new Promise(resolve => {
			this.auth.onAuthStateChanged(resolve)
		})
	}
  getCurrentId() {
		return this.auth.currentUser.uid
	}
	getCurrentUsername() {
		return this.auth.currentUser && this.auth.currentUser.displayName
	}

	async getCurrentUserQuote() {
		const quote = await this.db.doc(`users/${this.auth.currentUser.uid}`).get()
		return quote.get('quote')
	}
}

export default new Firebase()