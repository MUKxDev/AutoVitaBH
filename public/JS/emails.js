var db = firebase.firestore();

var emailsRef = db.collection("emails");

emailsRef.get().then(snapshot => {
  snapshot.docs.forEach(doc => {
    console.log(doc.data());
  });
});
