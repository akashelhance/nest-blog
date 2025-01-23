import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity() // Marks the class as a TypeORM entity
export class Post {
  @PrimaryGeneratedColumn() // Auto-generates the primary key
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  // Uncomment and modify the following if you want to link a post to a user
  // @Column()
  // authorId: number; // Links to the user's ID

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) // Adds createdAt column with default value
  createdAt: Date;
}
