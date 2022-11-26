import Head from 'next/head'
// import Image from 'next/image'
// import Link from 'next/link';
// import Date from '../components/date';
import { getSortedPostsData } from '../lib/posts';
import { Suspense } from 'react'
import { clsx } from 'clsx'

// import thumbnail from '../public/thumbnails/ssg.png'

import { useFrame } from '@react-three/fiber';

import { useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'

import { useGLTF } from '@react-three/drei'

// MODEL

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
        <meshStandardMaterial wireframe={true} color={0X000000}/>
      </mesh>
    </group>
  )
}

// HOME PAGE

export default function Home({ allPostsData }: any) {

  const [aspect, setAspect] = useState(null)
  const [isHover, setHover] = useState(false)
  const [hoverContent, setHoverContent] = useState({ title: null })

  useGLTF.preload('/models/doinky.glb')


  useEffect(() => { 
    // setAspect((window.innerWidth / 2) / (window.innerHeight / 2))
  }, [setAspect])

  const projects = [ 
    {
      name: 'Unlocked',
      description: 'Component library built with Tailwind & Vue3 with a focus on control inversion.',
      link: '#',
      date: '2022'
    },
    {
      name: 'Predictable',
      description: 'Predict the premier league table with friends. An experiment with React.',
      link: '#',
      date: '2022'
    },
    {
      name: 'EcoScan',
      description: 'Scan household products for sustainability scores. An experiment with React Native.',
      link: '#',
      date: '2021'
    }
  ]

  const enterHoverState = (content: any) => { 
    setHover(true)
    setHoverContent(content)
  }

  const leaveHoverState = () => { 
    setHover(false)
  }

  return (
    <div className="flex flex-col lg:flex-row w-screen">
      <Head>
        <title>Ryan Weston</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="bg-black text-white w-full lg:w-7/12 2xl:grow h-screen px-10 py-10 relative overflow-hidden">
        <div className='flex flex-row font-sans z-30 space-x-4 md:space-x-8'>
          <a href="#" className='hover:line-through'>Twitter</a>
          <a href="#" className="hover:line-through">GitHub</a>
          <a href="#" className='hover:line-through'>YouTube</a>
        </div>

        <div className={clsx([isHover && hoverContent ? 'hidden' : 'block'])}>
          <div className="absolute z-40 top-0 left-0 h-full w-full flex flex-col justify-center align-center overflow-hidden">
            <div className="marquee">
                <div className='marquee_inner'>
                  <div className='content font-bold font-sans disable-ligatures'>
                    RYAN WESTON RYAN WESTON RYAN WESTON RYAN WESTON RYAN WESTON RYAN WESTON RYAN WESTON 
                  </div>
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

        <div className={clsx([!isHover ? 'hidden' : 'absolute z-0 top-0 left-0 h-full w-full'])}>
          <div className="w-full h-full flex flex-col justify-center items-center font-bold px-20 text-7xl text-center font-semibold">
            <h1 className="font-alpha leading-10 font-bold text-8xl">{ hoverContent.title }</h1>
          </div>
        </div>
      </section>

      <section className='w-full lg:w-5/12 2xl:max-w-3xl bg-[#131313] lg:h-screen px-10 lg:px-20 space-y-10 py-14 md:space-y-14 text-white flex flex-col lg:overflow-y-scroll'>
        <h2 className='font-alpha sm:leading-10 font-bold text-3xl disable-ligatures sm:text-5xl md:text-5xl lg:text-5xl xl:text-5xl 2xl:text-6xl font-light'>
          I'm a software engineer & designer who loves to build things. 
        </h2>
        <div>
          { projects.map((item) => { 
            return (
            <div 
              key={item.name} 
              onMouseEnter={() => enterHoverState({ title: item.name })} onMouseLeave={(e) => leaveHoverState()} 
              className="grid grid-cols-2 xl:grid-cols-4 space-y-3 xl:space-y-0 border-t border-white py-4 hover:cursor-pointer group"
            >
              <p className="font-sans text-sm font-sans disable-ligatures hover:line-through">
                { item.name }
              </p>
              <p className="font-sans col-span-2 text-sm xl:ml-auto  disable-ligatures">
                { item.description }
              </p>
              <p className="font-sans text-sm xl:ml-auto disable-ligatures">
                { item.date }
              </p>
              {/* <ArrowRightIcon className="text-black w-5 h-5 ml-auto hidden group-hover:block" /> */}
            </div>
          )})}
        </div>
        {/* <div className='px-10 lg:px-20 mt-10 pb-10 relative'>
          <h2 className='text-xs mb-8 uppercase font-sans'>Writing</h2>
          <div className='space-y-8'>
            {allPostsData.map(({ id, date, title }: { id: string, date: string, title: string}) => (
              <div key={id} className='space-y-4 group' onMouseEnter={(e) => enterHoverState({ title })} onMouseLeave={(e) => leaveHoverState()}>
                <Image src={thumbnail} alt={title} className="group-hover:blur-lg rounded-lg w-full h-auto"/>
                <Link key={id} className="text-2xl font-sans disable-ligatures flex flex-row" href={'/posts/' + id}>
                  <div className="flex flex-col">
                    <h3 className='font-medium font-alpha'>{title}</h3>
                    <Date dateString={date}></Date>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div> */}

      {/* <ArrowDownIcon className='h-5 w-5 text-black fixed bottom-5 right-5 group-hover:hidden'/> */}
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
