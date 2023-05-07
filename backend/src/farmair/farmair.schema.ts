import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { FeatureCollectionSchema } from 'src/feature-collection.schema';

@Schema({ collection: 'farmair' })
export class FarmAIr {
  @Prop({ type: String })
  name: string;
  @Prop({ type: FeatureCollectionSchema })
  geo: typeof FeatureCollectionSchema;
}

export type FarmAIrDocument = HydratedDocument<FarmAIr>;
export const FarmAIrSchema = SchemaFactory.createForClass(FarmAIr);
