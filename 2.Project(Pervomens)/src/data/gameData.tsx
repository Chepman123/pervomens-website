export interface gameData{
  tittle:string,
  platform:string,
  genre:string,
  engine:string,
  description:string,
  screenshots:string[],
  urlName:string
};

export const data:gameData[] = [
    {
        tittle:"Panic Plague",
        platform:"PC",
        genre:"Horror",
        engine:"Unreal engine",
        description:"You find yourself in strange circumstances. You’re holding a knife in your hands, while a voice on the phone is trying to talk you out of committing suicide. You’ve forgotten everything that happened before this moment. Your goal is to find out who you are, what you’ve done, and who the man constantly calling you really is",
        screenshots:['1','2','3','4','5','6','7','8'],
        urlName:"PanicPlague"
    },
    {
        tittle:"Project Dream Nightmare",
        platform:"Android",
        genre:"Horror",
        engine:"Unity",
        description:"Your uncle worked in a laboratory and used to tell you about incredible experiments. His son decided to prove that there was nothing unusual there and went inside. When he came back, he looked terrible and refused to talk about what had happened. He brought you an amulet that turned out to be cursed and is slowly killing you. The only way to get rid of it is to return it to its original place in that same laboratory",
        screenshots:['1','2','3','4','5','6'],
        urlName:"ProjectDreamNightmare"
    },
    {
        tittle:"Heavenly Rocks",
        platform:"PC",
        genre:"Roguelike",
        engine:"Unity",
        description:"Become a tester of the new Heavenly Rocks system. Exciting and rich worlds, various puzzles, character progression, and hidden secrets await you",
        screenshots:['1','2','3','4'],
        urlName:"HeavenlyRocks"
    },
    {
        tittle:"Tragedy Is Aproaching",
        platform:"PC",
        genre:"Survival",
        engine:"Unity",
        description:"Can you survive in a realistic zombie apocalypse? Explore a rich and immersive world — trade with locals, complete their quests, build your own base, and fight against raiders and zombies to stay alive",
        screenshots:['1','2','3','4','5','6','7','8','9'],
        urlName:"TragedyIsAproaching"
    },
]