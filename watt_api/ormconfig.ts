import * as path from 'path';

module.exports = {
    type: 'mysql',
    host: process.env['DB_HOST'],
    port: Number(process.env['DB_PORT']),
    username: process.env['DB_USERNAME'],
    password: process.env['DB_PASSWORD'],
    database: process.env['DB_DATABASE'],
    synchronize: false,
    logging: true,
    entities: [
        'src/**/*.entity.ts'
    ],
    migrations: [
         'migrations/**/*.ts'
    ],
    cli: {
        migrationsDir: path.join(__dirname, "migrations")
    }
};