import { db } from './firebase';

// User API
export const doCreateUser = (id, email) => { 
	db.ref(`users/${id}`).set({ 
		"id": email, 
        "language": "korean",
        "flashcards": [
	        {
	            "id": "0-0-0",
	            "status": "learning"
	        },
	        {
	        	"id": "0-0-1",
	            "status": "learnt"
	        },
	        {
	            "id": "0-0-2",
	            "status": "mastered"
	        }
        ],
        "pet-items": [
            {
                "id": "play",
                "number": 3
            },
            {
                "id": "food",
                "number": 3
            },
            {
                "id": "wash",
                "number": 3
            },
            {
                "id": "music",
                "number": 3
            }
        ],
        "timers": [
            {
                "id": "play",
                "timestamp": "",
                "timer": "12:0"
            },
            {
                "id": "food",
                "timestamp": "",
                "timer": "12:45"
            },
            {
                "id": "wash",
                "timestamp": "",
                "timer": "12:0"
            },
            {
                "id": "music",
                "timestamp": "",
                "timer": "12:0"
            }
        ]
	});
}

export const onceGetUsers = () => 
	db.ref('users').once('value');

// Other Entity APIs ...