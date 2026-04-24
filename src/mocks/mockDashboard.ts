import { SensorData, CurrentWeather, WeatherDay, FarmAlert, FarmProfile } from '@/src/types/dashboard';

export const mockSensors: SensorData[] = [
  {
    id: 'sm', label: 'Soil Moisture', value: 68, unit: '%',
    min: 0, max: 100, optimalMin: 55, optimalMax: 80,
    status: 'optimal', trend: 'stable',
    icon: '💧', description: 'Field 1 — Root zone moisture',
  },
  {
    id: 'st', label: 'Soil Temperature', value: 24, unit: '°C',
    min: 0, max: 50, optimalMin: 18, optimalMax: 28,
    status: 'optimal', trend: 'up',
    icon: '🌡️', description: 'Field 1 — 10cm depth reading',
  },
  {
    id: 'ah', label: 'Air Humidity', value: 88, unit: '%',
    min: 0, max: 100, optimalMin: 50, optimalMax: 80,
    status: 'warning', trend: 'up',
    icon: '🌫️', description: 'Station A — High humidity risk',
  },
  {
    id: 'ph', label: 'Soil pH', value: 6.2, unit: 'pH',
    min: 3, max: 9, optimalMin: 5.5, optimalMax: 7.0,
    status: 'optimal', trend: 'stable',
    icon: '⚗️', description: 'Field 2 — Weekly average',
  },
  {
    id: 'ni', label: 'Nitrogen (N)', value: 38, unit: 'ppm',
    min: 0, max: 100, optimalMin: 50, optimalMax: 80,
    status: 'warning', trend: 'down',
    icon: '🌿', description: 'Field 1 — Nitrogen deficiency alert',
  },
  {
    id: 'li', label: 'Light Intensity', value: 74200, unit: 'lux',
    min: 0, max: 120000, optimalMin: 40000, optimalMax: 100000,
    status: 'optimal', trend: 'up',
    icon: '☀️', description: 'Canopy level — Peak hours',
  },
];

export const mockWeather: CurrentWeather = {
  temp: 29,
  feelsLike: 33,
  humidity: 74,
  windSpeed: 14,
  condition: 'Partly Cloudy',
  icon: '⛅',
  location: 'Ibadan, Oyo',
  rainfall: 2.4,
};

export const mockForecast: WeatherDay[] = [
  { day: 'Fri', high: 31, low: 24, icon: '☀️', rainChance: 5, description: 'Sunny' },
  { day: 'Sat', high: 29, low: 23, icon: '⛅', rainChance: 20, description: 'Partly Cloudy' },
  { day: 'Sun', high: 27, low: 22, icon: '🌦️', rainChance: 60, description: 'Light Rain' },
  { day: 'Mon', high: 25, low: 21, icon: '🌧️', rainChance: 85, description: 'Heavy Rain' },
  { day: 'Tue', high: 28, low: 22, icon: '🌥️', rainChance: 30, description: 'Mostly Cloudy' },
  { day: 'Wed', high: 32, low: 25, icon: '☀️', rainChance: 5, description: 'Sunny' },
  { day: 'Thu', high: 30, low: 24, icon: '⛅', rainChance: 15, description: 'Partly Cloudy' },
];

export const mockAlerts: FarmAlert[] = [
  {
    id: 'a1', severity: 'warning',
    title: 'High Humidity Detected',
    message: 'Air humidity at 88% in Field 1. Risk of fungal disease (late blight). Consider applying preventive fungicide.',
    time: '2h ago', field: 'Field 1', resolved: false,
  },
  {
    id: 'a2', severity: 'warning',
    title: 'Nitrogen Deficiency',
    message: 'Soil nitrogen at 38ppm — below optimal range (50–80ppm). Recommend top-dressing with urea or CAN fertilizer.',
    time: '6h ago', field: 'Field 1', resolved: false,
  },
  {
    id: 'a3', severity: 'info',
    title: 'Irrigation Cycle Complete',
    message: 'Scheduled irrigation for Field 2 completed successfully. 4,200 litres applied over 2 hours.',
    time: '8h ago', field: 'Field 2', resolved: true,
  },
  {
    id: 'a4', severity: 'critical',
    title: 'Pest Activity — Fall Armyworm',
    message: 'Camera trap detected Fall Armyworm activity on the eastern row of Field 3. Immediate scouting and treatment recommended.',
    time: '1d ago', field: 'Field 3', resolved: false,
  },
  {
    id: 'a5', severity: 'info',
    title: 'Rainfall Forecast Alert',
    message: 'Heavy rainfall (85% probability) expected Monday. Ensure drainage channels are clear. Postpone fertilizer application.',
    time: '1d ago', field: 'All Fields', resolved: false,
  },
];

export const mockFarms: FarmProfile[] = [
  {
    id: 'f1', name: 'Green Valley Farm', location: 'Ibadan, Oyo',
    area: '4.5 hectares', crop: 'Tomatoes', season: 'Dry Season 2026',
    daysToHarvest: 34, healthScore: 74, irrigationStatus: 'active',
  },
  {
    id: 'f2', name: 'Sunrise Maize Plot', location: 'Kaduna, Kaduna',
    area: '2.0 hectares', crop: 'Maize (Yellow)', season: 'First Rains 2026',
    daysToHarvest: 58, healthScore: 88, irrigationStatus: 'idle',
  },
  {
    id: 'f3', name: 'Riverbend Rice Field', location: 'Benue, Benue',
    area: '6.0 hectares', crop: 'Rice (FARO 44)', season: 'Wet Season 2026',
    daysToHarvest: 72, healthScore: 61, irrigationStatus: 'off',
  },
];
