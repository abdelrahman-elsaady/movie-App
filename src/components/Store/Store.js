import { configureStore } from "@reduxjs/toolkit";

import favouritREducer from './Slices/Favourite'
import movieReduser from './Slices/movies'



export const store=configureStore({
    reducer:{
      
        fave:favouritREducer  ,
       Movies:movieReduser
    }
})





