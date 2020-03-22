import Firebase from 'firebase'
import { firebase as config } from '../config'

// Initialize Firebase
Firebase.initializeApp(config)

export default Firebase
