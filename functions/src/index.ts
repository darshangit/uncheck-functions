import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

exports.removeDailyEntries30Days = functions.https.onRequest((req, res) => {
    let count: number = 0;
    const messagesRef = admin.database().ref('dailytask')
    messagesRef.once('value', (snapshot: any) => {
        snapshot.forEach((child: any) => {
            child.forEach((child1: any) => {
                const incomingDate: Date = new Date(child1.val()['dateCreatedUpdate']);
                var today = new Date();
                today.setDate(today.getDate() - 32);

                if (incomingDate < today) {
                    count++;
                    child1.ref.remove();
                }
            })
        })
        res.status(200).send(count.toString());

    })
});

exports.removeMonthlyEntries365Days = functions.https.onRequest((req, res) => {
    let count: number = 0;
    const messagesRef = admin.database().ref('monthlytask')
    messagesRef.once('value', (snapshot: any) => {
        snapshot.forEach((child: any) => {
            child.forEach((child1: any) => {
                const incomingDate: Date = new Date(child1.val()['dateCreatedUpdate']);
                var today = new Date();
                today.setDate(today.getDate() - 365);

                if (incomingDate < today) {
                    count = count++;
                    child1.ref.remove();
                }
            })
        })
        res.status(200).send(count.toString());
    })
});


