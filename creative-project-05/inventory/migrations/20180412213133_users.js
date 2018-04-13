exports.up = function(knex, Promise) {
	return Promise.all([
		knex.schema.createTable('users', function(table){
			table.increments('id').primary();
			table.string('username').unique();
			table.string('name');
			table.string('email').unique();
			table.string('hash');
			table.boolean('admin');
		}),
	]);  
};

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.dropTable('users'),
	]);
};