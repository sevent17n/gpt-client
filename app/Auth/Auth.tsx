"use client";
import styles from "./Auth.module.scss";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { LoginButton } from "@telegram-auth/react";
import { userStore } from "@/app/store/user";
import Cookies from "js-cookie";
import {useEffect} from "react"


export default function Auth() {
  const {Register,Error, Login} = userStore() as any
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const [user,setUser]= useState<string | null>(' ')
  const { Logout, CheckAuth } = userStore() as any
  useEffect(() => {
     CheckAuth()
  }, [])

  useEffect(() => {
    const refreshToken = Cookies.get("refreshToken")
    if (!refreshToken) Logout()
  }, [])
  useEffect(()=> {
    setUser(localStorage.getItem("user"))
  },[localStorage.getItem("user")])
  const [isLogin, setIsLogin] = useState(true);


  return (
    <>
      {!user &&  <div className={styles.container}>
        <div>
          {isLogin ?
            <>
              <h1>To start you have to login</h1>
              <form onSubmit={handleSubmit((data) =>
                Login(data.emailOrLogin,data.password)

              )}
                    className={styles.form}>
                <input {...register("emailOrLogin",{ required: true })} />
                {errors.login && <p>UserName is required.</p>}
                <input {...register("password" ,{ required: true })}/>
                {errors.password && <p>Password must be at least 6 characters</p>}
                <input type="submit" />
              </form>
              {Error}
              <LoginButton
                botUsername={"Djipiti_test_bot"}
                buttonSize="large" // "large" | "medium" | "small"
                cornerRadius={5} // 0 - 20
                showAvatar={true} // true | false
                onAuthCallback={(data) => {
                  console.log(data);
                  // call your backend here to validate the data and sign in the user
                }}
                lang="ru"
              />
              <p onClick={()=>setIsLogin(false)}>Dont have an account? Register</p>
            </>
            :
            <>
              <h1>Create an account</h1>
              <form onSubmit={handleSubmit((data) =>
                Register(data.email,data.login,data.password)

              )}
                    className={styles.form}>
                <input {...register("login",{ required: true })} />
                {errors.login && <p>UserName is required.</p>}
                <input {...register("email" ,{ required: true })}/>
                {errors.email && <p>Email is required.</p>}
                <input {...register("password" ,{ required: true })}/>
                {errors.password && <p>Password must be at least 6 characters</p>}
                <input type="submit" />
              </form>
              {Error}
              <LoginButton
                botUsername={"Djipiti_test_bot"}
                buttonSize="large" // "large" | "medium" | "small"
                cornerRadius={20} // 0 - 20
                showAvatar={true} // true | false
                onAuthCallback={(data) => {
                  console.log(data);
                  // call your backend here to validate the data and sign in the user
                }}
              />
              <p onClick={()=>setIsLogin(true)}>Already has an account? Login</p>
            </>
          }
        </div>
      </div>}

    </>
  );
}