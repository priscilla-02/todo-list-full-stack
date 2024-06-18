import { Routes } from '@/constants/routes'
import { useRouter } from 'next/router'
import StyledButton from './component/styledButton'

const LandingPage = () => {
  const router = useRouter()

  return (
    <>
      <div className="flex flex-col gap-8 desktop:pt-60">
        <header className="text-5xl">To-do List</header>
        <StyledButton text={"Register"} onClick={() => router.push(Routes.REGISTER)} customStyle={"bg-green-500 hover:bg-green-700"} />
        <StyledButton text={"Login"} onClick={() => router.push(Routes.LOGIN)} customStyle={"bg-sky-500 hover:bg-sky-700"} />
      </div >
    </>
  )
}

export default LandingPage