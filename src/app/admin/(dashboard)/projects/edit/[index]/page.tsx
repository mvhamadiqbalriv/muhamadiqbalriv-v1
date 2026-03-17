import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { ProjectForm } from "../../form";
import type { Project } from "@/lib/data";

interface Props {
  params: Promise<{ index: string }>;
}

export default async function EditProjectPage({ params }: Readonly<Props>) {
  const { index: id } = await params;
  const { data } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (!data) notFound();

  const project = data as Project;

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Edit Project</h1>
      <ProjectForm project={project} id={project.id} />
    </div>
  );
}
