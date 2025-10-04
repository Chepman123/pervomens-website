import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Main/Home/Home';
import Games from './components/Main/Games/Games';

export default function App() {
  return (
    <>
      
      <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/Games" element={<Games/>}></Route>
      </Routes>
       <Footer/>
      </BrowserRouter>
     
    </>
  );

}

