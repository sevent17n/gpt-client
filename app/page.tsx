import { Analytics } from "@vercel/analytics/react";

import { Home } from "./components/home";

import { getServerSideConfig } from "./config/server";
import Script from "next/script";

const serverConfig = getServerSideConfig();

export default async function App() {
  return (
    <>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-NSWE0W06R3"/>
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
      <Home />
      {serverConfig?.isVercel && <Analytics />}
    </>
  );
}
