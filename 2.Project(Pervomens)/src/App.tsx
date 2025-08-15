import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Nav from './components/Nav/Nav';
import BackGround from './components/BackGround/BackGround';
import FeaturedGames from './components/Featured Games/FeaturedGames';

export default function App() {
  return (
    <>
      <Header/>
      <BackGround/>
      <Nav/>
      <FeaturedGames left={false}/>
      <FeaturedGames left={true}/>
      <FeaturedGames left={false}/>
      <Footer/>
    </>
  );

}

