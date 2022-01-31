import Head from 'next/head';
import Link from "next/link";
import Header from "../components/Header";
import {sanityClient, urlFor} from "../sanity";
import { Post } from "../typings";

interface Props {
  posts: [Post];
}

export default function Home({ posts }: Props) {
  console.log(posts);
  return (
    <div className="max-w-7xl mx-auto">
      <Head>
        <title>Medium app by Mayukhdeep</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div className="flex justify-between items-center bg-yellow-400 border-y border-black py-10 lg:py-0">
        <div className="px-10 space-y-5">
          <h1 className="text-6xl max-w-xl font-serif">
            <span className="underline decoration-black decoration-4">Medium</span>{" "} is a place to write, read, and connect</h1>
          <h2>It's easy and free to post your thinking on any topic and connect with millions of readers.</h2>
        </div>
        
        <img className="hidden md:inline-flex h- lg:h-full" src="https://cdn4.iconfinder.com/data/icons/social-media-2210/24/Medium-512.png" alt="" height="350" width="350" />

      </div>

      {/*Posts*/}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6">
        {posts.map((post) => (
          <Link key={post._id} href={`/post/${post.slug.current}`}>
            <div className="border rounded-lg group cursor-pointer overflow-hidden">
              <img
                className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out"
                src={urlFor(post.mainImage).url()!} alt="" />
              <div className="flex justify-between p-5 bg-white">
                <div>
                  <p className="textlg font-bold">{post.title}</p>
                  <p className="text-xs">
                    {post.description} by {post.author.name}
                  </p>
                </div>

                <img
                  className="h-12 w-12 rounded-full" 
                  src={urlFor(post.author.image).url()!} alt="" />

              </div>
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
}

export const getServerSideProps = async () => {
  const query =
  `*[_type == "post"] {
    _id,
    title,
    slug,
    author -> {
    name, image
  },
  description,
  mainImage,
  slug
  }`;

  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts,
    },
  }
};
