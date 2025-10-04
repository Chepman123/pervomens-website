import BackGround from "../../BackGround/BackGround";
import FeaturedGames from "../../Featured Games/FeaturedGames";
import GamesLink from "../../Featured Games/GamesLink";
import Nav from "../../Nav/Nav";
import NewsPanels from "../../NewsPanel/NewsPanels";

export default function Home(){
    return(
        <><BackGround/>
      <Nav/>
      <GamesLink/>
      <FeaturedGames left={false}/>
      <FeaturedGames left={true}/>
      <FeaturedGames left={false}/>
      <NewsPanels/>
      </>
    )
}