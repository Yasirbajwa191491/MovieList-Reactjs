export const Fetch_Data = (data) => {
  return {
    type: "FETCH_DATA",
    payload: data
  };
};
export const isLoading=()=>{
  return{
    type:"LOADING",
  }
}
export const Signle_Movie=(data)=>{
  return {
    type: "SINGLE_DATA",
    payload: data
  };
}
