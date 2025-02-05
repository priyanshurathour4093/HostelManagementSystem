
import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faPhone,
  faEnvelope,
  faGlobe
} from "@fortawesome/free-solid-svg-icons";
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs'
import { RxDotFilled } from "react-icons/rx";
import './Homepage.css';
import Testimonial from './Testimonial';
import Lottie from 'lottie-react';
import { NavLink } from 'react-router-dom';

const HomePage = ({contactsSectionRef}) => {
  

  const isCookie=localStorage.getItem("cookie");
  
  const slides = [
    {
      url: "/rooms.jpg",
      heading: "Furnished Rooms"
    },
    {
      url: "/wifi.jpg",
      heading: 'Wifi '
    },
    {
      url: '/mess.jpg',
      heading: 'Mess'
    },
    {
      url: '/housekeeping.jpg',
      heading: 'House Keeping'
    },
    {
      url: '/gym.jpg',
      heading: 'Gym & Sports'
    },
  ];
  const [currIndex, setCurrIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currIndex - 1;
    setCurrIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currIndex + 1;
    setCurrIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrIndex(slideIndex);
  };
  return (

    <div  className="flex flex-col min-h-full h-full ">
      {/* Navbar */}
      {/* Hero Section */}
      <div class="relative  bg-blue-300">
        <div class="bg-blue-300 min-h-full flex flex-col md:flex-row justify-center items-center relative z-10 my-6">
          <div class="md:w-1/2 px-6 md:px-12 text-center md:text-left">
            <h1 class="text-4xl md:text-5xl text-gray-800 font-bold mb-4 leading-tight">
              Seamless Living,
              <span class="font-bold text-blue-700 ">
                Simplified Management
              </span>
            </h1>
            <p class="text-lg md:text-xl text-gray-800 mb-6 leading-relaxed">
              Where Convenience and Comfort Define Your Hostel Experience
            </p>
            {!isCookie && <div class="flex justify-center md:justify-start space-x-4">
              <NavLink to={"/login"} className="bg-white text-indigo-600 py-3 px-8 rounded-full hover:bg-indigo-600 hover:text-white transition-colors duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transform hover:scale-105">
                Login now
              </NavLink>
              <NavLink to={"/signup"}  className="bg-white ml-2 text-indigo-600 py-3 px-8 rounded-full hover:bg-indigo-600 hover:text-white transition-colors duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transform hover:scale-105">
                Signup now
                </NavLink>
            </div>}
            <div className='absolute bottom-0 transition duration-100 ease-in-out left-0 h-1 w-1/5 animate-bounce'>
              <img src="/login3.svg" alt="" />
            </div>
          </div>
          <div className="md:w-1/2 relative mr-4 z-0">
            <div className="parallax-container h-full overflow-hidden shadow-xl relative z-0">
              <img className="w-full rounded-md transition duration-300 ease-in-out transform  hover:grayscale-0 z-0" src="/hero.png" alt="Hostel Image" />
            </div>
          </div>

        </div>
      </div>
      <svg className="bottom-0 left-0 w-full min-h-max bg-gray-700" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
        <path fill="rgb(147 197 253)" fill-opacity="1" d="M0,320L30,314.7C60,309,120,299,180,261.3C240,224,300,160,360,122.7C420,85,480,75,540,112C600,149,660,235,720,277.3C780,320,840,320,900,272C960,224,1020,128,1080,101.3C1140,75,1200,117,1260,128C1320,139,1380,117,1410,106.7L1440,96L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z"></path>

      </svg>













      <div className="  justify-center ">
        <div class="flex flex-row items-center justify-center h-[50%] relative bg-gray-700">

          <h1 class="group text-white text-center font-bold text-4xl transition-all duration-300 ease-in-out ">
            <span class="bg-left-bottom bg-gradient-to-r from-blue-500 to-blue-500 bg-[length:0%_3px] bg-no-repeat group-hover:bg-[length:100%_3px] transition-all duration-500 ease-in-out inline-block">
              Services
            </span>
          </h1>

          <img src="/finding.svg" alt="" class="w-1/5 h-1/10 absolute right-16 bottom-0  animate-bounce-horizontal" />

        </div>

        <div className="bg-gray-700 flex flex-row justify-around px-4 h-[60vh]  py-4">
          {/* Services Section */}
          <div className="flex flex-col justify-center max-w-2/5 w-2/5  h-2/3 mr-4 animate-bounce">
            <img src="/services.svg" alt="Services" className="w-full h-auto" />
          </div>

          {/* Image Gallery Section */}
          <div className="max-w-1/2 w-2/5 py-8  px-4 relative group justify-center">
            <div
              style={{ backgroundImage: `url(${slides[currIndex].url})` }}
              className="w-full h-full rounded-2xl bg-center bg-cover relative justify-center"
            >
              <h3 className="text-lg font-bold mb-2 absolute bottom-1 left-4 text-gray-700 bg-blue-300 rounded-2xl p-2">
                {slides[currIndex].heading}
              </h3>
              <div className="hidden group-hover:flex absolute top-1/2 -translate-y-1/2 duration-500 left-3 text-2xl rounded-full p-2 bg-black text-indigo-600 bg-opacity-20 cursor-pointer">
                <BsChevronCompactLeft onClick={prevSlide} size={30} />
              </div>
              <div className="hidden group-hover:flex absolute top-1/2 -translate-y-1/2 duration-500 right-3 text-2xl rounded-full p-2 bg-black text-indigo-600 bg-opacity-20 cursor-pointer">
                <BsChevronCompactRight onClick={nextSlide} size={30} />
              </div>
            </div>
            <br />
            <div className="flex absolute bottom-0 left-1/2 -translate-x-1/2  justify-center space-x-4">
              {slides.map((slide, slideIndex) => (
                <div
                  key={slideIndex}
                  onClick={() => {
                    goToSlide(slideIndex);
                  }}
                  className={`text-2xl cursor-pointer ${slideIndex === currIndex ? "text-blue-500" : ""
                    }`}
                >
                  <RxDotFilled />
                </div>
              ))}
            </div>

          </div>

        </div>




        {/* <div className='bg-white'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="rgb(55 65 81)" fill-opacity="1" d="M0,32L60,58.7C120,85,240,139,360,149.3C480,160,600,128,720,106.7C840,85,960,75,1080,90.7C1200,107,1320,149,1380,170.7L1440,192L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path></svg>
        </div> */}



        {/* <div className="mx-auto py-5 bg-gray-800">
        <h2 className="text-4xl text-white font-bold mb-4 text-center">Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-700 p-6 rounded-lg shadow-md text-center text-white hover:bg-slate-600 transform transition-all cursor-pointer">
            <img src="/rooms.jpg" alt="Furnished Rooms" className="mx-auto mb-2 max-h-60 w-full" />
            <h3 className="text-lg font-bold mb-2">Furnished Rooms</h3>
            <p>We provide fully furnished rooms with quality mattresses, tables, closets and other required facilities.</p>
          </div>
          <div className="bg-gray-700 p-6 rounded-lg shadow-md text-center text-white hover:bg-slate-600 transform transition-all cursor-pointer">
            <img src="/wifi.jpg" alt="WiFi" className="mx-auto mb-2 max-h-60 w-full" />
            <h3 className="text-lg font-bold mb-2">WiFi</h3>
            <p>We provide wireless high speed internet so that you can stay connected with your friends and family.</p>
          </div>
          <div className="bg-gray-700 p-6 rounded-lg shadow-md text-center text-white hover:bg-slate-600 transform transition-all cursor-pointer">
            <img src="/mess.jpg" alt="Mess" className="mx-auto mb-2  max-h-60 w-full" />
            <h3 className="text-lg font-bold mb-2">Mess</h3>
            <p>We cater to your food requirements as well. We provide breakfast, lunch & dinner services in our canteen.</p>
          </div>
          <div className="bg-gray-700 p-6 rounded-lg shadow-md text-center text-white hover:bg-slate-600 transform transition-all cursor-pointer">
            <img src="/housekeeping.jpg" alt="Housekeeping" className="mx-auto mb-2  max-h-60 w-full" />
            <h3 className="text-lg font-bold mb-2">Housekeeping</h3>
            <p>We also provide housekeeping services like laundry, room cleaning, dish cleaning based on requirements.</p>
          </div>
          <div className="bg-gray-700 p-6 rounded-lg shadow-md text-center text-white hover:bg-slate-600 transform transition-all cursor-pointer">
            <img src="/watchman.jpg" alt="Security" className="mx-auto mb-2 max-h-60 w-full" />
            <h3 className="text-lg font-bold mb-2">Security</h3>
            <p>Depending on the purpose of keeping a close watch on the visiters and passesby we provide efficient watchman.</p>
          </div>
          <div className="bg-gray-700 p-6 rounded-lg shadow-md text-center text-white hover:bg-slate-600 transform transition-all cursor-pointer">
            <img src="/gym.jpg" alt="Gym & Sports" className="mx-auto mb-2 max-h-60 w-full" />
            <h3 className="text-lg font-bold mb-2">Gym & Sports</h3>
            <p>Explore our comprehensive range of fitness content, tailored to empower and inspire your journey towards peak health and wellness.</p>
          </div>
        </div>
      </div> */}

        {/* About Section */}
        <div>
          <div className='text-face font-bold text-4xl text-center p-4 group '><span className='relative bg-left-bottom bg-[length:0%_3px] bg-gradient-to-r from-blue-500 to to-blue-500 hover:bg-[length:100%_3px] bg-no-repeat transition-all duration-500 ease-in-out '>About Us</span>
          </div>
        </div>
        <div className="flex justify-center items-center">
          {/* Image */}
          <div className="flex justify-center items-center h-2/5 w-2/5 mr-8">
            <img className="h-full w-full rounded-lg " src="/about1.jpg" alt="Hostel Image" />
          </div>

          {/* Content */}
          <div className="relative h-2/5 max-w-lg cursor-pointer group">
            {/* Bubble Container */}
            <div className="absolute bg-gray-200 rounded-full w-full h-full -top-4 -left-4 z-0"></div>
            <div className="absolute bg-gray-200 rounded-full w-full h-full -bottom-4 -right-4 z-0"></div>
            {/* Text Content */}
            <div className="relative z-10 p-6 bg-white rounded-lg shadow-lg border-blue-100 border-2 hover:-translate-y-2 duration-300">
              <h2 className="text-2xl font-bold mb-4 bg-left-bottom bg-gradient-to-r from-blue-500 to-blue-500 bg-[length:0%_3px] bg-no-repeat group-hover:bg-[length:30%_3px] transition-all duration-500 ease-in-out">Introduction</h2>
              <p className="text-lg text-gray-700">
                Discover the heart of student life at NIT Hostel. As an integral part of the college experience, our hostel provides a safe and comfortable environment where students can live, learn, and grow together. Join us as we embark on a journey of academic excellence and personal development.
              </p>
            </div>
          </div>

        </div>
        <div className="flex justify-center items-center">
          {/* Content */}
          <div className="relative h-2/5 max-w-lg cursor-pointer group">
            {/* Bubble Container */}
            <div className="absolute bg-gray-200 rounded-full w-full h-full -top-4 -left-4 z-0"></div>
            <div className="absolute bg-gray-200 rounded-full w-full h-full -bottom-4 -right-4 z-0"></div>
            {/* Text Content */}
            <div className="relative z-10 p-6 bg-white rounded-lg shadow-lg border-blue-100 border-2 hover:-translate-y-2 duration-300">
              <h2 className="text-2xl font-bold mb-4 bg-left-bottom bg-gradient-to-r from-blue-500 to-blue-500 bg-[length:0%_3px] bg-no-repeat group-hover:bg-[length:24%_3px] transition-all duration-500 ease-in-out"> Our Values</h2>
              <p className="text-lg text-gray-700">
                In our hostel, we foster a welcoming and supportive community where friendships flourish. Diversity is celebrated, with everyone valued and respected. We prioritize mutual respect, kindness, and consideration for all, creating an inclusive environment where everyone can thrive. With these values, we aim to cultivate a vibrant and harmonious atmosphere for our residents.
              </p>

            </div>
          </div>
          {/* Image */}
          <div className="flex justify-center items-center h-2/5 w-2/5 ml-8">
            <img className="h-full w-full rounded-lg" src="/about2.jpg" alt="Hostel Image" />
          </div>

        </div>
        <div className="flex justify-center items-center">
          {/* Image */}
          <div className="flex justify-center items-center h-2/5 w-2/5 mr-8">
            <img className="h-full w-full rounded-lg" src="/about3.jpg" alt="Hostel Image" />
          </div>

          {/* Content */}
          <div className="relative h-2/5 max-w-lg cursor-pointer group">
            {/* Bubble Container */}
            <div className="absolute bg-gray-200 rounded-full w-full h-full -top-4 -left-4 z-0"></div>
            <div className="absolute bg-gray-200 rounded-full w-full h-full -bottom-4 -right-4 z-0"></div>
            {/* Text Content */}
            <div className="relative z-10 p-6 bg-white rounded-lg shadow-lg border-blue-100 border-2 hover:-translate-y-2 duration-300">
              <h2 className="text-2xl font-bold mb-4 bg-left-bottom bg-gradient-to-r from-blue-500 to-blue-500 bg-[length:0%_3px] bg-no-repeat group-hover:bg-[length:30%_3px] transition-all duration-500 ease-in-out">Team Work</h2>
              <p className="text-lg text-gray-700">
                Our hostel thrives on the strength of our team. From the front desk to housekeeping and maintenance, every member plays a vital role in creating a positive living experience for our residents. Together, we're committed to delivering excellence in hospitality
              </p>
            </div>
          </div>

        </div>


        {/* <div className="bg-blue-400 container  mx-auto px-4  flex flex-col md:flex-row items-center rounded-lg max-w-full">
          <div className="md:w-1/2 mb-4 md:mb-0 flex">
            <img src="/aboutus.png" alt="About Us" className="rounded-lg shadow-md w-4/5 mx-auto" />
          </div>
          <div className="bg-gray-700 md:w-1/2 md:pl-2 text-white">
            <h2 className="text-4xl font-bold mb-4">About Us</h2>
            <p className="mb-4 text-xl">We offer a pocket friendly stay to each patron and welcome them with complete warmth and hospitality. We offer an array of all essential services that are rendered by the hostel for a hassle free stay at no extra costs. For accommodation, the property offers spacious, airy and well-lit rooms, featuring sophisticated and welcoming ambience with the warmth and comfort of home. We take utmost care of the safety and security of individuals and their belongings staying in our hostel.</p>
          </div>
        </div> */}

        {/* Gallery Section */}

        {/* Contact Section */}

        {/* background  */}

        <h1 class="text-4xl font-bold text-black text-center h-full bg-indigo-400 pt-4"><span className='relative bg-left-bottom bg-[length:0%_3px] bg-gradient-to-r from-gray-700 to to-gray-700 hover:bg-[length:100%_3px] bg-no-repeat transition-all duration-500 ease-in-out' >Contact us</span></h1>


        <div id="universal1" class="flex justify-center items-center bg-indigo-400 min-h-screen group ">
          <div class="flex flex-wrap justify-center items-center w-full md:w-5/6 lg:w-4/5 xl:w-3/4 shadow-lg bg-white rounded-lg  relative mt-3 mb-2">
            {/* <!-- Overlay Heading --> */}
            {/* <!-- Image Section --> */}
            <div class="w-full md:w-1/2 p-4">
              <img src="/contact.jpg" alt="Contact" class="w-full rounded-lg shadow-lg" />
            </div>
            {/* <!-- Form Section --> */}
            <div class="w-full md:w-1/2 p-4 ">
              <div class="text-3xl font-bold mb-6 group-hover:relative bg-left-bottom bg-[length:0%_3px] bg-gradient-to-r from-blue-500 to to-blue-500 hover:bg-[length:35%_3px] bg-no-repeat transition-all duration-500 ease-in-out ">Get in touch</div>
              <form class="w-full max-w-lg bg-indigo-50 rounded-lg p-6 shadow-lg">
                <div class="mb-4">
                  <input type="text" placeholder="Full Name" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
                </div>
                <div class="mb-4">
                  <input type="email" placeholder="Email ID" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
                </div>
                <div class="mb-4">
                  <input type="tel" placeholder="Mobile Number" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
                </div>
                <div class="mb-4">
                  <textarea placeholder="Message" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" rows="4"></textarea>
                </div>
                <button type="submit" class="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300">Submit</button>
              </form>
            </div>
            <div className="flex flex-row justify-around mb-5">
              <div className="flex items-center mr-4">
                <span className="bg-blue-600 text-white flex items-center justify-center rounded-full w-8 h-8">
                  <FontAwesomeIcon icon={faLocationDot} />
                </span>
                <div className="ml-2">
                  <span className="font-bold">Address:</span>
                  <p className="text-sm">
                    National Institute of Technology,<br />
                    Kurukshetra, Thanesar,<br />
                    Haryana, 136119
                  </p>
                </div>
              </div>
              <div className="flex items-center mr-4">
                <span className="bg-blue-600 text-white flex items-center justify-center rounded-full w-8 h-8">
                  <FontAwesomeIcon icon={faPhone} />
                </span>
                <div className="ml-2">
                  <span className="font-bold">Phone:</span>
                  <p className="text-sm">+91-01744 233 208</p>
                </div>
              </div>
              <div className="flex items-center mr-4">
                <span className="bg-blue-600 text-white flex items-center justify-center rounded-full w-8 h-8">
                  <FontAwesomeIcon icon={faEnvelope} />
                </span>
                <div className="ml-2">
                  <span className="font-bold">Email:</span>
                  <p className="text-sm">admin@nitkkr.ac.in</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="bg-blue-600 text-white flex items-center justify-center rounded-full w-8 h-8">
                  <FontAwesomeIcon icon={faGlobe} />
                </span>
                <div className="ml-2">
                  <span className="font-bold">Website:</span>
                  <p className="text-sm">www.nitkkr.ac.in</p>
                </div>
              </div>
            </div>

          </div>
        </div>




        {/* <div className="container px-4 py-8 bg-gray-700 text-white mx-auto my-5 rounded-lg  max-w-full">
          <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 mb-4 md:mb-0">
              <h3 className="text-lg font-bold mb-2">Our Office Address</h3>
              <p>National Institute of Technology,<br />Kurukshetra, Thanesar,<br />Haryana, 136119</p>
              <p className="mt-4">
                <span className="font-bold">Email:</span> admin@nitkkr.ac.in<br />
                <span className="font-bold">Phone:</span> +91- 01744 233 208<br />
                <span className="font-bold">Hours:</span> Mon - Sun: 10:00 AM - 07:00 PM
              </p>
            </div>
            <div className="md:w-1/2 md:pl-8">
              <form>
                <div className="mb-4">
                  <input type="text" placeholder="Full Name" className="w-full px-3 py-2 border rounded-md" />
                </div>
                <div className="mb-4">
                  <input type="email" placeholder="Email ID" className="w-full px-3 py-2 border rounded-md" />
                </div>
                <div className="mb-4">
                  <input type="tel" placeholder="Mobile Number" className="w-full px-3 py-2 border rounded-md" />
                </div>
                <div className="mb-4">
                  <textarea placeholder="Message" className="w-full px-3 py-2 border rounded-md" rows="4"></textarea>
                </div>
                <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300">Submit</button>
              </form>
            </div>
          </div>
        </div> */}
        {/* Some Good words about us */}
        <Testimonial/>



      </div>
    </div>
  );
};

export default HomePage;


















