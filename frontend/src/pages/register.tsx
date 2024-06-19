import { Routes } from "@/constants/routes";
import { useRouter } from "next/router";
import { useState } from "react";
import Form from "./component/form";

const Register = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errMsg, setErrMsg] = useState<string>("")

  const registerUser = async () => {
    if (email && password) {
      try {
        setErrMsg("")
        setLoading(true)
        const res = await fetch(`http://localhost:5000/users/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email, password: password }),
        });
        const data = await res.json()

        if (!res.ok) {

          data.error[0].message ? setErrMsg(data.error[0].message) :
            data.error ? setErrMsg(data.error)
              : setErrMsg("")

          setLoading(false);
          throw new Error("Failed to register");
        }

        setTimeout(() => {
          router.push(Routes.LOGIN)
        }, 2000);
      } catch (error) {
        setLoading(false);
        console.error("register user error", error);
      }
    }
  };

  return (
    <Form loading={loading} header={"Register"} email={email} setEmail={setEmail} password={password} setPassword={setPassword} errMsg={errMsg} setErrMsg={setErrMsg} buttonText={"Register"} onClick={registerUser} />
  );
};

export default Register