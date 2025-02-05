import React, { useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';
import './Testimonial.css';
const Testimonial = () => {
    const testimonial = [
        {
            url: '/sachin.png',
            paragraph: 'Sachin Kuldeep is a passionate and dedicated developer with a keen eye for detail and a knack for problem-solving. With years of experience in software development, Sachin brings a wealth of expertise to every project he undertakes.',
            name: '-Sachin Kuldeep'
        },
        {
            url: '/yashraj.png',
            paragraph: 'Yashraj Vishnoi is a dynamic and creative developer known for his ingenious problem-solving skills and innovative solutions. With a passion for coding and a drive for excellence, Yashraj consistently delivers high-quality work that exceeds expectations.',
            name: '-Yash Raj Vishnoi'
        },
        {
            url: '/ansh.png',
            paragraph: 'Ansh is a dedicated and enthusiastic developer known for his meticulous attention to detail and strong problem-solving skills. With extensive experience in software development, Ansh brings a wealth of expertise and creativity to every project he tackles.',
            name: '-Ansh Goel'
        },
        {
            url: '/jay.png',
            paragraph: 'Jay is an enthusiastic and committed developer renowned for his sharp attention to detail and adept problem-solving abilities. With years of hands-on experience in software development, Jay brings a vast wealth of knowledge and expertise to each project he embarks on',
            name: '-Jay Kumar Gupta'
        }
    ];

    const [currIndex, setCurrIndex] = useState(0);
    const [slideDirection, setSlideDirection] = useState('');

    const prevSlide = () => {
        setCurrIndex(currIndex === 0 ? testimonial.length - 1 : currIndex - 1);
        setSlideDirection('prev');
    };

    const nextSlide = () => {
        setCurrIndex(currIndex === testimonial.length - 1 ? 0 : currIndex + 1);
        setSlideDirection('next');
    };

    const goToSlide = (slideIndex) => {
        setCurrIndex(slideIndex);
    };

    const sliding_next = () => {
        setSlideDirection('-translate-x-full');
    };

    const sliding_prev = () => {
        setSlideDirection('translate-x-full');
    };

    return (
        <div className='min-h-screen relative  bg-slate-200'>
            <div className='text-center '>
                <h2 className='text-4xl font-bold mt-8 mb-16'><span className='relative bg-left-bottom bg-[length:0%_3px] bg-gradient-to-r from-indigo-600 to to-indigo-600 hover:bg-[length:100%_3px] bg-no-repeat transition-all duration-500 ease-in-out' >Some Words About Us</span></h2>
            </div>
            <div className='flex flex-row justify-evenly items-center'>
                <div className='flex -translate-y-1/2 my-auto items-center text-2xl rounded-full p-2 bg-black text-indigo-600 bg-opacity-20 cursor-pointer'>
                    <BsChevronCompactLeft onClick={prevSlide} size={30} />
                </div>
                <div className='max-w-lg group relative'>
                    <div className={`relative mb-6 bg-testimonial  rounded-lg transition-transform duration-500 ease-in-out transform  ${slideDirection === 'next' ? 'animate-left' : slideDirection === 'prev' ? sliding_prev : ''}`}>
                        <div className='absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20'>
                            <img src={testimonial[currIndex].url} alt='' className='w-full h-full rounded-full shadow-lg border-2 border-indigo-300' />
                        </div>
                        <div className='py-12 justify-center text-center px-8'>
                            <p className='mb-4 w-60 text-white font-semibold'>
                                <img src='/q1.png' alt='' className='w-6 inline' />
                                {testimonial[currIndex].paragraph}
                                <img src='/q2.png' alt='' className='w-6 inline' />
                            </p>
                            <p className='text-pink-400 font-bold text-left text-xl'>{testimonial[currIndex].name}</p>
                        </div>
                        <div className="flex absolute bottom left-1/2 -translate-x-1/2 text-4xl  justify-center space-x-4">
                    {testimonial.map((_, index) => (
                        <div
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`text-6xl cursor-pointer ${index === currIndex ? 'text-indigo-600' : ''}`}
                        >
                            <RxDotFilled />
                        </div>
                    ))}
            </div>
                    </div>
                </div>
                <div className='flex -translate-y-1/2 my-auto items-center text-2xl rounded-full p-2 bg-black text-indigo-600 bg-opacity-20 cursor-pointer'>
                    <BsChevronCompactRight onClick={nextSlide} size={30} />
                </div>
                
            </div>
            
        </div>
    );
};

export default Testimonial;
