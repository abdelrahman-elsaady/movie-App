import axios from "axios";
import { useEffect, useState } from "react";

// import {  useSelector } from "react-redux"

export function useMyCustomHookToFetchDataForReactLabDay6WithInstructorMona(url,params){

console.log(params);


  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    setLoading(true);
    setError(null);
    axios.get(url,{ params }).then((response) => {
        setData(response.data.results);
        setLoading(false);
        setError(response.error);
      }).catch((error) => {
        setError(error);   
        setLoading(false);
      });

  },[params.page,params.language ]);
  
  console.log(data);

  return { data, error, loading };

}