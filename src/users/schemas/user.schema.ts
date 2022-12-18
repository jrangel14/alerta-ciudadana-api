import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema({ versionKey: false })
export class User {
  id: string;
  @Prop({ required: true })
  firstName: string;

  @Prop()
  secondName: string;

  @Prop({ required: true })
  surname: string;

  @Prop()
  secondSurname: string;

  @Prop({ required: true })
  document: number;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: true })
  active: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
