

import Hero from "./components/Hero";
import Courses from "./components/Courses";
import Lab from "./components/Lab";
import AboutUs from "./components/AboutUs";
import Pricing from "./components/Pricing";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";
import './App.css'

function App() {

  return (
   <>
   <Navbar/>
   <Hero />
   <Courses/>
   <Lab />
   <AboutUs/>
   <Pricing/>
   <Footer/>
   </>
  )
}

export default App
