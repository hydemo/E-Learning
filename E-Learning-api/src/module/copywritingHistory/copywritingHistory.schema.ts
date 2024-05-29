import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ICopywritingHistory = CopywritingHistory & Document;

@Schema({ timestamps: true })
export class CopywritingHistory {
  @Prop()
  prompt: string;
  @Prop()
  copywriting: string;
  @Prop()
  result: string;
}

export const CopywritingHistorySchema = SchemaFactory.createForClass(CopywritingHistory);
