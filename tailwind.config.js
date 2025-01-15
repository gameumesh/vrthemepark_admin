module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
        sm: '1rem',
        md: '0rem',
        lg: '1rem',
        xl: '2rem',
        '2xl': '',
         
        },  
      },
      colors: {
        primary: "#180c34",
        secondary: "#B85CFF",
        // heading: "#01173c",
        body: "#efe7da",
      },
      fontFamily: {
      
        Poppins:  ['Poppins', 'sans-serif'],
     
      },
    },
  },
  plugins: [],
}
