import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Signle_Movie, isLoading } from "./Actions/index";
const SingleMovie = () => {
  const param = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dark, setDark] = useState("rgb(219, 230, 253)");
  const state = useSelector((state) => state.Reducer);
  const fetchUsers = async () => {
    try {
      dispatch(isLoading());
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=bcb021b3&i=${param.id}`
      );
      const data = await res.json();
      //    console.log(data);
      dispatch(Signle_Movie(data.Search || data));
    } catch (error) {
      console.log(error);
    }
  };
  const handleMode = () => {
    if (dark === "rgb(219, 230, 253)") {
      setDark("black");
      document.body.style.background = "black";
    } else {
      setDark("rgb(219, 230, 253)");
      document.body.style.background = "rgb(219, 230, 253)";
    }
  };
  useEffect(() => {
    console.log(state.singleMovie);
    console.log(state.isLoading);
    fetchUsers();
  }, []);
  return (
    <>
      <div
        className="form-check form-switch mx-5 my-5"
        style={{ float: "right" }}
      >
        <input
          style={{ width: "35px", height: "15px" }}
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckChecked"
          onChange={handleMode}
        />
        <label
          className="form-check-label mx-1 text-danger"
          for="flexSwitchCheckChecked"
          style={{ fontSize: "15px" }}
        >
          Enable Dark Mode
        </label>
      </div>
      <br />
      {state.isLoading ? (
        <h1 className="my-5 text-center">Loading please wait....</h1>
      ) : (
        <div className="stories-div my-2 container">
          <h1 className="my-5 text-center text-danger">Movie full Details</h1>
          <div className="card">
            <div className="card-info">
              <h2>Title: {state.singleMovie.Title}</h2>
              <h3>Type: {state.singleMovie.Type}</h3>
              <p>Releasing Date: {state.singleMovie.Released}</p>
              <p>
                <span className="text-primary">Cast:</span>{" "}
                {state.singleMovie.Actors}
              </p>
              <p>
                <span className="text-secondary">Duration:</span>{" "}
                {state.singleMovie.Runtime}
              </p>
              <br />
              <p>
                <span className="text-secondary">Genres:</span>{" "}
                {state.singleMovie.Genre}
              </p>
              <h4>Language: {state.singleMovie.Language}</h4>
              <h4>Country: {state.singleMovie.Country}</h4>
              <p>{state.singleMovie.Plot}</p>
              <img
                src={state.singleMovie.Poster}
                alt={state.singleMovie.Title}
              />
              <p>Writer: {state.singleMovie.Writer}</p>
              <br />
              <p>Director: {state.singleMovie.Director}</p>
              <br />
              <button
                onClick={() => navigate("/")}
                className="btn btn-outline-danger"
                style={{ fontSize: "15px" }}
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleMovie;
