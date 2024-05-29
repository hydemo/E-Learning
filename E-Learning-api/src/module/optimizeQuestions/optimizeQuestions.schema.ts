import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type IOptimizeQuestions = OptimizeQuestions & Document;

@Schema({ timestamps: true })
export class OptimizeQuestions {
  @Prop()
  guide: string;
  @Prop()
  scoringCriteria: string;
  @Prop()
  conclusion: string;
  @Prop({ default: false })
  isDelete: boolean;
  @Prop()
  LLM_type: string;
}

export const OptimizeQuestionsSchema = SchemaFactory.createForClass(OptimizeQuestions);
