import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  firestore: service(),

  model() {
    return {
      devices: this.get('store').findAll('device'),
      teams: this.get('store').findAll('team')
    }
  },

  actions: {
    openModal(device) {
      this.controller.set("device", device);
      this.controller.set("showModal", true);
    },
    closeModal() {
      this.controller.set("showModal", false);
    },
    bookDevice(device, member){
      device.set('bookedBy', member);
      device.set('dateOfBook', new Date());
      device.save();

      this.controller.set("showModal", false);
    },
    returnDevice(device) {
      device.set('bookedBy', undefined);
      device.set('dateOfBook', undefined);
      device.save();
    }
  }
});
