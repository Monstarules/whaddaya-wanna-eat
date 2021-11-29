import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import carouselPics from './components/Home/carouselPics';
import {
	BrowserRouter as Router,
	Routes,
	Route,
  } from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
import Services from './components/Services';
import Settings from './components/Settings';
import Verification from './components/Verification';

function App() {
  return (
		// <div className="page-container">
		// <div className="content-wrap">
	<Router>
		<Navbar />  
		<Routes>
			<Route path="/" element={<Home slides={carouselPics}/>}/>
			<Route path="/about" element={<About/>}/>
			<Route path="/services" element={<Services/>}/>
			<Route path="/resetPassword/:userId" element={<Settings/>}/>
			<Route path="/verification" element={<Verification/>}/>
		</Routes>
		
		<Footer />
		
	</Router>
	// </div>
	// </div>
	
  );
}

export default App;
