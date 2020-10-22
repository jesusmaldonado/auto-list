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
  favoriteCars: FavoriteCar;
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

interface FavoriteCar {
  [stockNumber: string]: boolean;
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
  currentCar: Car | null;
  favoriteCars: FavoriteCar;
}

export interface DetailViewProps {
  car: Car;
  handleSaveClicked: (car: Car) => void;
  favoriteCars: FavoriteCar;
}

export interface EmptyPageProps {
  handleLinkClicked: (val: boolean) => void;
}
export interface HeaderProps {
  handleLinkClicked: (val: boolean) => void;
}
