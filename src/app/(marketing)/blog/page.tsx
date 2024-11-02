import { type Metadata } from "next";
import { client, Blog } from "@/lib/blog";
import { Background } from "@/components/background";
import { Container } from "@/components/container";
import { Heading } from "@/components/heading";
import { Subheading } from "@/components/subheading";
import { BlogCard } from "@/components/blog-card";

export const metadata: Metadata = {
  title: "voiceloop | amplify what matters",
  description:
    "VoiceLoop empowers community leaders to focus on authentic connections. Our AI filters the noise, delivers key insights, and saves time - amplifying your community's impact without the overwhelm. Experience effortless growth and engagement today.",
  openGraph: {
    images: ["https://ai-saas-template-aceternity.vercel.app/banner.png"],
  },
};

async function getData(): Promise<Blog[]> {
  const query = `
  *[_type == 'blog'] | order(_createdAt desc) {
  title, smallDescription, "currentSlug": slug.current, titleImage, author {
    name, src
  }
} `;

  const data = await client.fetch(query);

  return data;
}

export default async function ArticlesIndex() {
  let blogs: Blog[] = await getData();

  console.log(blogs);
  return (
    <div className="relative overflow-hidden py-20 md:py-0">
      <Background />
      <Container className="flex flex-col items-center justify-between pb-20">
        <div className="relative z-20 py-10 md:pt-40">
          <Heading as="h1">Blog</Heading>
          <Subheading className="text-center">
            Discover insightful resources and expert advice from our seasoned
            team to elevate your knowledge.
          </Subheading>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-20 w-full mb-10">
          {blogs.slice(0, 2).map((blog) => (
            <BlogCard blog={blog} key={blog.currentSlug} />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full relative z-20">
          {blogs.slice(2).map((blog) => (
            <BlogCard blog={blog} key={blog.currentSlug} />
          ))}
        </div>
      </Container>
    </div>
  );
}