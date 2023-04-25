import { Analytics } from "@vercel/analytics/react";
import { Home } from "@/app/components/home";
import { getServerSideConfig } from "@/app/config/server";
import Auth from "@/app/Auth/Auth";



const serverConfig = getServerSideConfig();

export default async function Page() {
  return (
    <>
      {/*<Auth/>*/}
      <Home />
    </>
  );
}
