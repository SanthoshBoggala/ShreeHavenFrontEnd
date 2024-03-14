import { BrowserRouter } from "react-router-dom"
import NavbarDummy from "./Components/Navbar/Navbar"
import Footer from "./Components/Footer/Footer"
import Routers from "./Routers"
import './app.css'
import 'react-toastify/dist/ReactToastify.css'
import 'react-toastify/dist/ReactToastify.minimal.css'


function App() {
  return (
    <BrowserRouter>
      <NavbarDummy />
          <Routers />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
