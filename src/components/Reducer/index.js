const initialState={
    isLoading:true,
    movieData:[],
    singleMovie:[]
}
const Reducer=(state=initialState,action)=>{
switch(action.type){
case "FETCH_DATA":
    return{
        ...state,
        movieData:action.payload,
        isLoading:false
    }
case "SINGLE_DATA":
    return{
        ...state,
        singleMovie:action.payload,
        isLoading:false
    }
    case "LOADING":
        return{
            ...state,
            isLoading:true
        }
}
return state;
}
export default Reducer;