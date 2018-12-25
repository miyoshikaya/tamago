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
                "timer": 2501
            },
            {
                "id": "food",
                "timestamp": "",
                "timer": 2502
            },
            {
                "id": "wash",
                "timestamp": "",
                "timer": 2503
            },
            {
                "id": "music",
                "timestamp": "",
                "timer": 2504
            }
        ]
    });
}

export const onceGetUsers = () =>
    db.ref('users').once('value');

export const onceGetUser = (id) =>
    db.ref('users/' + id).once('value');

export const getTimer = (id, index) =>
    db.ref('users/' + id + 'timers/' + index).once('value');

export const setTimeStamps = (id, timers, timeStamp) => {
    db.ref('users/' + id + '/timers').set([
        {
            "id": "play",
            "timer": timers[0],
            "timestamp": timeStamp,
        },
        {
            "id": "food",
            "timer": timers[1],
            "timestamp": timeStamp,
        },
        {
            "id": "wash",
            "timer": timers[2],
            "timestamp": timeStamp,
        },
        {
            "id": "music",
            "timer": timers[3],
            "timestamp": timeStamp,
        },
    ]);
}

// Other Entity APIs ...