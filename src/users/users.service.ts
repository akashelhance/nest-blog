import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  

  async findByGoogleId(googleId: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { googleId } });
    return user || undefined; 
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { email } });
    return user || undefined; 
  }


  async findOne(userId: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id: userId } });
  }

  
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  
}
