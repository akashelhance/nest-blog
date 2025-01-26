console.log('Script started');

import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker';

import { config } from 'dotenv';
import { User } from '../users/entities/user.entity';
import { Post } from '../posts/entities/post.entity';
console.log(require.resolve('../users/entities/user.entity'));

config();

const AppDataSource = new DataSource({
  type: 'postgres', 
  host: process.env.DB_HOST || 'localhost',
  port: 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'admin',
  database: process.env.DB_DATABASE || 'blog',
  entities: [User, Post],
  synchronize: true, 
});

async function seedDatabase() {
  await AppDataSource.initialize();
  console.log('Database connected');

  const userRepository = AppDataSource.getRepository(User);
  const postRepository = AppDataSource.getRepository(Post);

  for (let i = 0; i < 1000; i++) {
    const user = userRepository.create({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      googleId: faker.string.uuid(),
    });
    

    await userRepository.save(user);

    for (let j = 0; j < 10; j++) {
      const post = postRepository.create({
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraph(),
        author: user, 
      });

      await postRepository.save(post);
    }
  }

  console.log('Database seeded successfully');
  await AppDataSource.destroy();
}

seedDatabase().catch((err) => {
  console.error('Error seeding database:', err);
});
