import Home from "./comp/Home"
import Home2 from "./comp2/Home2"
import Dress from "./comp3/Dress"
import PantsPage from "./Pants/PantsPage"
import Blazer from "./Blazers/Blazer"
import Login from './comp/Login'
import Signup from './comp/Signup'
import Cart from './comp/Cart'
import AddProduct from './comp/AddProduct'
import About from './comp/About'
import Footer from './comp/Footer'
import Blouse from './Blouse/Blouse'
import ScrollToTop from "./comp/ScrollToTop"
import RealHome from "./comp/RealHome"
import {HashRouter,Routes, Route} from 'react-router-dom'
import ContactUs from './comp/ContactUs'

//

//<Route path="/add-product" element={<AddProduct />}></Route>

import './App.css';
import './Cart.css'
import './HomePage.css'

function App() {
  return (<>
    <div className="App">
<HashRouter>
<ScrollToTop />
<Routes>
<Route path="/clothing" element={<Home />}></Route>
<Route path="/" element={<RealHome />}></Route>
<Route path='/about' element={<About />} ></Route>
<Route path='/contact' element={<ContactUs />} ></Route>
<Route path="/underwear" element={<Home2 />} ></Route>
<Route path="/about" element={<About />} ></Route>
<Route path="/dress" element={<Dress />} ></Route>
<Route path="/blouse" element={<Blouse />} ></Route>
<Route path="/pants" element={<PantsPage />} ></Route>
<Route path="/blazer" element={<Blazer />} ></Route>
<Route path="/Login" element={<Login />}></Route>
<Route path="/signup" element={<Signup />}></Route>
<Route path="/cart" element={<Cart />}></Route>


</Routes>
</HashRouter>

    <h1 className="displayerror"> 404 display not supported</h1>




    </div>
  </>);
}

export default App;
