import { configureStore } from '@reduxjs/toolkit';
import newsReducer from '../features/news/newsSlice';
import weatherReducer from '../features/weather/weatherSlice';

export const store = configureStore({
  reducer: {
    news: newsReducer,
    weather: weatherReducer
  },
});
