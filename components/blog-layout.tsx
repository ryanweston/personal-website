import Link from "next/link"
import { MoonIcon } from "@heroicons/react/outline"
import { ArrowLeftIcon } from "@heroicons/react/solid"

export default function BlogLayout({ children }) {
  return (
    <div className="w-screen bg-white text-black py-10 px-10 text-white">
      <div className="flex flex-row justify-between">
        <Link href="/">
          <a className="hover:bg-gray-800 text-black hover:text-white hover:rounded-full py-2 px-2">
            <ArrowLeftIcon className="w-5 h-5"/>
          </a>
        </Link>
        <h2 className='font-alpha text-lg text-black'>Ryan Weston</h2>
        <button className="hover:bg-gray-900 text-black hover:text-white hover:rounded-full py-2 px-2">
          <MoonIcon className="w-5 h-5"/>
        </button>
      </div>
      <div className="w-full flex flex-col items-center">
       
        <div className="lg:w-5/12 xl:w-6/12 mt-20 lg:mt-32">
          { children } 
        </div>
      </div>
    </div>
  )
}