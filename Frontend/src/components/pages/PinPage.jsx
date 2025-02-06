import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from "react-router-dom"
import { PinContext } from '../context/PinContext';
import { MdDelete } from "react-icons/md";
import { Loading } from '../UI/Loading';
import { MdEditSquare } from "react-icons/md";
const PinPage = ({ user }) => {
  const params = useParams();

  const { fetchSinglePin, loading, pin,updatePin, addComment,deleteComment,deletePin} = useContext(PinContext);

  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState("")
  const [pinValue, setPinValue] = useState("")
  const [comment,setComment] = useState("");
  const navigate = useNavigate()
  const handleEdit = () => {

    setTitle(pin.title);
    setPinValue(pin.pin);
    setEdit((prev) => !prev);
  }

  const handleUpdate = () => {
    updatePin(pin._id,title,pinValue,setEdit);
  }
  // Comment submit 
  const handleFormSubmit =(e) => {
    e.preventDefault();
    addComment(pin._id,comment,setComment);
  }
  // Delete comment
  const handleDeleteComment =(id) => {
    if(confirm("Are you sure you want to delete comment")){
      
      deleteComment(pin._id,id)
    }
  }
  
  // Delete pin
  const handleDeletePin = () => {
    if(confirm("Are you sure you want to delete comment")){
      
      deletePin(pin._id,navigate)
    }
  }
  


  useEffect(() => {
    fetchSinglePin(params.id);
  }, [params.id]);


  return (
    <section>
      {
        pin && (
          <div className='flex flex-col items-center bg-gray-100 p-4 min-h-screen'>
            {
              loading ? (<Loading />) : (
                <div className="bg-white rounded-lg shadow-lg max-h-auto flex flex-wrap w-full max-w-4xl">
                  <div className="w-full md:w-1/2 bg-gray-200 rounded-t-lg md:roudned-l-lg md:rounded-t-none flex items-center justify-center">
                    <img src={pin?.image?.url} alt="" className='object-cover h-full w-full rounded-t-lg md:rounded-l-lg md:rounded-t-none' />
                  </div>
                  <div className="w-full md:w-1/2 p-6 flex flex-col ">
                    <div className="flex max-lg:flex-col items-center justify-between mb-4 ">
                      {
                        edit ? <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className='common-input w-full lg:w-[20rem] ' placeholder='Enter Title' /> : <h1 className=' text-sm sm:text-2xl font-bold'>{pin.title}</h1>
                      }
                        <div className='flex  gap-2 max-sm: mt-4 max-md:order-3'>
                      {
                        pin?.createdBy?._id === user?._id && (
                          <button className="text-xl hover:cursor-pointer" onClick={handleEdit}><MdEditSquare /></button>
                        )
                      }

                      {
                        pin?.createdBy?._id === user?._id && (
                          <button onClick={handleDeletePin} className='bg-red-500 text-white py-1 px-3 rounded hover:cursor-pointer'><MdDelete /></button>
                        )
                      }
                         </div>
                    </div>

                    {
                      edit ? <input  type="text" value={pinValue} onChange={(e) => setPinValue(e.target.value)} className='common-input w-full lg:w-[20rem] mb-8 ' placeholder='Enter Description' /> : <p className='mb-8'>{pin?.pin}</p>
                    }
                    {
                      edit && <button className='bg-red-600 text-white py-1 px-4  mb-[3rem]  w-full lg:w-[20rem] ' onClick={handleUpdate}>Update</button> 
                    }

                    {
                      pin.createdBy &&
                      (<div className="flex justify-between items-center border-b border-gray-300 pb-4 mb-4">
                        <div className="flex items-center">
                          <NavLink to={`/user/${pin?.createdBy._id}`}>
                            <div className='rounded-full h-12 w-12 bg-gray-300 flex items-center justify-center '>
                              <span>{pin?.createdBy?.username.slice(0, 1)}</span>
                            </div>
                          </NavLink>

                          <div className="ml-4">
                            <h2 className='text-lg font-semibold'>{pin.createdBy.username}</h2>
                            <p className='text-gray-500'> Followers: {pin.createdBy.followers.length}</p>
                          </div>
                        </div>
                      </div>)
                    }
                    <div className="flex items-center mt-4 ">
                      <div className="rounded-full h-10 w-10 sm:h-12 sm:w-12 bg-gray-300 flex items-center justify-center mr-4">
                        <span className='font-bold'>{pin.createdBy && pin.createdBy.username.slice(0, 1)}</span>
                      </div>
                      {/* Comment functionality */}
                      <form className='flex-1 flex items-center' onSubmit={handleFormSubmit}>
                        <input value={comment} onChange={(e)=>setComment(e.target.value)} type="text"  className='flex-1 common-input py-6 h-[3rem] special-input' placeholder='Enter comment' style={{height:"2.6rem"}} />
                        <button type="submit" className='ml-2 bg-red-600 px-4 py-2 rounded-md text-white hover:cursor-pointer hover:bg-red-700 max-sm:px-3'>Add</button>
                      </form>

                    </div>
                    <hr className="font-bold text-gray-400 mt-3 mb-3" />
                  <ul className="overflow-y-auto h-64 flex flex-col mt-2">

                    {/* Loops the comments */}
                    {pin?.comments && pin?.comments?.length>0 ? pin?.comments?.map((commentItem)=>{
                      return (
                        <li className="flex items-center justify-between " key={commentItem._id}>
                          <div className='flex gap-2 items-center mb-4'>
                            <NavLink to={`/user/${commentItem?.user}`}>
                            <div className='rounded-full h-12 w-12 bg-gray-300 flex items-center justify-center '>
                              <span>{commentItem.name?.slice(0, 1)}</span>
                            </div>
                            </NavLink>
                            <div className=" ">
                            <h2 className='text-lg font-semibold'>{commentItem.name}</h2>
                            <p className='text-gray-500'>{commentItem.comment}</p>
                           
                          </div>
                          </div>
                          {/* Delete comment functionality */}
                          {
                            commentItem.user === user._id &&  <button onClick={()=>handleDeleteComment(commentItem._id)} className='bg-red-500 text-white py-2 px-3 rounded hover:cursor-pointer'>
                              <MdDelete/>
                              </button>
                          }
                        </li>
                      )
                    }) :<p>Be the first one to comment</p>}

                    {/*  Loops the comments ends */}
                  </ul>
                  </div>
                 

                </div>
              )
            }
          </div>
        )
      }
    </section>
  )
}

export default PinPage
