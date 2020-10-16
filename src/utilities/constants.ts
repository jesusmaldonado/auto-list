const BASE_URL = "https://auto1-mock-server.herokuapp.com/api";
export const BASE_URL_CARS = `${BASE_URL}/cars`;
export const BASE_URL_COLORS = `${BASE_URL}/colors`;
export const BASE_URL_MANUFACTURERS = `${BASE_URL}/manufacturers`;

export const initialState = {
  page: 1,
  cars: [],
  totalPageCount: 0,
  totalCarsCount: 0,
  loading: true,
  manufacturer: "",
  color: "",
  filterClicked: false,
  detailClicked: false,
};
