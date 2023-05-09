import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { FeatureCollection, FeatureCollectionSchema } from 'src/geojson.schema';

@Schema({ collection: 'farmair' })
export class FarmAIr {
  @Prop({ type: String, required: true })
  name: string;
  @Prop({ type: FeatureCollectionSchema, required: true })
  geojson: FeatureCollection;
}

export type FarmAIrDocument = HydratedDocument<FarmAIr>;
export const FarmAIrSchema = SchemaFactory.createForClass(FarmAIr);
