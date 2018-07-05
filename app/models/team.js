import DS from 'ember-data';

export default DS.Model.extend({
  /**
    @property name
    @type string
  */
  name: DS.attr('string'),

  /**
    @property members
    @type string
  */
  members: DS.attr()
});
