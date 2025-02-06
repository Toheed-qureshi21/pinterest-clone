import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export const PinContext = createContext();

export const PinProvider = ({ children }) => {
    const [pins, setPins] = useState([]);
    const [pin, setPin] = useState([])
    const [loading, setLoading] = useState(false);
    const fetchPins = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get("/api/pin/all");
            setPins(data);

            setLoading(false);
        } catch (error) {
            toast.error(error.response?.data?.message);
            setLoading(false);

        }
    }
    const fetchSinglePin = async (id) => {
        setLoading(true)
        try {
            const { data } = await axios.get(`/api/pin/${id}`);
            setPin(data);
            setLoading(false);
        } catch (error) {
            toast.error(error.response?.data?.message);
            setLoading(false);
        }
    }
    const updatePin = async (id, title, pin, setEdit) => {
        try {
            const { data } = await axios.put(`/api/pin/${id}`, { title, pin });
            toast.success(data.message);
            fetchSinglePin(id);
            setEdit(false)
        } catch (error) {
            toast.error(error.response?.data?.message);
        }

    }

        const deletePin = async(id,navigate) => {
          setLoading(true);
          try {
            const {data} = await axios.delete(`/api/pin/${id}`);
            toast.success(data.message);
            navigate("/")
            setLoading(false);
            fetchPins();
          } catch (error) {
            toast.error(error.response?.data?.message);
            setLoading(false);
          }
        }
        
    // Comment adding


    const addComment = async (id, comment, setComment) => {
        try {
            const { data } = await axios.post(`/api/pin/comment/${id}`, { comment });
            toast.success(data.message);
            fetchSinglePin(id);
            setComment("");
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    }

    // Delete comment function
    const deleteComment = async(id, commentId) => {
        try {
            const { data } = await axios.delete(`/api/pin/comment/${id}?commentId=${commentId}`);
            toast.success(data.message);
            fetchSinglePin(id);
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    }

        const addPin =async(formData,setFilePreview,setFile,setTitle,setPin,naviagate) => {
            try {
                const {data} = await axios.post("/api/pin/new",formData);
                toast.success(data.message);
                setFile("");
                setFilePreview("")
                setTitle("")
                setPin("");
                naviagate("/");
                fetchPins();
            } catch (error) {
                toast.error(error.response?.data?.message);
            }
        }
        

    useEffect(() => {
        fetchPins();
    }, [])

    return (
        <PinContext.Provider value={{ pins, pin, loading, fetchSinglePin, updatePin, addComment,deleteComment,deletePin,addPin, fetchPins }}>{children}<Toaster /></PinContext.Provider>
    )
}
