"use client"

import Link from "next/link";
import AddPost1 from '../components/AddPost1'
import PostList1 from '../components/PostList1' 
import { fetchTemp1 } from '../utils'
import { useState, useEffect } from "react";

 

const dashboard = () => {
  const [allTemp, setTemp] = useState<any>() 

  const a = async () => { 
      const b = await fetchTemp1() 
      setTemp(b)  
  }
  useEffect(() => {
      a()
  }, []) 
 
   


  return (
    <>
    <Link href='/dashboard'>
    <button type="button" className="text-white rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2" style={{ background: "#234012" }}>
        <img src="https://res.cloudinary.com/dixtwo21g/image/upload/v1699388330/next/dmhmwrpyxkjzjzk5iurq.png" width={14} style={{ color: "white" }} alt="" />
    </button>
    Return Home
</Link>
    <div className='max-w-4xl mx-auto mt-4'>
      <div className='my-5 flex flex-col gap-4'>
        <h1 className='text-3xl font-bold'>Admin Dashbaord</h1>

        <AddPost1 />
      </div>  
      {
      allTemp && allTemp?.length > 0 ? (
      <PostList1 posts={allTemp} />
      ) : (
        <div className='home___error-container'>
            <h2 className='text-black text-xl dont-bold'>...</h2>

        </div>
    )
    }
    </div>
    </>
  )
}

export default dashboard