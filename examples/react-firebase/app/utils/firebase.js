import { firebase as config } from '../config'
const { apiKey, authDomain, databaseUrl, storageBucket } = config
import Firebase from 'firebase'

// Initialize Firebase
Firebase.initializeApp({ apiKey, authDomain, databaseUrl, storageBucket })

export default Firebase
