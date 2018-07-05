import Service from '@ember/service';

export default Service.extend({
  init() {
    this._super(...arguments);

    const config = {
      apiKey: "AIzaSyCTybj5jbz4CsJg5rlwOh3kuPQUUWA1M3M",
      authDomain: "device-book-7ba04.firebaseapp.com",
      databaseURL: "https://device-book-7ba04.firebaseio.com",
      projectId: "device-book-7ba04",
    };

    this.initializeFirebaseApp(config);
    this.enableUserAuthenticationChangesLoging();
    this.signInUser();
    //this.enableOfflinePersistance();
    this.setDatabase();
  },

  initializeFirebaseApp(config) {
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
  },

  enableUserAuthenticationChangesLoging() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        console.log('Authentication change: user is authenticated');
      } else {
        // User is signed out.
        console.log('Authentication change: user is not authenticated.');
      }
    });
  },

  signInUser() {
    if (!firebase.auth().currentUser) {
      //use anonymous authentication initially
      firebase.auth().signInAnonymously().then(user => {
        console.log('User just logged in!');
      }).catch(function(error) {
        console.log(error);
      });
    }
  },

  enableOfflinePersistance() {
    firebase.firestore().enablePersistence()
      .then(result => {
        console.log('Persistence enabled!');
      })
      .catch(err => {
        console.log('Persistence failed: ' + error);
      });
  },

  setDatabase() {
    if (!this.get('db')) {
      this.set('db', firebase.firestore());
    }
  }
});
