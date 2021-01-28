import { MigrationInterface, QueryRunner } from 'typeorm';

export class initCats1611213913178 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO test.cat (name, age, color) VALUES ('amy', 12, 'white');
        INSERT INTO test.cat (name, age, color) VALUES ('bob', 3, 'black');
        INSERT INTO test.cat (name, age, color) VALUES ('cindy', 5, 'orange');
        INSERT INTO test.cat (name, age, color) VALUES ('david', 18, 'yellow');
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DELETE FROM test.cat WHERE name = 'amy' OR name = 'bob' OR name = 'cindy' OR name = 'david';
      `);
  }
}
