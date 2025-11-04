import { mockData } from "./mockData";

export const fetchRestaurants = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: mockData }), 400);
  });
};

export const fetchRestaurantsById = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockData.find((each) => each.id === id)), 300);
  });
};
