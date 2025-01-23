import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
// import { User } from '../user/entities/user.entity'; // Assuming you have a User entity

@Entity() // Marks the class as a TypeORM entity
export class Post {
  @PrimaryGeneratedColumn() // Auto-generates the primary key
  id: number;

  @Column({ length: 255 }) // Sets a maximum length for the title
  title: string;

  @Column('text') // Allows for long-form content
  content: string;

  // // Relation to the User entity (optional, uncomment if needed)
  // @ManyToOne(() => User, (user) => user.posts, { nullable: true, onDelete: 'SET NULL' })
  // author?: User;

  @CreateDateColumn() // Automatically sets the creation timestamp
  createdAt: Date;
}
