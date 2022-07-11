import { getAllPostIds, getPostData } from '../../lib/posts';
import Head from 'next/head';
import Date from '../../components/date'
import BlogLayout from '../../components/blog-layout';
import ReactMarkdown from 'react-markdown'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import tsx from 'react-syntax-highlighter/dist/cjs/languages/prism/tsx'
import typescript from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript'
import scss from 'react-syntax-highlighter/dist/cjs/languages/prism/scss'
import bash from 'react-syntax-highlighter/dist/cjs/languages/prism/bash'
import markdown from 'react-syntax-highlighter/dist/cjs/languages/prism/markdown'
import json from 'react-syntax-highlighter/dist/cjs/languages/prism/json'
import { useEffect } from 'react';
import rangeParser from 'parse-numeric-range'
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

SyntaxHighlighter.registerLanguage('tsx', tsx)
SyntaxHighlighter.registerLanguage('typescript', typescript)
SyntaxHighlighter.registerLanguage('scss', scss)
SyntaxHighlighter.registerLanguage('bash', bash)
SyntaxHighlighter.registerLanguage('markdown', markdown)
SyntaxHighlighter.registerLanguage('json', json)



export const BlogMarkdown = ({ markdown }) => {

  const syntaxTheme = oneDark

  useEffect(() => { 
    console.log(markdown)
  })

  const MarkdownComponents: object = {
    code({ node, inline, className, ...props }) {

      const match = /language-(\w+)/.exec(className || '')
      const hasMeta = node?.data?.meta

      const applyHighlights: object = (applyHighlights: number) => {
        if (hasMeta) {
          const RE = /{([\d,-]+)}/
          const metadata = node.data.meta?.replace(/\s/g, '')
          const strlineNumbers = RE?.test(metadata)
            // @ts-ignore
            ? RE?.exec(metadata)[1]
            : '0'
          const highlightLines = rangeParser(strlineNumbers)
          const highlight = highlightLines
          // @ts-ignore
          const data: string = highlight.includes(applyHighlights)
            ? 'highlight'
            : null
          return { data }
        } else {
          return {}
        }
      }

      return match ? (
        <SyntaxHighlighter
          style={syntaxTheme}
          language={match[1]}
          PreTag="div"
          className="codeStyle"
          showLineNumbers={true}
          wrapLines={hasMeta ? true : false}
          useInlineStyles={true}
          lineProps={applyHighlights}
          {...props}
        />
      ) : (
        <code className={className} {...props} />
      )
    },
  }

  return (
    <ReactMarkdown
      components={MarkdownComponents}
    >
      {markdown}
    </ReactMarkdown>
  )
}


export default function Post({ postData }) {
  return (
    <BlogLayout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <h1 className="text-4xl lg:text-6xl font-alpha disable-ligatures font-bold" >{postData.title}</h1>
      <div className="mt-4 text-gray-600">
        <Date dateString={postData.date} />
      </div>
      <div className="text-medium text-lg lg:text-xl mt-14 leading-relaxed blog-content">
        <BlogMarkdown markdown={postData.contentHtml}/>
      </div>
      <div className='mb-10 mt-16 pb-10 text-right'>
        <h5 className='font-semibold text-lg'>Share this post</h5>
      </div>
    </BlogLayout>
  )
}

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)
  console.log(postData)
  return {
    props: {
      postData
    }
  }
}