import { pluralize } from 'ember-inflector';
import DS from 'ember-data';
import { inject as service } from '@ember/service';

export default DS.RESTAdapter.extend({
  firestore: service(),

  findAll(store, type /*, sinceToken, snapshotRecordArray */ ) {
    const db = this.get('firestore.db');
    const collectionName = pluralize(type.modelName);
    const payload = {[collectionName]: [] };

    return db.collection(collectionName).get().then((querySnapshot) => {
      querySnapshot.forEach(doc => {
        const data = doc.data();
        data.id = doc.id;

        payload[collectionName].pushObject(data);
      });

      return payload;
    }).catch(error => {
      console.error("Error finding documents: ", error);
    });
  },

  updateRecord(store, type, snapshot) {
    const db = this.get('firestore.db');
    const id = snapshot.id;
    const data = this.serialize(snapshot);
    const collectionName = pluralize(type.modelName);
    const item = db.collection(collectionName).doc(id);

    return item.update(data)
    .then(() => {
      console.log("Document successfully updated!");
    })
    .catch(error => {
      console.error("Error updating document: ", error);
    });
  }
});
