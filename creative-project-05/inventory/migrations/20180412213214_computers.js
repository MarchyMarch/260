exports.up = function(knex, Promise) {
	return Promise.all([
		knex.schema.createTable('computer_specs', function(table){
			table.uuid('id').primary();
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
			table.string('name');
			table.string('email');
		})
	]);
};

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.dropTable('computer_specs')
	]);
};