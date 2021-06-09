import React,  {useEffect, useState}from "react";



const Home =()=>{

    const [posts,setPosts] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [numberOfPages, setNumberOfPages] = useState(0);

    const pages = new Array(numberOfPages).fill(null).map((v, i) => i);



    const gotoPrevious = () => {
      setPageNumber(Math.max(0, pageNumber - 1));
    };
  
    const gotoNext = () => {
      setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
    };


    useEffect(() => {
    
      const res = fetch(`http://localhost:4000/todos?page=${pageNumber}&limit`) 
      .then((response) => response.json())
      .then(({totalPages,  posts  }) =>{
       console.log(totalPages,posts);
       setNumberOfPages(totalPages);
        setPosts(posts);
      })

     

    
    }, [pageNumber]);
   


    return(
      <>
      <div className="col-md-8 col-12 mx-auto"> 
  
          <div className="Container-fluid "> 
       
          <h3 className=" text-center m-3 "> ----- Page of {pageNumber + 1} ------- </h3>
  
          <table className="table table-hover table-bordered m-3 mb-5">
    <thead>
      <tr className="heading">
        <th scope="col">Id</th>
        <th scope="col">UserId</th>
        <th scope="col">Title</th>
        <th scope="col">Completed</th>
  
      </tr>
    </thead>

    {
          posts.map((curEle, index) => {
              return(
                  <tbody key={index}>
                  <tr >
                  {/* <td>{index}</td> */}
                    <td className="state-bgm" >{curEle.id}</td>
                    <td  className="active-bgm"  >{curEle.userId}</td>
                    <td  className="recovered-bgm" >{curEle.title}</td>
                    <td  className="confirmed-bgm" >{ String(curEle.completed) }</td>
                  </tr>
                  
                </tbody>
              );
          })
      }

  </table>




  <div className="col-12 mb-5">
  <button className="btn-prev-next" onClick={gotoPrevious}>Previous</button>

      {pages.map((pageIndex) => (
        <button className="p-btn m-2" key={pageIndex} onClick={() => setPageNumber(pageIndex)}>
          {pageIndex + 1}
        </button>
      ))}
      <button className="btn-prev-next" onClick={gotoNext}>Next</button>
  </div>
  

  
  
          </div>
          </div>
  
          </>
    )
}



export default Home;