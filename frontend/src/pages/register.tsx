import { Routes } from "@/constants/routes";
import { useRouter } from "next/router";
import { useState } from "react";

const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errMsg, setErrMsg] = useState<string>("")

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const registerUser = async () => {
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
        setErrMsg(data.error[0].message)
        throw new Error("Failed to register");
      }
      router.push(Routes.LOGIN)

    } catch (error) {
      console.error("register user error", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-gray-500">
      <form className="w-full max-w-sm" onSubmit={handleSubmit}>
        <h2 className="text-center text-2xl mb-4">Register</h2>
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
          <button
            className="w-full bg-green-500 text-white p-2 rounded"
            type="submit"
            onClick={() => registerUser()}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};
export default Register