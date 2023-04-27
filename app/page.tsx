import { Home } from "@/app/components/home";
import Auth from "@/app/Auth/Auth";




export default async function Page() {

  return (
    <>
      <Auth/>
      <Home />
    </>
  );
}
