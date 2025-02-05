import React from "react";
import { Link, useLocation } from 'react-router-dom'; 
import NavRules from "./NavRules";

const Guest = () => {
    const location = useLocation(); 
    return (
        <div className="flex h-full">
            <NavRules/>
            <div className="w-4/5 mx-auto p-8 mb-10">
                <h2 className="font-bold text-3xl mb-6">Guest Accommodation Rules</h2>
                <ul className="list-disc pl-8 text-gray-800">
                    <li className="mb-4">
                        Subject to the availability of rooms in the hostel, if a parent needs accommodation for a
                        short stay (one or two days only), he/she has to intimate the hostel office at least 7 days
                        before the expected date of occupancy.
                    </li>
                    <li className="mb-4">
                        If allowed to avail the hostel facility for stay, the following charges shall apply:
                        <ul className="list-disc pl-4 mt-2">
                            <li>Rental charges: Rs 200/- per day.</li>
                            <li>Food cost: Rs 250/- per day.</li>
                        </ul>
                    </li>
                    <li className="mb-4">
                        Hostel rules and regulations will equally apply to guests also.
                    </li>
                    <li>
                        Any damages caused to the NIT hostel by guests shall be recovered from the concerned
                        individuals.
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Guest;
