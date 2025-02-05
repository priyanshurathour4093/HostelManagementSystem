import React, { useState,useEffect } from 'react';
import './RoomList.css';

function RoomList() {
    const roomsPerFloor = 50;

    const [roomAvailability, setRoomAvailability] = useState(Array(roomsPerFloor * 6).fill('vacant'));
    const hostel_no=localStorage.getItem('hostel_no');
    useEffect(() => {
        console.log(hostel_no);
        updateRoomAvailability();
    }, []);
    const updateRoomAvailability = async() => {
        let updatedAvailability = [...roomAvailability]; // Initialize outside the loop
        
        for (let floor = 1; floor < 3; floor++) {
            for (let roomNumber = 1; roomNumber <= roomsPerFloor; roomNumber++) {
                const roomIndex = roomNumber + (roomsPerFloor * (floor - 1)) - 1;
                const roomStatus = roomAvailability[roomIndex];
                
                try {
                    let roomNumber1 ; 
                    if(roomNumber < 10)
                        roomNumber1 = "A" + floor + "0" + roomNumber;
                    else
                        roomNumber1 = "A" + floor + roomNumber;
                    
                    const response = await fetch('http://localhost:5000/api/auth/roomNumber', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            // Add any additional headers if required
                        },
                        
                        body: JSON.stringify({ room_number: roomNumber1, hostel_no: hostel_no }), // Send room_no and hostel_no in the request body
                        // You can add other options like credentials, etc., if needed
                    });
                    
                    if (!response.ok) {
                        continue;
                    }
                    
                    const userData = await response.json();
                    
                    if (userData.length == 0) {
                        updatedAvailability[roomIndex] = 'vacant';
                    } else {
                        if (userData[0].currently_present) {
                            updatedAvailability[roomIndex] = 'filled';
                        } else {
                            updatedAvailability[roomIndex] = 'filled_not_available';
                        }
                    }
                } catch (error) {
                    console.error('Error fetching user:', error.message);
                    // Handle error appropriately, e.g., show an error message to the user
                    return null;
                }
            }
        }
        
        setRoomAvailability(updatedAvailability); // Update state after processing all rooms
    };
    
    
    const renderRooms = (floor) => {
        const rooms = [];
        for (let roomNumber = 1; roomNumber <= roomsPerFloor; roomNumber++) {
            const roomIndex = roomNumber + (roomsPerFloor * (floor - 1)) - 1;
            const roomStatus = roomAvailability[roomIndex];
            let roomClass = "room-box vacant";
            if (roomStatus === 'filled') {
                roomClass = "room-box filled";
            } else if (roomStatus === 'filled_not_available') {
                roomClass = "room-box filled-not-available";
            }
            rooms.push(
                <div key={`floor${floor}-room${roomNumber}`} className={roomClass} onClick={() => updateRoomAvailability(roomIndex, roomStatus)}>
                    {floor * 100 + roomNumber}
                </div>
            );
        }
        return rooms;
    };
    const renderFloorHeading = (floor) => {
        return (
            <div className="text-xl font-bold text-white  cursor-pointer bg-purple-600 py-2 px-4 rounded hover:bg-indigo-600	">
                Floor {floor}
            </div>
        );
    };
    return (
        <div className="h-full max-h-full px-4 py-6 md:px-6 xl:py-12 2xl:py-16  bg-cover" style={{backgroundImage: 'url("https://img.freepik.com/free-vector/purple-fluid-background-frame_53876-99020.jpg?size=626&ext=jpg&uid=R90768425&ga=GA1.1.1501107074.1707060186&semt=ais")'}}>
            <div className="container mx-auto">
                <div className='flex justify-around mx-auto'>
                    <div className=""> {renderFloorHeading(1)} </div>
                    <div>{renderFloorHeading(2)} </div>
                    <div>{renderFloorHeading(3)} </div>
                </div>
                <br />
                <div className='flex flex-wrap justify-center '>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 mx-auto">
                        {renderRooms(1)}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-2 mx-auto">
                        {renderRooms(2)}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-2 mx-auto">
                        {renderRooms(3)}
                    </div>
                </div>

            </div>
            <br />
            <br />
            <div className="container mx-auto">
                <div className='flex justify-around '>
                    <div className=""> {renderFloorHeading(4)} </div>
                    <div>{renderFloorHeading(5)} </div>
                    <div>{renderFloorHeading(6)} </div>
                </div>
                <br />
                <div className='flex justify-around '>
                    <div className="grid grid-cols-5 gap-2  ">
                        {renderRooms(4)}
                    </div>
                    <div className="grid grid-cols-5 gap-2 ">
                        {renderRooms(5)}
                    </div>
                    <div className="grid grid-cols-5 gap-2 ">
                        {renderRooms(6)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RoomList;
