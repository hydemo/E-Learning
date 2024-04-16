import { Prop, Schema, raw, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type IScore = Score & Document;

@Schema({ timestamps: true })
export class Score {
  // systemPrompt
  @Prop()
  systemPrompt: string;
  // prompt
  @Prop()
  prompt: string;
  // 状态 0 processing 1 success 2 failed
  @Prop({ default: 0 })
  status: number;
  // 模型 TONG_YI KIMI
  @Prop({ default: 'TONG_YI' })
  LLM_type: string;
  // systemPrompt
  @Prop()
  totalScore: number;
  //问题
  @Prop(
    raw([
      {
        field: { type: String },
        score: { type: String },
        description: { type: String },
      },
    ]),
  )
  result: Record<string, string>[];
}

export const ScoreSchema = SchemaFactory.createForClass(Score);
