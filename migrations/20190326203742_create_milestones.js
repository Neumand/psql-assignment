
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('milestones', t => {
      t.increments('id');
      t.string('description');
      t.date('date_achieved');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('milestones')
  ])
};
