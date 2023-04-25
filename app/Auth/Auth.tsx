"use client";
import styles from "./Auth.module.scss";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { LoginButton } from "@telegram-auth/react";

export default function Auth() {
  const [isAuth, setIsAuth] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  return (
    <div className={styles.container}>
      <div>
        {isAuth ?
          <>
            <h1>To start you have to login</h1>
            <form onSubmit={handleSubmit((data) => console.log(data))} className={styles.form}>
              <input {...register("firstName",{ required: true })} />
              {errors.lastName && <p>UserName is required.</p>}
              <input {...register("email" )}/>
              {errors.email && <p>Please enter number for age.</p>}
              <input {...register("password" )}/>
              {errors.password && <p>Please enter number for age.</p>}
              <input type="submit" />
            </form>
            <LoginButton
              botUsername={process.env.BOT_USERNAME || ''}
              buttonSize="large" // "large" | "medium" | "small"
              cornerRadius={5} // 0 - 20
              showAvatar={true} // true | false
              lang="ru"
            />
            <p onClick={()=>setIsAuth(false)}>Dont have an account? Register</p>
          </>
          :
          <>
            <h1>Create an account</h1>
            <form onSubmit={handleSubmit((data) => console.log(data))} className={styles.form}>
              <input {...register("firstName")} />
              <input {...register("lastName", { required: true })} />
              {errors.lastName && <p>Last name is required.</p>}
              <input {...register("age", { pattern: /\d+/ })} />
              {errors.age && <p>Please enter number for age.</p>}
              <input type="submit" />
            </form>
            <LoginButton
              botUsername={"Djipiti_test_bot"}
              buttonSize="large" // "large" | "medium" | "small"
              cornerRadius={5} // 0 - 20
              showAvatar={true} // true | false
              lang="ru"
            />
            <p onClick={()=>setIsAuth(true)}>Already has an account? Login</p>
          </>
        }
      </div>
    </div>
  );
}