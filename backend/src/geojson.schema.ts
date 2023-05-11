import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum GeoJsonType {
  FeatureCollection = 'FeatureCollection',
  Feature = 'Feature',
  Point = 'Point',
  LineString = 'LineString',
  Polygon = 'Polygon',
}

@Schema({ _id: false })
class Geometry {
  @Prop({ type: String, required: true, enum: Object.values(GeoJsonType) })
  type: GeoJsonType;

  @Prop({ type: [], required: true })
  coordinates: any[];
}

const GeometrySchema = SchemaFactory.createForClass(Geometry);

@Schema({ _id: false })
class Feature {
  @Prop({ type: String, required: true, enum: [GeoJsonType.Feature] })
  type: GeoJsonType.Feature;

  @Prop({ type: GeometrySchema, required: true })
  geometry: Geometry;

  @Prop({ type: Object, default: {} })
  properties: Record<string, any>;
}

const FeatureSchema = SchemaFactory.createForClass(Feature);

@Schema({ _id: false })
export class FeatureCollection {
  @Prop({ type: String, required: true, enum: [GeoJsonType.FeatureCollection] })
  type: GeoJsonType.FeatureCollection;

  @Prop({ type: [FeatureSchema], required: true })
  features: Feature[];
}

export const FeatureCollectionSchema =
  SchemaFactory.createForClass(FeatureCollection);
