import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from "./components/Home"
import About from "./components/About"
import Footer from "./components/Footer"
import Header from './components/Header';


function App() {

 return (
   <Router>
     <Routes>
         <Route path='/' element={<Header />} />
         {/* <Route path='/recipe/:id' element={<RecipeDetail />} /> */}
         <Route path='/About' element={<About />} />
         <Route path='/Footer' element={<Footer />} />
     </Routes>
   </Router>
 )
}

export default App