export interface Car {
  color: string;
  fuelType: string;
  manufacturerName: string;
  modelName: string;
  pictureUrl: string;
  stockNumber: number;
  mileage: {
    number: number;
    unit: string;
  };
}

export type Situations = "first" | "next" | "last" | "previous";
export interface ListViewProps {
  cars: Car[];
  count: number;
  totalCarsCount: number;
  page: number;
  pageCount: number;
  handlePages: (string: Situations) => void;
}
export interface CarResponseProps {
  cars: Car[];
  totalPageCount: number;
  totalCarsCount: number;
}

export interface ManufacturerCar {
  name: string;
}
export interface Manufacturer {
  name: string;
  models: ManufacturerCar[];
}
export interface ColorResponse {
  colors: string[];
}
export interface ManufacturerResponse {
  manufacturers: Manufacturer[];
}

export interface FilterViewProps {
  handleManufacturerChange: (Manufacturer: string) => void;
  handleColorChange: (color: string) => void;
  currentColor: string;
  currentManufacturer: string;
  handleFilterClicked: () => void;
}
