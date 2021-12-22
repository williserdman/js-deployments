// prettier-ignore
/* eslint-disable object-curly-spacing */
/* eslint-disable no-undef */
const functions = require("firebase-functions");
const Filter = require("bad-words");

const admin = require("firebase-admin");
admin.initializeApp();

exports.detectEvilUsers = functions.firestore
    .document("messages/{msgID}")
    .onCreate((doc, ctx) => {
      const filter = new Filter();
      const { text, uid } = doc.data();

      if (filter.isProfane(text)) {
      // const cleaned = filter.clean(text);
        return doc.ref
            .update({ text: "I GOT BANNED lol" })
            .then(() => db.collection("banned").doc(uid).set({}));
      }
    });

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
