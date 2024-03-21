import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ISystemPrompt = SystemPrompt & Document;

@Schema({ timestamps: true })
export class SystemPrompt {
  // 用户名
  @Prop()
  name: string;
  // 密码
  @Prop()
  prompt: string;
  // 类型：
  @Prop()
  fields: string[];
  // 密码
  @Prop({ default: false })
  isDelete: boolean;
}

export const SystemPromptSchema = SchemaFactory.createForClass(SystemPrompt);
