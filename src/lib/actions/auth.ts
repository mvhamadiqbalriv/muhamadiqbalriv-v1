"use server";

import { redirect } from "next/navigation";
import { createSession, destroySession, verifyPassword } from "@/lib/auth";

export async function loginAction(_prev: unknown, formData: FormData) {
  const password = formData.get("password") as string;

  if (!password || !verifyPassword(password)) {
    return { error: "Password salah" };
  }

  await createSession();
  redirect("/admin");
}

export async function logoutAction() {
  await destroySession();
  redirect("/admin/login");
}
