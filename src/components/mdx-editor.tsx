"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { ImageUploadButton } from "@/components/image-upload-button";
import { X } from "lucide-react";

interface Props {
  defaultValue?: string;
  name?: string;
}

const IMAGE_REGEX = /!\[([^\]]*)\]\((\/uploads\/[^\s)]+)\)/g;

function extractImages(text: string): { alt: string; url: string }[] {
  const images: { alt: string; url: string }[] = [];
  let match;
  const re = new RegExp(IMAGE_REGEX.source, "g");
  while ((match = re.exec(text)) !== null) {
    images.push({ alt: match[1], url: match[2] });
  }
  return images;
}

export function MdxEditor({
  defaultValue = "",
  name = "content",
}: Readonly<Props>) {
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const [content, setContent] = useState(defaultValue);
  const images = extractImages(content);

  const insertImage = useCallback((url: string) => {
    const ta = contentRef.current;
    if (!ta) return;
    const text = `\n![image](${url})\n`;
    const start = ta.selectionStart;
    const newVal =
      ta.value.slice(0, start) + text + ta.value.slice(ta.selectionEnd);
    ta.value = newVal;
    ta.selectionStart = ta.selectionEnd = start + text.length;
    ta.focus();
    setContent(newVal);
  }, []);

  function removeImage(url: string) {
    const ta = contentRef.current;
    if (!ta) return;
    const escaped = url.replaceAll(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`);
    const re = new RegExp(String.raw`\n?!\[[^\]]*\]\(${escaped}\)\n?`, "g");
    const newVal = ta.value.replace(re, "\n");
    ta.value = newVal;
    setContent(newVal);
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label
          htmlFor="mdx-content"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Content (MDX)
        </label>
        <ImageUploadButton onUploaded={insertImage} />
      </div>
      <textarea
        id="mdx-content"
        ref={contentRef}
        name={name}
        rows={16}
        defaultValue={defaultValue}
        onChange={(e) => setContent(e.target.value)}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm font-mono focus:border-foreground focus:outline-none dark:border-gray-700 dark:bg-gray-900"
        placeholder="Write your blog content in Markdown..."
      />
      {images.length > 0 && (
        <div>
          <p className="text-xs text-gray-500 mb-1.5">
            Images in content ({images.length})
          </p>
          <div className="flex flex-wrap gap-2">
            {images.map((img, i) => (
              <div
                key={`${img.url}-${i}`}
                className="group relative h-20 w-28 rounded-md border border-gray-200 dark:border-gray-700 overflow-hidden bg-gray-50 dark:bg-gray-800"
              >
                <Image
                  src={img.url}
                  alt={img.alt || "image"}
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(img.url)}
                  className="absolute top-0.5 right-0.5 hidden group-hover:flex h-5 w-5 items-center justify-center rounded-full bg-gray-800/70 text-white hover:bg-gray-800"
                >
                  <X size={10} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
