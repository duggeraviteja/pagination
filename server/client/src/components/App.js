import React, { useState ,useEffect} from "react";
import "./styles.css";
import HashLoader from "react-spinners/HashLoader";


import Home from "./Home";
function App() {
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    
    setLoading(true)
    setTimeout(()=>{
      setLoading(false)
    },6000)
  }, [])

  return(
    <>

{

loading ? 
(
  <div className="loader col-6 mx-auto mt-5">
    <HashLoader 
   size =  {500}
   color = {"#2ac59c"}
   loading = {loading}
   />
 </div>
)
 
 :(
  <div>
    <Home />
  </div>
)

}

    </>
  )


 }
export default App;
