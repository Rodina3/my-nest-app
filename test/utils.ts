import { Client } from 'pg';
import { testConfig } from './config/test.config';

export async function createTestSchema() {
  await runQuery(`
    CREATE SCHEMA IF NOT EXISTS ${testConfig.database.schema};
  `);
}

export async function dropTestSchema() {
  await runQuery(`
    DROP SCHEMA IF EXISTS ${testConfig.database.schema} CASCADE;
  `);
}

export async function runQuery(query: string) {
  const client = new Client({ connectionString: testConfig.database.url });
  try {
    await client.connect();
    await client.query(query);
  } finally {
    await client.end();
  }
}
