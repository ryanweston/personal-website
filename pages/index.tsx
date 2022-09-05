import Head from 'next/head'
import Link from 'next/link';
import Date from '../components/date';
import { getSortedPostsData } from '../lib/posts';
import { Suspense } from 'react'

import { useFrame } from '@react-three/fiber';

import { ChevronDownIcon } from '@heroicons/react/solid'
import { useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'

import { useGLTF } from '@react-three/drei'

export function Model({ ...props }) {
  const group = useRef()

  // @ts-ignore
  const { nodes } = useGLTF('/models/doinky.glb')

  useFrame(() => { 
    // @ts-ignore
    group.current.rotation.y += 0.002;
  })

  return (
    <group ref={group} {...props} dispose={null} position={[0,-7,0]}>
      <mesh geometry={nodes.doinkmmGroup0.geometry} >
        <meshStandardMaterial wireframe={true} color={0x000000}/>
      </mesh>
    </group>
  )
}

useGLTF.preload('/models/doinky.glb')

export default function Home({ allPostsData }: any) {

  const [aspect, setAspect] = useState(null)

  useEffect(() => { 
    // setAspect((window.innerWidth / 2) / (window.innerHeight / 2))
  }, [setAspect])

  return (
    <div className="flex flex-col lg:flex-row w-screen">
      <Head>
        <title>Ryan Weston</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className='w-full lg:w-1/2 h-screen px-10 py-10 relative bg-white text-black overflow-hidden'>
      <div className="flex flex-row font-alpha z-50 relative">
          <a href="#" className='hover:line-through'>Twitter</a>
          <a href="#" className="ml-4 md:ml-8 hover:line-through">GitHub</a>
          <a href="#" className='ml-4 md:ml-8 hover:line-through'>YouTube</a>
        </div>
        <div className="absolute z-40 top-0 left-0 h-full flex flex-col justify-center align-center overflow-hidden">
          <div className="marquee">
              <div className='marquee_inner'>
                <div className="content font-bold font-alpha disable-ligatures">
                  RYAN WESTON RYAN WESTON RYAN WESTON RYAN WESTON RYAN WESTON RYAN WESTON RYAN WESTON 
                </div>
              </div>
          </div>
        </div>
        <div className="absolute z-0 top-0 left-0 h-full w-full opacity-25">
          <Canvas camera={{fov: 45, aspect: aspect, near: 0.1, far: 100, position: [20, 0, 0]}}>
            <ambientLight color="#FFFFFF" intensity={10}/>
            <pointLight color="#FFFFFF" intensity={15}/>
            <Suspense fallback={null}>
              <Model />
            </Suspense>
          </Canvas>
        </div>
      </section>

      <section className='w-full lg:w-1/2 bg-white h-screen flex flex-col lg:overflow-y-scroll'>
        <div className="px-10 py-14 lg:px-20 lg:py-20">
          <h2 className='font-alpha disable-ligatures text-black text-4xl lg:text-5xl font-light'>
            I’m a software engineer & designer passionate about building things. 
          </h2>
        </div>
        <div className='group px-10 lg:px-20  bg-white relative '>
          <h2 className='text-xl mb-6 text-black font-alpha font-bold'>Projects</h2>
            <div  className="flex flex-row text-black border-t border-black py-6">
                <p className="text-xl font-alpha disable-ligatures hover:line-through">
                  Unlocked
                </p>
                <p className="text-xl ml-4 opacity-50 font-alpha disable-ligatures hover:line-through">
                  An interactive generative piece
                </p>
            </div>
            <div  className="flex flex-row text-black border-t border-black py-6">
                <p className="text-xl font-alpha disable-ligatures hover:line-through">
                  EcoScan
                </p>
                <p className="text-xl ml-4 opacity-50 font-alpha disable-ligatures hover:line-through">
                  An interactive generative piece
                </p>
            </div>
            <div  className="flex flex-row text-black border-t border-black py-6">
                <p className="text-xl font-alpha disable-ligatures hover:line-through">
                  Be
                </p>
                <p className="text-xl ml-4 opacity-50 font-alpha disable-ligatures hover:line-through">
                  An interactive generative piece
                </p>
            </div>
            
          
          <ChevronDownIcon className='h-10 w-10 text-white absolute bottom-10 right-10 group-hover:hidden'/>
        </div>

        <div className='group px-10 lg:px-20  bg-white mt-10 relative'>
          <h2 className='text-xl mb-6 text-black font-alpha font-bold'>Writing</h2>
          {allPostsData.map(({ id, date, title }: { id: string, date: string, title: string}) => (
            <div key={id} className="flex flex-col text-black border-t border-black py-6">
              <Link href={'/posts/' + id}>
                <a key={id} className="text-xl font-alpha disable-ligatures hover:line-through">
                  {title}
                </a>
              </Link>
              {/* <Date dateString={date}></Date> */}
            </div>
          ))}
          
          <ChevronDownIcon className='h-10 w-10 text-white absolute bottom-10 right-10 group-hover:hidden'/>
        </div>
      </section>

      
      </div>
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}
