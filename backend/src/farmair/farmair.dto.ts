import {
  IsNotEmpty,
  IsNotEmptyObject,
  IsEnum,
  IsArray,
  ValidateNested,
  IsOptional,
  IsObject,
} from 'class-validator';
import { Type } from 'class-transformer';
import { GeoJsonType } from 'src/geojson.schema';

class Geometry {
  @IsEnum(GeoJsonType, { message: 'Invalid geometry type' })
  type: GeoJsonType.Point | GeoJsonType.LineString | GeoJsonType.Polygon;

  @IsArray()
  coordinates: any[];
}

class Feature {
  @IsEnum(GeoJsonType, { message: 'Invalid feature type' })
  type: GeoJsonType.Feature;

  @ValidateNested()
  @Type(() => Geometry)
  geometry: Geometry;

  @IsObject()
  @IsOptional()
  properties: Record<string, any>;
}

class FeatureCollectionDto {
  @IsEnum(GeoJsonType, { message: 'Invalid feature collection type' })
  type: GeoJsonType.FeatureCollection;

  @ValidateNested({ each: true })
  @Type(() => Feature)
  features: Feature[];
}

export class FarmAIrDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmptyObject()
  geojson: FeatureCollectionDto;
}
