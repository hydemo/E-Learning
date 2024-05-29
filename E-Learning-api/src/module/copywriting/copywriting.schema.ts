import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ICopywriting = Copywriting & Document;

@Schema({ timestamps: true })
export class Copywriting {
  @Prop()
  guide: string;
  @Prop()
  scoringCriteria: string;
  @Prop()
  conclusion: string;
  @Prop()
  keyword: string;
  @Prop({ default: false })
  isDelete: boolean;
  @Prop()
  LLM_type: string;
  @Prop()
  scene: string;
}

export const CopywritingSchema = SchemaFactory.createForClass(Copywriting);
