import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type IScoringCriteria = ScoringCriteria & Document;

@Schema({ timestamps: true })
export class ScoringCriteria {
  // name
  @Prop()
  name: string;
  // scoringCriteria content
  @Prop()
  content: string;
  @Prop({ default: false })
  isDelete: boolean;
}

export const ScoringCriteriaSchema = SchemaFactory.createForClass(ScoringCriteria);
