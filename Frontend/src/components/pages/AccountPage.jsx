import React, { useContext} from 'react'
import { PinContext } from '../context/PinContext'
import PinCard from '../UI/PinCard';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const AccountPage = ({ user }) => {

    const { pins } = useContext(PinContext);
    const navigate = useNavigate()
            
    const {setIsAuth,setUser} = useContext(UserContext);


    let userPins;
    if (pins) {
        userPins = pins.filter(pin=>pin.createdBy===user._id);
        console.log(userPins);
        
    }
    const handleLogOut = async() => {
        try {
            const {data} = await axios.get("/api/user/logout")
             setIsAuth(false);
             setUser("");
             toast.success(data.message);    
             navigate("/login");
        
             window.location.reload()
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }


    return (
        <section className='h-fit flex flex-col  items-center'>

            <div className="p-6 w-full min-h-screen ">
                <div className="flex items-center justify-center mt-12">
                    <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center">
                        <span className='text-2xl text-gray-700'>{user?.username?.slice(0, 1)}</span>
                    </div>
                </div>
                <h1 className='text-center text-3xl font-bold mt-4'>{user.username}</h1>
                <p className="text-center text-gray-600 mt-2">{user.email}</p>
                <div className="flex justify-center mt-4 space-x-2">
                    <button onClick={handleLogOut} className="bg-gray-200 px-4 py-2 rounded hover:cursor-pointer">Log out</button>
                </div>

                <ul className="mt-6 flex flex-wrap justify-center gap-4 ">
                    {
                        userPins && userPins.length>0 ? userPins.map((pin)=>{
                                return <PinCard key={pin._id} pin={pin}/>
                        }) :<p>No pin yet</p>
                    }
                </ul>
            </div>

        </section>
    )
}

export default AccountPage
