import { type buttonConfig, type buttonType } from "../components/Buttons/SimpleButton/SimpleButton"
const buttons:Record<buttonType,buttonConfig> ={
    details:{
        bgColor: ["rgb(0, 0, 0)","rgb(255, 255, 255)","rgb(180, 180, 180)"],
        textColor: ["white","black","black"],
        border:"0.2px solid white"
    },
    nav:{
        bgColor: ["rgba(53, 73, 165, 1)","rgba(77, 94, 168, 1)","rgba(91, 105, 168, 1)"],
        textColor: ["white","white","white"],
        border:"none"
    }
}
export default buttons;