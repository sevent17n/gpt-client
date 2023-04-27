import { Home } from "@/app/components/home";
import Auth from "@/app/Auth/Auth";
import Cookies from "js-cookie";
import { userStore } from "@/app/store/user";



export default async function Page() {

  return (
    <>
      <Auth/>
      <Home />
    </>
  );
}
