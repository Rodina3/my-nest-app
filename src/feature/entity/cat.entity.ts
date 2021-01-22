import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cat')
export class CatEntity {
  constructor(name: string, age: number, color: string) {
    this.name = name;
    this.age = age;
    this.color = color;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  color: string;
}
