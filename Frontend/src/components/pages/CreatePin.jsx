import { useContext, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { PinContext } from "../context/PinContext";
import { useNavigate } from "react-router-dom";
import { LoadingAnimation } from "../UI/Loading";

const CreatePin = () => {

    const [file,setFile] = useState("");
    const [filePreview,setFilePreview] = useState("");  
    const [title,setTitle] = useState("")
    const [pin,setPin] = useState("")

    const inputRef = useRef(null);

    const {addPin,loading} = useContext(PinContext);

    const navigate = useNavigate();

    const handleClick = () => {
      inputRef.current.click()
    }
    const handleFileChange =(e) => {
        const files = e.target.files[0];
        const reader = new FileReader();

        reader.readAsDataURL(files);
        reader.onloadend = () => {
          setFilePreview(reader.result);
          setFile(files)
        }
        
    }

    const handleFormSubmit =(e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("title",title);
      formData.append("pin",pin);
      formData.append("file",file);

      addPin(formData,setFilePreview,setFile,setTitle,setPin,navigate);
    }
    
    
    

  return (
        <section className=' w-screen h-dvh flex flex-wrap justify-center items-center gap-3 '>
            <div className='flex  items-center justify-center mt-12'>       
                <div className="flex flex-col items-center justify-center w-80 h-auto p-6 bg-white rounded-lg shadow-2xl">

                    {filePreview && <img src={filePreview} />}

                    <div  onClick={handleClick}   className="flex flex-col gap-2 items-center justify-center h-full cursor-pointer">
                        <input ref={inputRef} onChange={handleFileChange} type="file" accept='image/*' className='hidden ' required/>
                        <div className='w-12 h-12 mt-2 mb-4 flex items-center justify-center bg-gray-200 rounded-full'>
                        <FaPlus />
                        </div>
                        <p className="text-gray-500 ">Choose a file</p>
                    </div>
                    <p className="mt-4 text-sm text-gray-500 ">We recommend you to use high quality .jpg files less than 10MB</p>
                </div>
            </div>
            
              <div className="flex items-center justify-center bg-gray-100 mt-12">
                <form className="w-full max-w-lg p-6 bg-white rounded-lg  shadow-lg " onSubmit={handleFormSubmit}>
                  <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                    <input type="text" id="title" name="title" value={title} onChange={(e)=>setTitle(e.target.value)} className="common-input" required/>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="pin" className="block text-sm font-medium text-gray-700">Pin</label>
                    <input type="text" id="pin" name="pin" value={pin} onChange={(e)=>setPin(e.target.value)} className="common-input" required/>
                  </div>
                  <button type="submit" className="common-btn" disabled={loading}>{loading?<LoadingAnimation/>:"Add"}</button>
                </form>

              
            </div>
        </section>
  )
}

export default CreatePin
