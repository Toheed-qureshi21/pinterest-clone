import React from "react";
import { NavLink } from "react-router-dom";

const PinCard = ({ pin }) => {
    return (
        <li className="list-none p-4  w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <div className="bg-white overflow-hidden shadow rounded-lg relative group cursor-pointer">
                <img src={pin?.image.url} alt="Pin" className="h-full w-full object-cover" />


                <div className="absolute inset-0 bg-black bg-opacity-0 opacity-0 group-hover:opacity-75 transition-opacity duration-300 flex items-center justify-center">
                    <NavLink
                        to={`/pin/${pin._id}`}
                        className="bg-red-800 hover:bg-red-900 text-white px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                        View Pin
                    </NavLink>
                </div>
            </div>
        </li>
    );
};

export default PinCard;
