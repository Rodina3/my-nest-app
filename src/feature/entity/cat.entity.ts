import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cat')
export class CatEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'int' })
  age: number;

  @Column()
  color: string;

  constructor(name: string, color?: string, age?: number);
  constructor(name: string, color: string, age?: number);
  constructor(name: string, color: string, age: number);
  constructor(name?: string, color?: string, age?: number);
  constructor(name?: string, color?: string, age?: number) {
    this.name = name || '';
    this.color = color || '';
    this.age = age || NaN;
  }
}
