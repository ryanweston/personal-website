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
  const { nodes } = useGLTF('/models/doinky.glb')

  useFrame(() => { 
    group.current.rotation.y += 0.002;
  })

  useEffect(() => { 
    console.log(nodes)
  }, [])
  return (
    <group ref={group} {...props} dispose={null} position={[0,-7,0]}>
      <mesh geometry={nodes.doinkmmGroup0.geometry} >
        <meshStandardMaterial wireframe={true} color={0x000000}/>
      </mesh>
    </group>
  )
}

useGLTF.preload('/models/doinky.glb')

export default function Home({ allPostsData }) {

  const [aspect, setAspect] = useState(null)

  useEffect(() => { 
    // setAspect((window.innerWidth / 2) / (window.innerHeight / 2))
  }, [setAspect])

  return (
    <div className="flex flex-row w-screen">
      <Head>
        <title>Ryan Weston</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className='w-1/2 h-screen px-10 py-10 relative bg-black text-white overflow-hidden'>
        <div className="flex flex-row font-alpha">
          <a href="#">Twitter</a>
          <a href="#" className="ml-8">GitHub</a>
          <a href="#" className='ml-8'>YouTube</a>
        </div>
        <div className="absolute z-50 top-0 left-0 h-full flex flex-col justify-center align-center overflow-hidden">
          <div className="marquee">
              <div className='marquee_inner'>
                <div className="content font-bold font-alpha text-white">
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

      <section className='w-1/2 text-black h-screen flex flex-col'>
        <div className="px-20 py-20">
          <h2 className='font-alpha text-5xl font-light'>I’m a designer & software engineer passionate about design systems & component libraries.</h2>
        </div>
        <div className='group px-20 py-20 bg-black grow overflow-y-scroll relative'>
          <h2 className='text-xl mb-6 text-white font-alpha'>Writing</h2>
          {allPostsData.map(({ id, date, title }) => (
            <div key={id} className="flex flex-col text-white">
              <Link href={'/posts/' + id}>
                <a key={id} className="text-5xl font-bold mt-8 mb-2">
                  {title}
                </a>
              </Link>
              <Date dateString={date}></Date>
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
