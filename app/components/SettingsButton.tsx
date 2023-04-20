import React, {FC, ReactNode} from 'react';
import Locale from "@/app/locales";
import styles from "./NewChat.module.scss"
interface ISettingsButton{
    onClick:()=> void
    icon:ReactNode
}
const SettingsButton:FC<ISettingsButton> = ({onClick,icon}) => {
    return (
        <button onClick={onClick} className={styles.settings}>
            <span>{icon}</span>
            <p>{Locale.Settings.Title}рпорпопрорпопро</p>
        </button>
    );
};

export default SettingsButton;