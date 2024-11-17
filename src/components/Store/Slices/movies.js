import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
import { Instance } from "../../../services/instance";






export let movieAction = createAsyncThunk("movies/getall", 
    // async(quiry,page)=>{

        async ( {search, pageNumber,lang }) => {
            if (search.trim().length==0) {
                // console.log(lang);
                let res = await  Instance.get(`/movie/popular?&language=${lang}&page=${pageNumber}`)
              return res.data.results;
            }else{
             let res= await Instance.get(`/search/movie?&language=${lang}&query=${search}&page=${pageNumber}`)
             return res.data.results;
            }

} )



const movieSlice= createSlice({
    name:"movie",
    initialState: {moviesData:[],loading:false,error:null},
    extraReducers:(builder)=>{
   
        builder.addCase(movieAction.fulfilled, (state,action) => {
            //    console.log(action.payload.results);
               
           state.moviesData=action.payload;
           state.loading=false

        });
        builder.addCase(movieAction.pending, (state) => {
            state.loading=true
        })
        builder.addCase(movieAction.rejected, (state) => {
           
            state.error="try again to get posts"
        });
        
         
    },




})


export default movieSlice.reducer