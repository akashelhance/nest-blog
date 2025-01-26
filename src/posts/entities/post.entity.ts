import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
// import { User } from '../user/entities/user.entity'; // Assuming you have a User entity

@Entity() 
export class Post {
  @PrimaryGeneratedColumn() 
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column('text') 
  content: string;

  // // Relation to the User entity (optional, uncomment if needed)
  // @ManyToOne(() => User, (user) => user.posts, { nullable: true, onDelete: 'SET NULL' })
  // author?: User;

  @CreateDateColumn() 
  createdAt: Date;
}
