import { Routes } from "@/constants/routes";
import { useProfile } from "@/hooks/useProfile";
import { useRouter } from "next/router";
import { useState } from "react";
import StyledButton from "./component/styledButton";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errMsg, setErrMsg] = useState<string>("")
  const router = useRouter();
  const { setProfileAndStore } = useProfile()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const loginUser = async () => {
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
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-gray-500">
      <form className="w-full max-w-sm" onSubmit={handleSubmit}>
        <h2 className="text-center text-2xl mb-4">Login</h2>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded text-black"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded text-black"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errMsg && <p className="text-red-500 pb-2">*{errMsg}</p>}
        <div className="flex items-center justify-between">
          <StyledButton text={"Login"} onClick={() => loginUser()} customStyle={"bg-sky-500 hover:bg-sky-700"} />
        </div>
      </form>
    </div>
  );
};
export default Login;