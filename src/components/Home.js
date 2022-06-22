import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

const Home = () => {
  const [userData, setUserData] = useState([]);
  const [page, setPage] = useState(1);

  let limit = 10;
  const fetchData = async () => {
    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/comments?_page=1&_limit=${limit}`
      );
      const data = await res.json();
      const totalPages = res.headers.get("x-total-count");

      console.log(totalPages);
      setPage(Math.ceil(totalPages / limit));
      setUserData(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    let isCanceled=false;
    fetchData();
    return ()=>{
      isCanceled=true
    }
   
  }, []);
  const handleClickPage = async (pageclick) => {
    const total = pageclick.selected + 1;
    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/comments?_page=${total}&_limit=${limit}`
      );
      const data = await res.json();
    
      setUserData(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
    <div className="stories-div my-2 container">
    <h1 className="my-5 text-center text-danger">React Pagination</h1>
            {userData.length>0? userData.map((curEle) => {
              return (
                <div className="card" key={curEle.id}>
                <h2 className="divtitle">{curEle.name}</h2>
                <p className="content-card">{curEle.email}</p>
                <p className="content-card">
                  
                  {curEle.body}
                </p>
              </div>
              );
            }):
            <h1>Loading....</h1>
            }
        
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            pageCount={page}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handleClickPage}
            containerClassName={"pagination"}
            pageClassName={"page-item fs-3"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item fs-3"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item fs-3"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item fs-3"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}
          ></ReactPaginate>
        </div>
    
    </>
  );
};

export default Home;
