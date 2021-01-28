import { Client } from 'pg';
import { testConfig } from './config/test.config';

export async function createTestSchema() {
  const client = new Client({ connectionString: testConfig.database.url });
  try {
    await client.connect();
    await client.query(`
      CREATE SCHEMA IF NOT EXISTS ${testConfig.database.schema};
    `);
  } finally {
    await client.end();
  }
}

export async function dropTestSchema() {
  const client = new Client({ connectionString: testConfig.database.url });
  try {
    await client.connect();
    await client.query(`
      DROP SCHEMA IF EXISTS ${testConfig.database.schema} CASCADE;
    `);
  } finally {
    await client.end();
  }
}
