import { Schema } from 'mongoose';

const FeatureCollectionSchema = new Schema({
  type: {
    type: String,
    required: true,
    enum: ['FeatureCollection'],
  },
  features: [
    {
      type: {
        type: String,
        required: true,
        enum: ['Feature'],
      },
      geometry: {
        type: {
          type: String,
          required: true,
          enum: ['Point', 'LineString', 'Polygon'],
        },
        coordinates: {
          type: [],
          required: true,
        },
      },
      properties: {
        type: Object,
        default: {},
      },
    },
  ],
});

export { FeatureCollectionSchema };
