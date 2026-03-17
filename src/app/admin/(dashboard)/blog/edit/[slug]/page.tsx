import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/mdx";
import { EditPostForm } from "./form";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function EditPostPage({ params }: Readonly<Props>) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Edit Post</h1>
      <EditPostForm slug={slug} post={post} />
    </div>
  );
}
