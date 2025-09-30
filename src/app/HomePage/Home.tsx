import {SectionCards}  from "@/components/ui/section-card"
import Calendar from "@/Calendar/calendar";
// import { FaArrowsRotate } from "react-icons/fa6";
// import { useEffect, useState } from "react";
const Home = () => {
  return (
//  const [rotating, setRotating] = useState(false); 
    <>
       {/* const handleReload = () => {
    setRotating(true);
    fetchLeaves(); // 🔄 API call instead of full page reload
  }; */}

  {/* if (loading) return <p className="text-center">Loading...</p>; */}
      <div className="bg-amber-200  m-auto">
        <div className="flex justify-between items-center rounded border p-2">
          <h2>Home Page</h2>
          <div className="flex items-center space-x-3">
           
             {/* <button onClick={handleReload}>
                        <FaArrowsRotate
                          className={`h-6 w-6 ${
                rotating ? "animate-spin" : ""
              }`}
                        />
                      </button> */}
           
    
          </div>
        </div>

        <div className="bg-[#FFFFFF] p-4 overflow-x-hide">
          <div className="md:block overflow-x-auto">
        <SectionCards></SectionCards>
          </div>
          <div className="mt-15">
            <Calendar/>
          </div>
        </div>
      </div>
    </>



  )
}

export default Home
