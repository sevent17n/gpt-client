import { Analytics } from "@vercel/analytics/react";

import { Home } from "./components/home";

import { getServerSideConfig } from "./config/server";
import Script from "next/script";

const serverConfig = getServerSideConfig();

export default async function App() {
  return (
    <>
      <Script
        id={"metrika"}
        dangerouslySetInnerHTML={{
          __html: `
                (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
      
                ym(94194196, "init", {
                      clickmap:true,
                      trackLinks:true,
                      accurateTrackBounce:true
                });
              `,
        }}
      />
      <noscript>
        <div>
          <img
            src="https://mc.yandex.ru/watch/94194196"
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
