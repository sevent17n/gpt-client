import React, {FC, ReactNode} from 'react';
import styles from "./NewChat.module.scss"

interface INewChat{
    onClick:()=> void
    icon:ReactNode
    text:string
}
const NewChat:FC<INewChat> = ({onClick,icon,text}) => {
    return (
        <button onClick={onClick} className={styles.button}>
            <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path  d="M11 19v-6H5v-2h6V5h2v6h6v2h-6v6h-2Z"/></svg></span> <p>{text}</p>
        </button>
    );
};

export default NewChat;