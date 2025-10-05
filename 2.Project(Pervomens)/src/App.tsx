import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Main/Home/Home';
import Games from './components/Main/Games/Games';
import GamePage from "./components/Main/Games/GamePage/GamePage"
export default function App() {
  return (
    <>
      <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Games" element={<Games/>}/>
        <Route path='/Games/:urlName' element={<GamePage/>}/>
      </Routes>
       <Footer/>
      </BrowserRouter>
     
    </>
  );

}

