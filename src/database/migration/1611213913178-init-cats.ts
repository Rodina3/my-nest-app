import { MigrationInterface, QueryRunner } from 'typeorm';

export class initCats1611213913178 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        insert into cat (name, age, color) values ('amy', 12, 'white');
        insert into cat (name, age, color) values ('bob', 3, 'black');
        insert into cat (name, age, color) values ('cindy', 5, 'orange');
        insert into cat (name, age, color) values ('david', 18, 'yellow');
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        delete from cat where name = 'amy' or name = 'bob' or name = 'cindy' or name = 'david';
      `);
  }
}
