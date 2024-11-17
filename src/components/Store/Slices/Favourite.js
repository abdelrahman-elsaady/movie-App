import { createSlice } from "@reduxjs/toolkit";



const FavouriteSlice=createSlice({
    
    name: "Favoutite",

    initialState: {counter:0,Favourite:[]},
 
    reducers: {
     

        AddMovie(state,movie ){

                state.Favourite.push(movie.payload);
                state.counter += 1;
            
               },
        RemoveMovie(state,movie ){
             console.log(movie);
            state.Favourite = state.Favourite.filter(m => m.id !== movie.payload.id);
            state.counter -= 1;
          },
      
    },
})



export const {AddMovie,RemoveMovie}=FavouriteSlice.actions
export default FavouriteSlice.reducer