import { Routes } from "@/constants/routes";
import { useProfile } from "@/hooks/useProfile";
import { useRouter } from "next/router";
import { useState } from "react";
import Form from "./component/form";

const Login = () => {
  const router = useRouter();
  const { setProfileAndStore } = useProfile()
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errMsg, setErrMsg] = useState<string>("")

  const loginUser = async () => {
    if (email && password) {
      try {
        setErrMsg("")
        setLoading(true)
        const res = await fetch(`http://localhost:5000/login`, {
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
          throw new Error("Failed to login");
        }

        setProfileAndStore({ user_id: data.user.user_id, email: email })
        setTimeout(() => {
          router.push(Routes.HOMEPAGE)
        }, 2000);

      } catch (error) {
        setLoading(false);
        console.error("login user error", error);
      }

    }
  };

  return (
    <Form loading={loading} header={"Login"} email={email} setEmail={setEmail} password={password} setPassword={setPassword} errMsg={errMsg} setErrMsg={setErrMsg} buttonText={"Login"} onClick={loginUser} />
  );
};

export default Login;