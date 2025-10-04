import SimpleButton from "../../../Buttons/SimpleButton/SimpleButton";
import Tag from "../../../Tag/Tag";
import classes from "./GamePage.module.css";

export default function GamePage(){
    return(<>
    <video className={classes.video} autoPlay muted loop>
        <source src="/Background/bg1.mp4" type="video/mp4"/>
    </video>
    <div className={classes.div}>
        <div>
            <h1 className={classes.h1}>Panic Plague</h1>
            <section className={classes.tags}>
            <Tag>Horror</Tag>
            <Tag>PC</Tag>
            <Tag>Unreal engine</Tag>
            </section>
        </div>
        <img className={classes.icon} src="/GameData/PanicPlague/Icon.jpg"/>
    </div>
    <div className={classes.mainPart}>
    <section className={classes.screenshots}>
            <img className={classes.screenshot} src="/GameData/PanicPlague/Screenshots/1.png"/>
            <img className={classes.screenshot} src="/GameData/PanicPlague/Screenshots/2.png"/>
            <img className={classes.screenshot} src="/GameData/PanicPlague/Screenshots/3.png"/>
            <img className={classes.screenshot} src="/GameData/PanicPlague/Screenshots/4.png"/>
            <img className={classes.screenshot} src="/GameData/PanicPlague/Screenshots/5.png"/>
            <img className={classes.screenshot} src="/GameData/PanicPlague/Screenshots/6.png"/>
            <img className={classes.screenshot} src="/GameData/PanicPlague/Screenshots/7.png"/>
            <img className={classes.screenshot} src="/GameData/PanicPlague/Screenshots/8.png"/>
        </section>
        <article className={classes.article}>
            <h1 className={classes.desc}>Description</h1>
            <p className={classes.p}>The protagonist's father has gone crazy in his old age and he talks about some monsters in some abandoned place. Therefore, our hero, not believing this nonsense, went to this abandoned place to prove the opposite to his father, but something went wrong... the man fell under the floor of the abandoned building and ended up in an abandoned laboratory. there he will have to reveal all the secrets of this laboratory. In the first chapter, the man has already killed a hybrid of a donkey and a man, which was bred in this laboratory, but he beat the protagonist considerably. so in this game we need to heal and finally get away from this terrible place</p>
        </article>
        <section className={classes.buttons}>
            <SimpleButton buttonType="nav">Donwload last version</SimpleButton>
            <SimpleButton buttonType="nav">View other versions</SimpleButton>
        </section>
        <div className={classes.border}/>
        </div>
    </>)
}