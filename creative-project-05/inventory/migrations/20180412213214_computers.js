exports.up = function(knex, Promise) {
	return Promise.all([
		knex.schema.createTable('computers', function(table){
			table.increments('id').primary();
			table.string('make');
			table.string('model');
			table.string('os');
			table.string('screen_size');
			table.string('processor');
			table.string('ram');
			table.string('hdd');
			table.string('hdd_type');
			table.string('graphics');
			table.text('description');
			table.boolean('checked_out');
			table.integer('user_id').unsigned().references('id').inTable('users');
			table.string('name');
		})
	]);
};

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.dropTable('computer_specs')
	]);
};