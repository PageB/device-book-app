import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  /**
    @property manufacturer
    @type string
  */
  manufacturer: DS.attr('string'),

  /**
    @property name
    @type string
  */
  name: DS.attr('string'),

  /**
    @property os
    @type string
  */
  os: DS.attr('string'),

  /**
    @property osVersion
    @type string
  */
  osVersion: DS.attr('string'),

  /**
    @property type
    @type string
  */
 type: DS.attr('string'),

  /**
    @property bookedBy
    @type string
  */
  dateOfBook: DS.attr('date'),

  /**
    @property bookedBy
    @type string
  */
  bookedBy: DS.attr('string'),

  /**
    @property imgURL
    @type string
  */
  imgURL: Ember.computed('name', function() {
    const imgName = this.get('name').split(' ').join('');

    return `assets/images/${imgName}.jpg`;
  }),

  /**
    @property isBooked
    @type boolean
  */
  isBooked: Ember.computed('bookedBy', function() {
    const bookedBy = this.get('bookedBy');

    return bookedBy;
  })
});
