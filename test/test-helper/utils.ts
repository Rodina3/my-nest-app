import { Client } from 'pg';
import { testConfig } from '../config/test.config';

export async function createDbClient(): Client {
  const client = new Client({ connectionString: testConfig.database.url });
  await client.connect();
  return client;
}

export async function createTestSchema(client: Client) {
  await client.query(`
      CREATE SCHEMA IF NOT EXISTS ${testConfig.database.schema}`);
}

export async function dropTestSchema(client: Client) {
  await client.query(`
    DROP SCHEMA IF EXISTS ${testConfig.database.schema} CASCADE;
  `);
}

export async function initDataInCatTable(client: Client) {
  await client.query(`
        ALTER SEQUENCE test.cat_id_seq RESTART WITH 1;
        INSERT INTO test.cat (name, age, color) VALUES ('amy', 12, 'white');
        INSERT INTO test.cat (name, age, color) VALUES ('bob', 3, 'black');
        INSERT INTO test.cat (name, age, color) VALUES ('cindy', 5, 'orange');
        INSERT INTO test.cat (name, age, color) VALUES ('david', 18, 'yellow');
  `);
}

export async function cleanDataInCatTable(client: Client) {
  await client.query(`
        DELETE FROM test.cat
  `);
}
