import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserInput } from 'src/graphql/inputs/user/create-user.input';
import { User } from 'src/graphql/models/user/user.model';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findByUsernameOrEmail(username: string, email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: [{ username }, { email }],
    });
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneBy({ email });
  }

  async findById(id: string): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }

  createUser({ email, username }: CreateUserInput): User {
    return this.userRepository.create({ email, username });
  }

  async saveUser(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
}
