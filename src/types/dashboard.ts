export type SensorStatus = 'optimal' | 'warning' | 'critical';
export type AlertSeverity = 'info' | 'warning' | 'critical';
export type TrendDirection = 'up' | 'down' | 'stable';
export type IrrigationStatus = 'active' | 'idle' | 'off';

export interface SensorData {
  id: string;
  label: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  optimalMin: number;
  optimalMax: number;
  status: SensorStatus;
  trend: TrendDirection;
  icon: string;
  description: string;
}

export interface WeatherDay {
  day: string;
  high: number;
  low: number;
  icon: string;
  rainChance: number;
  description: string;
}

export interface CurrentWeather {
  temp: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  icon: string;
  location: string;
  rainfall: number;
}

export interface FarmAlert {
  id: string;
  severity: AlertSeverity;
  title: string;
  message: string;
  time: string;
  field: string;
  resolved: boolean;
}

export interface FarmProfile {
  id: string;
  name: string;
  location: string;
  area: string;
  crop: string;
  season: string;
  daysToHarvest: number;
  healthScore: number;
  irrigationStatus: IrrigationStatus;
}
