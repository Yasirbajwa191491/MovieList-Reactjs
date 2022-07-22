import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Fetch_Data, isLoading } from "./Actions/index";
const FetchData = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.Reducer);
  const [input, setInput] = useState("titanic");
  const [dark, setDark] = useState("rgb(219, 230, 253)");
  const fetchUsers = async () => {
    try {
      dispatch(isLoading());
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=bcb021b3&s=${input}`
      );
      const data = await res.json();
      // console.log(data);
      if (data.Response === "True") {
        dispatch(Fetch_Data(data.Search || data));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleInput = (event) => {
    setInput(event.target.value);
  };

  const handleMode=()=>{
    if(dark==="rgb(219, 230, 253)"){
      setDark("black");
      document.body.style.background="black"
    }else{
      setDark("rgb(219, 230, 253)")
      document.body.style.background="rgb(219, 230, 253)"
    }
  }
  useEffect(() => {
    let timeOut = setTimeout(() => {
      fetchUsers();
    }, 1000);
    return () => {
      clearInterval(timeOut);
    };
  }, [input]);
  return (
    <>
      <div
        style={{ display: "flex", justifyContent: "center" }}
        className="my-3 container"
      >
        <input
        className="searchinput"
          type="text"
          minLength={3}
          placeholder="Search movie here"
          value={input}
          onChange={handleInput}
        />
      </div>
      <div className="form-check form-switch mx-5" style={{float:"right"}}>
        <input
        style={{width:"35px",height:"15px"}}
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckChecked"
          onChange={handleMode}
        />
        <label className="form-check-label mx-1 text-danger" for="flexSwitchCheckChecked" style={{fontSize:"15px"}}>
          Enable Dark Mode
        </label>
      </div><br/>
      {state.isLoading ? (
        <h1 className="my-5 text-center">Loading please wait....</h1>
      ) : (
        <div className="container">
          <h1
            className="text-center text-danger my-5"
            style={{ fontSize: "35px" }}
          >
            Movie List
          </h1>
          <div className="grid grid-4-col my-2 container">
            {state.movieData.map((curEle) => {
              console.log(curEle);
              return (
                <NavLink
                  to={`/movie/${curEle.imdbID}`}
                  key={curEle.imdbID}
                  style={{ textDecoration: "none" }}
                >
                  <div className="card">
                    <div className="card-info">
                      {curEle.Title.length > 15 ? (
                        <h2>Title: {curEle.Title.substring(0, 15)}....</h2>
                      ) : (
                        <h2>Title: {curEle.Title}</h2>
                      )}
                      <h3>Type: {curEle.Type}</h3>
                      <p>Releasing Year: {curEle.Year}</p>
                      <img src={curEle.Poster} alt={curEle.Title} />\
                      <p>Click for details</p>
                    </div>
                  </div>
                </NavLink>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default FetchData;
