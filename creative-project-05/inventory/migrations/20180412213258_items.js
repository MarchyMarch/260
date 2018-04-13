exports.up = function(knex, Promise) {
	return Promise.all([
		knex.schema.createTable('item_specs', function(table){
			table.uuid('id').primary();
			table.string('make');
			table.string('model');
			table.text('description');
			table.boolean('checked_out');
			table.string('name');
			table.string('email');
		})
	]);
};

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.dropTable('item_specs')
	]);
};