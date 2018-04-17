exports.up = function(knex, Promise) {
	return Promise.all([
		knex.schema.createTable('items', function(table){
			table.increments('id').primary();
			table.string('make');
			table.string('model');
			table.text('description');
			table.boolean('checked_out');
			table.integer('user_id').unsigned().references('id').inTable('users');
			table.string('name');
		})
	]);
};

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.dropTable('item_specs')
	]);
};