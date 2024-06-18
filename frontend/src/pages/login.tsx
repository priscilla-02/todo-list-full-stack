import { Routes } from "@/constants/routes";
import { useProfile } from "@/hooks/useProfile";
import { useRouter } from "next/router";
import { useState } from "react";
import Form from "./component/form";

const Login = () => {
  const router = useRouter();
  const { setProfileAndStore } = useProfile()
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errMsg, setErrMsg] = useState<string>("")

  const loginUser = async () => {
    if (email && password) {
      try {
        const res = await fetch(`http://localhost:5000/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email, password: password }),
        });
        const data = await res.json()


        if (!res.ok) {
          setErrMsg(data.error)
          throw new Error("Failed to login");
        }
        setProfileAndStore({ user_id: data.user.user_id, email: email })
        router.push(Routes.HOMEPAGE)
      } catch (error) {
        console.error("login user error", error);
      }
    }
  };

  return (
    <Form header={"Login"} email={email} setEmail={setEmail} password={password} setPassword={setPassword} errMsg={errMsg} setErrMsg={setErrMsg} buttonText={"Login"} onClick={loginUser} />
  );
};

export default Login;