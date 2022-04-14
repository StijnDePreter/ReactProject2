import { createSlice ,createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchWeather = createAsyncThunk('weather/fetchWeather', async () => {
  const response = await axios.get("https://api.openweathermap.org/data/2.5/weather?lat=51.16557&lon=4.98917&appid=30da50a03dc79637bb8c3854cb6da34f&units=metric")
  return response.data
})

const initialState = {
  status: 'idle',
  error: null,
  icon:"" ,
  temp: 0, 
  pressure: 0,
  humidity: 0,
  windSpeed: 0
};



export const weatherSlice = createSlice({
  name: 'weather',
  initialState, 
  reducers: {
    setWeather: (state) => {
      state.status = 'idle'
      state.temp = 5; 
      state.pressure = 10;
      state.humidity = 15;
      state.windSpeed = 20;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchWeather.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.icon =action.payload.weather[0].icon;
        state.temp = Math.round(action.payload.main.temp); 
        state.pressure = action.payload.main.pressure;
        state.humidity = action.payload.main.humidity;
        state.windSpeed = action.payload.wind.speed;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
});

export default weatherSlice.reducer;
export const selectWeather = state => state.weather;
