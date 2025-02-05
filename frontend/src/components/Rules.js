import { Link, useLocation } from 'react-router-dom';
import NavRules from './NavRules';
const Rules = () => {
    // const location = useLocation();
    return (
        <div className="flex h-full mb-10">
            <NavRules />
            <br />
            <div className="w-4/5 h-1/5 mx-auto p-8">
                <h2 className="font-bold text-3xl mb-6">Rules & Regulations</h2>
                <ul className="list-disc pl-8 text-gray-800">
                    <li className="mb-4 ">
                        Welcome to NIT hostels, your home away from home within the vibrant campus of NIT KURUKSHETRA
                    </li>
                    <li className="mb-4">
                        Experience the unique camaraderie and community spirit of campus living at NIT KURUKSHETRA Hostel
                    </li>
                    <li className="mb-4">
                        Enjoy access to modern facilities and amenities including comfortable living spaces, study areas, recreational facilities, and more
                    </li>
                    <li className="mb-4">
                        Engage with fellow students, participate in events and activities, and connect with like-minded individuals
                    </li>
                    <li className="mb-4">
                        Our dedicated staff members are here to support you every step of the way, providing assistance, guidance, and resources to enhance your college experience.
                    </li>
                    <li>
                        Make Hostel your college home and create lasting memories in an environment that fosters growth, learning, and friendship.
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Rules;
