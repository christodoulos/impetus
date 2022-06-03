export interface FiSdmAddressValue {
  addressCountry: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  streetAddress: string;
}

export interface FiSdmMetadata {
  [key: string]: string;
}

export interface FiSdmAddress {
  metadata: FiSdmMetadata;
  type: string;
  value: FiSdmAddressValue;
}

export interface FiSdmDateObserved {
  metadata: FiSdmMetadata;
  type: string;
  value: Date;
}

export interface FiSdmLocationValue {
  coordinates: Array<number>;
  type: string;
}

export interface FiSdmLocation {
  metadata: FiSdmMetadata;
  type: string;
  value: FiSdmLocationValue;
}

export interface FiSdmName {
  metadata: FiSdmMetadata;
  type: string;
  value: string;
}

export interface FiSdmSource {
  metadata: FiSdmMetadata;
  type: string;
  value: string;
}

export interface FiSdmNumber {
  metadata: FiSdmMetadata;
  type: string;
  value: number;
}

export interface FiSdmWeatherObserved {
  dateObserved: FiSdmDateObserved;
  id: string;
  location: FiSdmLocation;
  type: string;
  address?: FiSdmAddress;
  name?: FiSdmName;
  source?: FiSdmSource;
  windSpeed?: FiSdmNumber;
  gustSpeed?: FiSdmNumber;
  windDirection?: FiSdmNumber;
  solarRadiation?: FiSdmNumber;
  temperature?: FiSdmNumber;
  sunshineDuration?: FiSdmNumber;
  precipitation?: FiSdmNumber;
  relativeHumidity?: FiSdmNumber;
  atmosphericPressure: FiSdmNumber;
}
