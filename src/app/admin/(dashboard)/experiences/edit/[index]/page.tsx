import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { ExperienceForm } from "../../form";
import type { Experience } from "@/lib/data";

interface Props {
  params: Promise<{ index: string }>;
}

export default async function EditExperiencePage({ params }: Readonly<Props>) {
  const { index: id } = await params;
  const { data } = await supabase
    .from("experiences")
    .select("*")
    .eq("id", id)
    .single();

  if (!data) notFound();

  const experience = data as Experience;

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Edit Experience</h1>
      <ExperienceForm experience={experience} id={experience.id} />
    </div>
  );
}
