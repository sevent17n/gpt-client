import React, {FC, ReactNode} from 'react';
import Locale from "@/app/locales";
import styles from "./NewChat.module.scss"
import {LoginButton} from "@telegram-auth/react";
interface ISettingsButton{
    onClick:()=> void
    icon:ReactNode
}
export const SettingsButton:FC<ISettingsButton> = ({onClick,icon}) => {
    return (
        <button onClick={onClick} className={styles.settings}>
            <span>{icon}</span>
            <p>{Locale.Settings.Title}</p>
        </button>
    );
};



