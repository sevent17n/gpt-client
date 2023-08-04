/* eslint-disable @next/next/no-page-custom-font */
import "./styles/globals.scss";
import "./styles/markdown.scss";
import "./styles/highlight.scss";
import { getClientConfig } from "./config/client";
import Script from "next/script";

export const metadata = {
  title: "Джипити",
  description:
    "Djipiti - это улучшенная версия ChatGPT с невероятными возможностями кастомизации и персонализации! Теперь вы можете полностью настроить свой опыт общения с искусственным интеллектом. Выбирайте стиль диалога, настраивайте предпочтения и уровень формальности, чтобы Джипити стал вашим идеальным собеседником.",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  keywords: [
    "ChatGPT на русском,ChatGPT, Chat, GPT, Россия, России, русском, русский, чатгпт, чат, гпт, djipiti, jipiti, джипити, жипити, онлайн, ChatGPT в России ChatGPT",
    "ЧатГПТ",
    "Чат Джипити",
    "Чат Жипити",
    "Djipiti",
    "Нейросети",
    "OpenAI",
    "ChatGPT Россия",
    "ChatGPT на русском",
    "Чат джипити на русском",
    "Чат Жипити в России",
  ],
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#151515" },
  ],
  appleWebApp: {
    title: "Джипити",
    statusBarStyle: "default",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <head>
        <meta name="config" content={JSON.stringify(getClientConfig())} />
        <link rel="manifest" href="/site.webmanifest"></link>
        <link
          rel={"apple-touch-icon"}
          href={"/apple-touch-icon.png"}
          sizes={"180x180"}
        />
        <link
          rel={"icon"}
          type={"image/x-icon"}
          href={"/favicon.ico"}
          sizes={"16x16"}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />

        <Script src="/serviceWorkerRegister.js" defer></Script>
       
      </head>
      <body>
 <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-NSWE0W06R3"
        />
        <Script
          id={"google"}
          dangerouslySetInnerHTML={{
            __html: `
                 (window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-NSWE0W06R3');
              `,
          }}
        />
        <Script
          id={"yandex"}
          dangerouslySetInnerHTML={{
            __html: `
                 (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a[]).push(arguments)};
   m[i].l=1*new Date();
   for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
   k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(93246004, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        webvisor:true
   });
              `,
          }}
        />
        <noscript>
          <div>
            <img
              src="https://mc.yandex.ru/watch/93246004"
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>
{children}</body>
    </html>
  );
}
