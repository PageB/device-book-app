import Component from '@ember/component';
import Ember from 'ember';

export default Component.extend({
  bookingIsDisabled: Ember.computed('team', 'member', function() {
    return !(this.get('team')) || !(this.get('member'));
  }),

  actions: {
    cancel() {
      this.get('onCancel')();
    },
    confirm(member) {
      this.get('onConfirm')(member);
    }
  }
});
