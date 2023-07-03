import {useState, useEffect, useMemo, HTMLProps} from "react";

import EmojiPicker, {Theme as EmojiTheme} from "emoji-picker-react";

import styles from "./settings.module.scss";

import ResetIcon from "../icons/reload.svg";
import CloseIcon from "../icons/close.svg";
import ClearIcon from "../icons/clear.svg";
import EditIcon from "../icons/edit.svg";
import EyeIcon from "../icons/eye.svg";
import EyeOffIcon from "../icons/eye-off.svg";

import {List, ListItem, Popover, showToast} from "./ui-lib";

import {IconButton} from "./button";
import {
    SubmitKey,
    useChatStore,
    Theme,
    ALL_MODELS,
    ModalConfigValidator,
} from "../store";
import {Avatar} from "./chat";

import Locale, {AllLangs, changeLang, getLang} from "../locales";
import {getEmojiUrl} from "../utils";
import {SearchService, usePromptStore} from "../store/prompt";
import {requestUsage} from "../requests";
import {ErrorBoundary} from "./error";
import {InputRange} from "./input-range";

function SettingItem(props: {
    title: string;
    subTitle?: string;
    children: JSX.Element;
}) {
    return (
        <ListItem>
            <div className={styles["settings-title"]}>
                <div>{props.title}</div>
                {props.subTitle && (
                    <div className={styles["settings-sub-title"]}>{props.subTitle}</div>
                )}
            </div>
            {props.children}
        </ListItem>
    );
}

function PasswordInput(props: HTMLProps<HTMLInputElement>) {
    const [visible, setVisible] = useState(false);

    function changeVisibility() {
        setVisible(!visible);
    }

    return (
        <div className={styles["password-input-container"]}>
            <IconButton
                icon={visible ? <EyeIcon/> : <EyeOffIcon/>}
                onClick={changeVisibility}
                className={styles["password-eye"]}
            />
            <input
                {...props}
                type={visible ? "text" : "password"}
                className={styles["password-input"]}
            />
        </div>
    );
}

const TelegramButton = () => {
    return (
        <div className={styles.Telegram}>
            <div>
                 <h3>Контакты:</h3>
                <a href="tel:+79117444280">+7 (911) 744 42-80</a>
                <a href="mailto:djipiti.contact@gmail.com">djipiti.contact@gmail.com</a>
            </div>
            <button ><a href={'https://t.me/Djipiti'} target={'_blank'}>
            <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" >
                <path
                    d="M17.688 21.744a2.02 2.02 0 0 1-1.242-.427l-4.03-3.122l-2.702 2.983a1 1 0 0 1-1.698-.383l-2.02-6.682l-3.626-1.26a2.042 2.042 0 0 1-.103-3.818L20.187 1.8a2.042 2.042 0 0 1 2.771 2.295L19.695 20.11a2.054 2.054 0 0 1-2.008 1.633Z"
                    opacity="0.9"/>
                <path

                    d="M8.973 21.506a1 1 0 0 1-.957-.71l-2.168-7.16a.999.999 0 0 1 .495-1.176L16.91 6.958a1 1 0 0 1 1.17 1.594l-7.084 7.083l-1.044 5.072a1 1 0 0 1-.933.798h-.046Z"  />
            </svg></span>
            </a></button>
        </div>

    )
}

