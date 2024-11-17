




import axios from "axios";

// export const pageNumber=0

 export const Instance=axios.create({
    baseURL:"https://api.themoviedb.org/3",
    // api_key: "your_api_key"

    imgURL:"https://image.tmdb.org/t/p/original",
    params:{api_key:"a3e2c620182dee11a077b74a47ca4e1d"}

 })