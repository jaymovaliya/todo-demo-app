import { Entity, PrimaryGeneratedColumn, Column, ObjectIdColumn, ObjectId } from 'typeorm';

@Entity()
export class User {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;
}
