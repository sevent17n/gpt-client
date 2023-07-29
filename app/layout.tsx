/* eslint-disable @next/next/no-page-custom-font */
import "./styles/globals.scss";
import "./styles/markdown.scss";
import "./styles/highlight.scss";
import { getClientConfig } from "./config/client";

export const metadata = {
  title: "ChatGPT на русском языке в России и СНГ | Djipiti | Джипити",
  description: "Djipiti - это улучшенная версия ChatGPT с невероятными возможностями кастомизации и персонализации! Теперь вы можете полностью настроить свой опыт общения с искусственным интеллектом. Выбирайте стиль диалога, настраивайте предпочтения и уровень формальности, чтобы Джипити стал вашим идеальным собеседником.",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  keywords:["ChatGPT","ЧатГПТ","Чат Джипити","Чат Жипити","Djipiti","Нейросети","OpenAI","ChatGPT Россия","ChatGPT на русском","Чат джипити на русском","Чат Жипити в России"],
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#151515" },
  ],
  appleWebApp: {
    title: "ChatGPT на русском языке в России и СНГ | Djipiti | Джипити",
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
        <script src="/serviceWorkerRegister.js" defer></script>
      </head>
      <body>{children}</body>
    </html>
  );
}
