import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from '../dto/create-user.dto';
import { User, UserDocument } from '../schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userMoldel: Model<UserDocument>,
  ) {}
  async createUser(user: UserDto) {
    const salt = bcrypt.genSaltSync(10);
    user.password = await bcrypt.hash(user.password, salt);
    const userCreated = await this.userMoldel.create(user);
    return userCreated;
  }

  async findAllUsers() {
    const users = await this.userMoldel.find();
    return users;
  }

  async findUserById(id: string) {
    const user = await this.userMoldel.findById(id);
    return user;
  }

  async updateUser(id: string, user: UserDto) {
    const userUpdated = await this.userMoldel.findByIdAndUpdate(id, user);
    return userUpdated;
  }

  async deleteUser(id: string) {
    const userDeleted = await this.userMoldel.findByIdAndDelete(id);
    return userDeleted;
  }

  async findUsersByQuery(query: any) {
    const user = await this.userMoldel.find(query);
    return user;
  }

  async findOneUserByQuery(query: any) {
    const user = await this.userMoldel.findOne(query);
    return user;
  }
}
