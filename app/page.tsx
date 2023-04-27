import { Home } from "@/app/components/home";
import Auth from "@/app/Auth/Auth";
import dynamic from "next/dynamic";


const DynamicAuth = dynamic(()=> import('@/app/Auth/Auth'),{
  ssr:false
})

export default async function Page() {

  return (
    <>
      <DynamicAuth/>
      <Home />
    </>
  );
}
