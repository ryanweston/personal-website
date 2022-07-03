import Link from "next/link"
import { MoonIcon } from "@heroicons/react/outline"
import { ArrowLeftIcon } from "@heroicons/react/solid"

export default function BlogLayout({ children }) {
  return (
    <div className="w-screen bg-black py-10 px-10 text-white">
      <div className="flex flex-row justify-between">
        <Link href="/">
          <a>
            <ArrowLeftIcon className="w-5 h-5"/>
          </a>
        </Link>
        <h2 className='font-alpha text-lg'>Ryan Weston</h2> 
        <MoonIcon className="w-5 h-5"/>
      </div>
      <div className="w-full flex flex-col items-center">
       
        <div className="w-2/5 mt-32">
          { children } 
        </div>
      </div>
    </div>
  )
}