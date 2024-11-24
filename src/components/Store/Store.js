import { configureStore } from "@reduxjs/toolkit";

import favouritREducer from './Slices/Favourite'
import movieReduser from './Slices/movies'
import seriesReducer from './Slices/series'



export const store=configureStore({
    reducer:{
      
        fave:favouritREducer  ,
       movie:movieReduser,
       series:seriesReducer
    }
})





