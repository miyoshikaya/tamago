import { db } from './firebase';

// User API
export const doCreateUser = (id, email) => { 
	db.ref(`users/${id}`).set({ 
		"firebase-id": email, 
	});
	console.log("user id: " + id + "email: " + email);
}

export const onceGetUsers = () => 
	db.ref('users').once('value');

// Other Entity APIs ...