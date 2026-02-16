import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ScrollToStart from './components/ScrollToStart';
import Login from './components/Pages/RegLog/Login';
import Reg from './components/Pages/RegLog/Reg';
import Profile from './components/Pages/Profile/Profile';
import Home from './components/Pages/Home/Home';
import Games from './components/Pages/Main/Games/Games';
import News from './components/Pages/News/News';
import GamePage from './components/Pages/Main/Games/GamePage/GamePage';
import NewsPage from './components/Pages/News/NewsPage';
export default function App() {
  return (
    <>
      <BrowserRouter>
      <Header/>
      <ScrollToStart/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Games" element={<Games/>}/>
        <Route path='/News' element={<News/>}/>
        <Route path='/Games/:urlName' element={<GamePage/>}/>
        <Route path='/News/:newsId' element={<NewsPage/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/Reg' element={<Reg/>}/>
        <Route path='/profile/:username' element={<Profile/>}/>
      </Routes>
       <Footer/>
      </BrowserRouter>
     
    </>
  );

}

