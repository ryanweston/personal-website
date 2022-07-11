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

      <section className='w-full lg:w-1/2 h-screen px-10 py-10 relative bg-black text-white overflow-hidden'>
      <div className="flex flex-row font-alpha z-50 relative">
          <a href="#" className='hover:line-through'>Twitter</a>
          <a href="#" className="ml-4 md:ml-8 hover:line-through">GitHub</a>
          <a href="#" className='ml-4 md:ml-8 hover:line-through'>YouTube</a>
        </div>
        <div className="absolute z-40 top-0 left-0 h-full flex flex-col justify-center align-center overflow-hidden">
          <div className="marquee">
              <div className='marquee_inner'>
                <div className="content font-bold font-alpha">
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

      <section className='w-full lg:w-1/2 bg-black h-screen flex flex-col'>
        <div className="px-10 py-14 bg-blueContrast lg:px-20 lg:py-20">
          <h2 className='font-alpha text-4xl lg:text-5xl text-white font-light'>
            I’m a designer & software engineer passionate about design systems. 
          </h2>
        </div>
        <div className='group px-10 py-14 lg:px-20 lg:py-20 bg-black relative lg:overflow-y-scroll'>
          <h2 className='text-xl mb-6 text-white font-alpha'>Writing</h2>
          {allPostsData.map(({ id, date, title }: { id: string, date: string, title: string}) => (
            <div key={id} className="flex flex-col text-white border-t border-white py-6">
              <Link href={'/posts/' + id}>
                <a key={id} className="text-5xl font-alpha disable-ligatures mb-2 hover:line-through">
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
