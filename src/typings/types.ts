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
  totalCarsCount: number;
  page: number;
  pageCount: number;
  handlePages: (string: Situations) => void;
  handleDetailClicked: (car: Car) => void;
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

export interface StateObject {
  page: number;
  cars: Car[];
  totalPageCount: number;
  totalCarsCount: number;
  loading: boolean;
  manufacturer: string;
  color: string;
  filterClicked: boolean;
  detailClicked: boolean;
  currentCar?: Car;
}
