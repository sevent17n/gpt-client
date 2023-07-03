"use client";

import NewChat from "@/app/components/NewChat";

require("../polyfill");

import React, { useState, useEffect, useRef } from "react";

import { IconButton } from "./button";
import styles from "./home.module.scss";

import SettingsIcon from "../icons/settings.svg";



import BotIcon from "../icons/bot.svg";
import AddIcon from "../icons/add.svg";
import LoadingIcon from "../icons/three-dots.svg";
import CloseIcon from "../icons/close.svg";

import { useChatStore } from "../store";
import { getCSSVar, isMobileScreen } from "../utils";
import Locale, {getLang} from "../locales";
import { Chat } from "./chat";

import dynamic from "next/dynamic";
import { ErrorBoundary } from "./error";
import { SettingsButton} from "./SettingsButton";
import {LoginButton} from "@telegram-auth/react";
import clsx from "clsx";
import {userStore} from "@/app/store/user";
import {useStore} from "zustand";
import Cookies from "js-cookie";



export function Loading(props: { noLogo?: boolean }) {
  return (
    <div className={styles["loading-content"]}>
      {!props.noLogo && <BotIcon />}
      <LoadingIcon />
    </div>
  );
}

const Settings = dynamic(async () => (await import("./settings")).Settings, {
  loading: () => <Loading noLogo />,
});

const ChatList = dynamic(async () => (await import("./chat-list")).ChatList, {
  loading: () => <Loading noLogo />,
});

function useSwitchTheme() {
  const config = useChatStore((state) => state.config);

  useEffect(() => {
    navigator.language.toLowerCase()
    document.body.classList.remove("light");
    document.body.classList.remove("dark");

    if (config.theme === "Dark") {
      document.body.classList.add("dark");
    } else if (config.theme === "Light") {
      document.body.classList.add("light");
    }

    const metaDescriptionDark = document.querySelector(
      'meta[name="theme-color"][media]',
    );
    const metaDescriptionLight = document.querySelector(
      'meta[name="theme-color"]:not([media])',
    );

    if (config.theme === "Auto") {
      metaDescriptionDark?.setAttribute("content", "#151515");
      metaDescriptionLight?.setAttribute("content", "#fafafa");
    } else {
      const themeColor = getCSSVar("--themeColor");
      metaDescriptionDark?.setAttribute("content", themeColor);
      metaDescriptionLight?.setAttribute("content", themeColor);
    }
  }, [config.theme]);
}

function useDragSideBar() {
  const limit = (x: number) => Math.min(500, Math.max(220, x));

  const chatStore = useChatStore();
  const startX = useRef(0);
  const startDragWidth = useRef(chatStore.config.sidebarWidth ?? 300);
  const lastUpdateTime = useRef(Date.now());

  const handleMouseMove = useRef((e: MouseEvent) => {
    if (Date.now() < lastUpdateTime.current + 100) {
      return;
    }
    lastUpdateTime.current = Date.now();
    const d = e.clientX - startX.current;
    const nextWidth = limit(startDragWidth.current + d);
    chatStore.updateConfig((config) => (config.sidebarWidth = nextWidth));
  });

  const handleMouseUp = useRef(() => {
    startDragWidth.current = chatStore.config.sidebarWidth ?? 300;
    window.removeEventListener("mousemove", handleMouseMove.current);
    window.removeEventListener("mouseup", handleMouseUp.current);
  });

  const onDragMouseDown = (e: MouseEvent) => {
    startX.current = e.clientX;

    window.addEventListener("mousemove", handleMouseMove.current);
    window.addEventListener("mouseup", handleMouseUp.current);
  };

  useEffect(() => {
    if (isMobileScreen()) {
      return;
    }
    document.documentElement.style.setProperty(
      "--sidebar-width",
      `${limit(chatStore.config.sidebarWidth ?? 300)}px`,
    );
  }, [chatStore.config.sidebarWidth]);

  return {
    onDragMouseDown,
  };
}

const useHasHydrated = () => {
  const [hasHydrated, setHasHydrated] = useState<boolean>(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  return hasHydrated;
};

function _Home() {
  const [createNewSession, currentIndex, removeSession] = useChatStore(
    (state) => [
      state.newSession,
      state.currentSessionIndex,
      state.removeSession,
    ],
  );
  const chatStore = useChatStore();
  const loading = !useHasHydrated();
  const [showSideBar, setShowSideBar] = useState(true);

  // setting
  const [openSettings, setOpenSettings] = useState(false);
  const config = useChatStore((state) => state.config);

  // drag side bar
  const { onDragMouseDown } = useDragSideBar();
  const [isAuthButtonShown,setIsAuthButtonShown] = useState(false)
  const refreshToken = Cookies.get("refreshToken")
  useEffect(()=> {
    !refreshToken && setIsAuthButtonShown(true)
  },[])
  useSwitchTheme();
  // @ts-ignore
  const {Login} = useStore(userStore)
  if (loading) {
    return <Loading />;
  }



  // @ts-ignore
  return (
    <div
      className={`${
        config.tightBorder && !isMobileScreen()
          ? styles["tight-container"]
          : styles.container
      }`}
    >
      <div
        className={styles.sidebar + ` ${showSideBar && styles["sidebar-show"]}`}
      >
        <div className={styles["sidebar-header"]}>
          <div className={styles["sidebar-title"]}>Djipiti</div>
          <div className={styles["sidebar-sub-title"]}>
          </div>
        </div>

        <div
          className={styles["sidebar-body"]}
          onClick={() => {
            setOpenSettings(false);
            setShowSideBar(false);
          }}
        >
          <div>
            <NewChat
                icon={<AddIcon />}
                text={Locale.Home.NewChat}
                onClick={() => {
                  createNewSession();
                  setShowSideBar(false);
                }}
            />
          </div>
          <ChatList />
        </div>

        <div className={styles["sidebar-tail"]}>
          <div className={styles["sidebar-actions"]}>
            <div className={styles["sidebar-action"] + " " + styles.mobile}>
              <IconButton
                icon={<CloseIcon />}
                text={Locale.Memory.Reset}
                onClick={chatStore.deleteSession}
              />
            </div>
            <div className={clsx(styles["sidebar-action"],styles.authButton) } >
              {isAuthButtonShown &&<LoginButton
                  botUsername={"Djipiti_test_bot"}
                  buttonSize="large" // "large" | "medium" | "small"
                  cornerRadius={5} // 0 - 20
                  showAvatar={true} // true | false
                  onAuthCallback={(data) => {
                    Login(data)
                    // call your backend here to validate the data and sign in the user
                  }}
                  lang={getLang()}
              />}

            </div>
            <div className={styles["sidebar-action"]}>
              <SettingsButton
                  icon={<SettingsIcon/>}
                onClick={() => {
                  setOpenSettings(true);
                  setShowSideBar(false);
                }}

              />
            </div>
          </div>
        </div>
        <div
          className={styles["sidebar-drag"]}
          onMouseDown={(e) => onDragMouseDown(e as any)}
        ></div>
      </div>
      <div className={styles["window-content"]}>
        {openSettings ? (
          <Settings
            closeSettings={() => {
              setOpenSettings(false);
              setShowSideBar(true);
            }}
          />
        ) : (
          <Chat
            key="chat"
            showSideBar={() => setShowSideBar(true)}
            sideBarShowing={showSideBar}
          />
        )}
      </div>
    </div>
  );
}

export function Home() {
  return (
    <ErrorBoundary>
      <_Home></_Home>
    </ErrorBoundary>
  );
}
