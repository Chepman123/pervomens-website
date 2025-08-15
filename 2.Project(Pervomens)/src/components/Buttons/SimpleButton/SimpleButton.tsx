import classes from'./SimpleButton.module.css';
import buttons from '../../../common/buttonConfigs'
import type { CSSProperties } from 'react';

export type buttonType = "nav"|"details";

export interface buttonConfig{
    bgColor:[string,string,string];
    textColor:[string,string,string];
    border:string;
}

export default function SimpleButton({children, buttonType}:{children:string,buttonType:buttonType}){
    const config:buttonConfig|undefined = buttons[buttonType];
    const style = config
  ? ({
      '--bg-color': config.bgColor[0],
      '--text-color': config.textColor[0],
      '--border': config.border,
      '--bg-hover': config.bgColor[1],
      '--text-hover': config.textColor[1],
      '--bg-active': config.bgColor[2],
      '--text-active': config.textColor[2],
    } as CSSProperties)
  : undefined;

        return(
            <button className={classes.button} style={style}>{children}</button>
        );
}