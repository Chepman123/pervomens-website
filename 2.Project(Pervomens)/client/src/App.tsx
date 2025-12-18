import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Main/Home/Home';
import Games from './components/Main/Games/Games';
import GamePage from "./components/Main/Games/GamePage/GamePage"
import News from './components/Main/News/News';
import NewsPage from './components/Main/News/NewsPage';
import ScrollToStart from './components/ScrollToStart';
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
      </Routes>
       <Footer/>
      </BrowserRouter>
     
    </>
  );

}

