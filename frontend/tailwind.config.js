/** @type {import('tailwindcss').Config}*/
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
      extend: {
        colors: {
          '35353F': '#35353F',
        '9333ea': '#9333ea',
        '212529': '#1e293b',
        '52525b': '#52525b',
        '803BEC': '#803BEC',
        '5522a3': '#5522a3',
        '141415':'#141415',
        'back' : 'rgb(147,197,253)',
          face: '#fb7e73',
          testimonial:'#3f3d56',
          admin:'#D8DADD',
          best:'#5eead4'
        },
      },
      scrollbar: {
        hidden: 'scrollbar-hidden',
      keyframes: {
        wiggle: {
          '0%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
          '100%': { transform: 'rotate(-2deg)' },
        },
  
      }
    },
  plugins: [

  ],
}
}

