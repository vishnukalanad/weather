export interface WeatherDataResponseModel {
  results: WeatherDataModel[]
  generationtime_ms: number
}

export interface WeatherDataModel {
  id: number
  name: string
  latitude: number
  longitude: number
  elevation: number
  feature_code: string
  country_code: string
  admin1_id: number
  admin2_id: number
  timezone: string
  population: number
  country_id: number
  country: string
  admin1: string
  admin2: string
}

export interface WeatherDataForLocation {
  latitude: number
  longitude: number
  generationtime_ms: number
  utc_offset_seconds: number
  timezone: string
  timezone_abbreviation: string
  elevation: number
  current_units: CurrentUnits
  current: Current
}


export interface CurrentUnits {
  time: string
  interval: string
  temperature_2m: string
  windspeed_10m: string
  uv_index: string
  visibility: string
  cloudcover: string,
  precipitation: string
}

export interface Current {
  time: string
  interval: number
  temperature_2m: number
  windspeed_10m: number
  uv_index: number
  visibility: number
  cloudcover: number
  precipitation: number
}


export interface WeekForecastModel {
  latitude: number
  longitude: number
  generationtime_ms: number
  utc_offset_seconds: number
  timezone: string
  timezone_abbreviation: string
  elevation: number
  daily_units: DailyUnits
  daily: Daily
}

export interface DailyUnits {
  time: string
  temperature_2m_max: string
  temperature_2m_min: string
  sunrise: string
  sunset: string
  uv_index_max: string
}

export interface Daily {
  time: string[]
  temperature_2m_max: number[]
  temperature_2m_min: number[]
  sunrise: string[]
  sunset: string[]
  uv_index_max: number[]
}
