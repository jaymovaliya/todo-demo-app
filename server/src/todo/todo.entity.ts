import { Entity, ObjectId, ObjectIdColumn, Column } from 'typeorm';

export enum TodoStatus {
    NOT_STARTED = 'Not Started',
    IN_PROGRESS = 'In Progress',
    COMPLETED = 'Completed',
}

@Entity()
export class Todo {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TodoStatus;
}