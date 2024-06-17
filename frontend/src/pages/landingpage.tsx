import { Routes } from '@/constants/routes'
import { useRouter } from 'next/router'

const LandingPage = () => {
  const router = useRouter()

  return (
    <>
      <div className="flex flex-col gap-8 pt-60">
        <header className="text-5xl">To-do List</header>
        <button
          className="w-full bg-green-500 text-white p-2 rounded"
          onClick={() => router.push(Routes.REGISTER)}
        >
          Register
        </button>
        <button
          className="w-full bg-blue-500 text-white p-2 rounded"
          onClick={() => router.push(Routes.LOGIN)}
        >
          Login
        </button>
      </div >
    </>
  )
}

export default LandingPage