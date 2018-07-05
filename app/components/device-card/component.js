import Component from '@ember/component';

export default Component.extend({
  actions: {
    showControls(device){
      device.set('isBooking', true);
    },
    hideControls(device){
      device.set('isBooking', false);

    },
    bookDevice(device, member){
      device.set('isBooking', false);
      device.set('isBooked', true);
      device.set('bookedBy', member);
      device.set('dateOfBook', new Date());
      device.save();
    },
    returnDevice(device){
      device.set('isBooking', false);
      device.set('isBooked', false);
      device.set('bookedBy', undefined);
      device.set('dateOfBook', undefined);
      device.save();
    }
  }
});
