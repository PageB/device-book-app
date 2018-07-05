import Component from '@ember/component';
import Ember from 'ember';

export default Component.extend({
  tagName: 'div',

  classNames: ['device-controls', 'layout-column', 'layout-align-center-stretch'],

  classNameBindings: [],

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
