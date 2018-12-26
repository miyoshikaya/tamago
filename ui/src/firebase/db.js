import { db } from './firebase';

// User API
export const doCreateUser = (id, email) => {
    var timeStamp = Math.floor(Date.now() / 1000);
    db.ref(`users/${id}`).set({
        "id": email,
        "language": "Korean",
        "flashcards": [
            {
                "id": "0_0_0",
                "status": "learning"
            },
            {
                "id": "0_0_1",
                "status": "learnt"
            },
            {
                "id": "0_0_2",
                "status": "mastered"
            }
        ],
        "pet_items": [
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
                "timestamp": timeStamp,
                "timer": 3600
            },
            {
                "id": "food",
                "timestamp": timeStamp,
                "timer": 3600
            },
            {
                "id": "wash",
                "timestamp": timeStamp,
                "timer": 3600
            },
            {
                "id": "music",
                "timestamp": timeStamp,
                "timer": 3600
            }
        ],
        "alive": true,
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
export const setTimer = (id, timer, index, name, timeStamp) => {
    db.ref('users/' + id + '/timers/' + index).set(
        {
            "id": name,
            "timer": timer,
            "timestamp": timeStamp,
        },
    );
}

export const setItem = (id, index, name, number) => {
    db.ref('users/' + id + '/pet_items/' + index).set(
        {
            "id": name,
            "number": number,
        },
    );
}

export const setLang = (id, lang) => {
    db.ref('users/' + id + '/language').set(
        lang
    );
}

export const setAlive = (id, alive) => {
    db.ref('users/' + id + '/alive').set(
        alive
    );
}

// Other Entity APIs ...