interface UnitDef {
  key: string
  label: string
  toBase: (v: number) => number
  fromBase: (v: number) => number
}

export const lengthUnits: UnitDef[] = [
  { key: 'mm', label: 'Millimeter (mm)', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
  { key: 'cm', label: 'Centimeter (cm)', toBase: (v) => v / 100, fromBase: (v) => v * 100 },
  { key: 'm', label: 'Meter (m)', toBase: (v) => v, fromBase: (v) => v },
  { key: 'km', label: 'Kilometer (km)', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
  { key: 'in', label: 'Inch (in)', toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
  { key: 'ft', label: 'Foot (ft)', toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
  { key: 'yd', label: 'Yard (yd)', toBase: (v) => v * 0.9144, fromBase: (v) => v / 0.9144 },
  { key: 'mi', label: 'Mile (mi)', toBase: (v) => v * 1609.344, fromBase: (v) => v / 1609.344 },
]

export const weightUnits: UnitDef[] = [
  { key: 'mg', label: 'Milligram (mg)', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
  { key: 'g', label: 'Gram (g)', toBase: (v) => v, fromBase: (v) => v },
  { key: 'kg', label: 'Kilogram (kg)', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
  { key: 'lb', label: 'Pound (lb)', toBase: (v) => v * 453.592, fromBase: (v) => v / 453.592 },
  { key: 'oz', label: 'Ounce (oz)', toBase: (v) => v * 28.3495, fromBase: (v) => v / 28.3495 },
  { key: 'stone', label: 'Stone (st)', toBase: (v) => v * 6350.29, fromBase: (v) => v / 6350.29 },
  { key: 'ton', label: 'Metric Ton (t)', toBase: (v) => v * 1e6, fromBase: (v) => v / 1e6 },
]

export const temperatureUnits: UnitDef[] = [
  { key: 'c', label: 'Celsius (°C)', toBase: (v) => v, fromBase: (v) => v },
  { key: 'f', label: 'Fahrenheit (°F)', toBase: (v) => (v - 32) * 5 / 9, fromBase: (v) => v * 9 / 5 + 32 },
  { key: 'k', label: 'Kelvin (K)', toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 },
]

export const areaUnits: UnitDef[] = [
  { key: 'sqm', label: 'Square Meter (m²)', toBase: (v) => v, fromBase: (v) => v },
  { key: 'sqkm', label: 'Square Kilometer (km²)', toBase: (v) => v * 1e6, fromBase: (v) => v / 1e6 },
  { key: 'sqft', label: 'Square Foot (ft²)', toBase: (v) => v * 0.092903, fromBase: (v) => v / 0.092903 },
  { key: 'sqyd', label: 'Square Yard (yd²)', toBase: (v) => v * 0.836127, fromBase: (v) => v / 0.836127 },
  { key: 'acre', label: 'Acre', toBase: (v) => v * 4046.86, fromBase: (v) => v / 4046.86 },
  { key: 'ha', label: 'Hectare (ha)', toBase: (v) => v * 10000, fromBase: (v) => v / 10000 },
  { key: 'ping', label: '坪 (Ping)', toBase: (v) => v * 3.30579, fromBase: (v) => v / 3.30579 },
]

export const volumeUnits: UnitDef[] = [
  { key: 'ml', label: 'Milliliter (mL)', toBase: (v) => v, fromBase: (v) => v },
  { key: 'l', label: 'Liter (L)', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
  { key: 'cup', label: 'Cup (US)', toBase: (v) => v * 236.588, fromBase: (v) => v / 236.588 },
  { key: 'floz', label: 'Fluid Ounce (US)', toBase: (v) => v * 29.5735, fromBase: (v) => v / 29.5735 },
  { key: 'gal', label: 'Gallon (US)', toBase: (v) => v * 3785.41, fromBase: (v) => v / 3785.41 },
  { key: 'tbsp', label: 'Tablespoon', toBase: (v) => v * 14.7868, fromBase: (v) => v / 14.7868 },
  { key: 'tsp', label: 'Teaspoon', toBase: (v) => v * 4.92892, fromBase: (v) => v / 4.92892 },
]

export const speedUnits: UnitDef[] = [
  { key: 'ms', label: 'Meters/second (m/s)', toBase: (v) => v, fromBase: (v) => v },
  { key: 'kmh', label: 'Kilometers/hour (km/h)', toBase: (v) => v / 3.6, fromBase: (v) => v * 3.6 },
  { key: 'mph', label: 'Miles/hour (mph)', toBase: (v) => v * 0.44704, fromBase: (v) => v / 0.44704 },
  { key: 'knot', label: 'Knots (kn)', toBase: (v) => v * 0.514444, fromBase: (v) => v / 0.514444 },
  { key: 'fts', label: 'Feet/second (ft/s)', toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
]

export const dataSizeUnits: UnitDef[] = [
  { key: 'b', label: 'Bytes (B)', toBase: (v) => v, fromBase: (v) => v },
  { key: 'kb', label: 'Kilobytes (KB)', toBase: (v) => v * 1024, fromBase: (v) => v / 1024 },
  { key: 'mb', label: 'Megabytes (MB)', toBase: (v) => v * 1024 ** 2, fromBase: (v) => v / 1024 ** 2 },
  { key: 'gb', label: 'Gigabytes (GB)', toBase: (v) => v * 1024 ** 3, fromBase: (v) => v / 1024 ** 3 },
  { key: 'tb', label: 'Terabytes (TB)', toBase: (v) => v * 1024 ** 4, fromBase: (v) => v / 1024 ** 4 },
  { key: 'pb', label: 'Petabytes (PB)', toBase: (v) => v * 1024 ** 5, fromBase: (v) => v / 1024 ** 5 },
]

export const timeUnits: UnitDef[] = [
  { key: 'ms', label: 'Millisecond (ms)', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
  { key: 's', label: 'Second (s)', toBase: (v) => v, fromBase: (v) => v },
  { key: 'min', label: 'Minute (min)', toBase: (v) => v * 60, fromBase: (v) => v / 60 },
  { key: 'hr', label: 'Hour (hr)', toBase: (v) => v * 3600, fromBase: (v) => v / 3600 },
  { key: 'day', label: 'Day', toBase: (v) => v * 86400, fromBase: (v) => v / 86400 },
  { key: 'week', label: 'Week', toBase: (v) => v * 604800, fromBase: (v) => v / 604800 },
  { key: 'month', label: 'Month (30d)', toBase: (v) => v * 2592000, fromBase: (v) => v / 2592000 },
  { key: 'year', label: 'Year (365d)', toBase: (v) => v * 31536000, fromBase: (v) => v / 31536000 },
]