export function Settings(props: { closeSettings: () => void }) {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [config, updateConfig, resetConfig, clearAllData, clearSessions] =
        useChatStore((state) => [
            state.config,
            state.updateConfig,
            state.resetConfig,
            state.clearAllData,
            state.clearSessions,
        ]);


    const [usage, setUsage] = useState<{
        used?: number;
        subscription?: number;
    }>();
    const [loadingUsage, setLoadingUsage] = useState(false);

    function checkUsage() {
        setLoadingUsage(true);
        requestUsage()
            .then((res) => setUsage(res))
            .finally(() => {
                setLoadingUsage(false);
            });
    }


    const promptStore = usePromptStore();
    const builtinCount = SearchService.count.builtin;
    const customCount = promptStore.prompts.size ?? 0;

    useEffect(() => {
        const keydownEvent = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                props.closeSettings();
            }
        };
        document.addEventListener("keydown", keydownEvent);
        return () => {
            document.removeEventListener("keydown", keydownEvent);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <ErrorBoundary>
            <div className={styles["window-header"]}>
                <div className={styles["window-header-title"]}>
                    <div className={styles["window-header-main-title"]}>
                        {Locale.Settings.Title}
                    </div>
                </div>
                <div className={styles["window-actions"]}>
                    <div className={styles["window-action-button"]}>
                        <IconButton
                            icon={<ClearIcon/>}
                            onClick={() => {
                                const confirmed = window.confirm(
                                    `${Locale.Settings.Actions.ConfirmClearAll.Confirm}`,
                                );
                                if (confirmed) {
                                    clearSessions();
                                }
                            }}
                            bordered
                            title={Locale.Settings.Actions.ClearAll}
                        />
                    </div>
                    <div className={styles["window-action-button"]}>
                        <IconButton
                            icon={<ResetIcon/>}
                            onClick={() => {
                                const confirmed = window.confirm(
                                    `${Locale.Settings.Actions.ConfirmResetAll.Confirm}`,
                                );
                                if (confirmed) {
                                    resetConfig();
                                }
                            }}
                            bordered
                            title={Locale.Settings.Actions.ResetAll}
                        />
                    </div>
                    <div className={styles["window-action-button"]}>
                        <IconButton
                            icon={<CloseIcon/>}
                            onClick={props.closeSettings}
                            bordered
                            title={Locale.Settings.Actions.Close}
                        />
                    </div>
                </div>
            </div>
            <div className={styles["settings"]}>
                <List>
                    <SettingItem title={Locale.Settings.Avatar}>
                        <Popover
                            onClose={() => setShowEmojiPicker(false)}
                            content={
                                <EmojiPicker
                                    lazyLoadEmojis
                                    theme={EmojiTheme.AUTO}
                                    getEmojiUrl={getEmojiUrl}
                                    onEmojiClick={(e) => {
                                        updateConfig((config) => (config.avatar = e.unified));
                                        setShowEmojiPicker(false);
                                    }}
                                />
                            }
                            open={showEmojiPicker}
                        >
                            <div
                                className={styles.avatar}
                                onClick={() => setShowEmojiPicker(true)}
                            >
                                <Avatar role="user"/>
                            </div>
                        </Popover>
                    </SettingItem>


                    <ListItem>
                        <div className={styles["settings-title"]}>
                            {Locale.Settings.Theme}
                        </div>
                        <select
                            value={config.theme}
                            onChange={(e) => {
                                updateConfig(
                                    (config) => (config.theme = e.target.value as any as Theme),
                                );
                            }}
                        >
                            {Object.values(Theme).map((v) => (
                                <option value={v} key={v}>
                                    {v}
                                </option>
                            ))}
                        </select>
                    </ListItem>

                    <SettingItem title={Locale.Settings.Lang.Name}>
                        <select
                            value={getLang()}
                            onChange={(e) => {
                                changeLang(e.target.value as any);
                            }}
                        >
                            {AllLangs.map((lang) =>
                                (
                                    <option value={lang} key={lang}>
                                        {
                                            // @ts-ignore
                                            Locale.Settings.Lang.Options[lang]
                                        }
                                    </option>
                                ))}
                        </select>
                    </SettingItem>

                    <SettingItem
                        title={Locale.Settings.FontSize.Title}
                    >
                        <InputRange
                            title={`${config.fontSize ?? 14}px`}
                            value={config.fontSize}
                            min="12"
                            max="18"
                            step="1"
                            onChange={(e) =>
                                updateConfig(
                                    (config) =>
                                        (config.fontSize = Number.parseInt(e.currentTarget.value)),
                                )
                            }
                        ></InputRange>
                    </SettingItem>
                </List>
                <TelegramButton/>
            </div>
        </ErrorBoundary>
    );
}
