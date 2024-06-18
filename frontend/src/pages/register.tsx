import { Routes } from "@/constants/routes";
import { useRouter } from "next/router";
import { useState } from "react";
import Form from "./component/form";

const Register = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errMsg, setErrMsg] = useState<string>("")

  const registerUser = async () => {
    if (email && password) {
      try {
        const res = await fetch(`http://localhost:5000/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email, password: password }),
        });
        const data = await res.json()

        if (!res.ok) {
          setErrMsg(data.error)
          throw new Error("Failed to register");
        }
        router.push(Routes.LOGIN)

      } catch (error) {
        console.error("register user error", error);
      }
    }
  };

  return (
    <Form header={"Register"} email={email} setEmail={setEmail} password={password} setPassword={setPassword} errMsg={errMsg} setErrMsg={setErrMsg} buttonText={"Register"} onClick={registerUser} />
  );
};

export default Register