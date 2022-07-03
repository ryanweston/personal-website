import { getAllPostIds, getPostData } from '../../lib/posts';
import Head from 'next/head';
import Date from '../../components/date'
import BlogLayout from '../../components/blog-layout';

export default function Post({ postData }) {
  return (
    <BlogLayout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <h1 className="text-5xl font-bold" >{postData.title}</h1>
      <div className="mt-4">
        <Date dateString={postData.date} />
      </div>
      <div className="text-semibold text-xl mt-10 leading-relaxed blog-content" dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
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
  return {
    props: {
      postData
    }
  }
}