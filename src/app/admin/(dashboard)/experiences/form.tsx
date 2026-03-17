"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { saveExperience, saveExperienceGroup } from "@/lib/actions/experiences";
import { ImageUploadButton } from "@/components/image-upload-button";
import { Plus, Trash2 } from "lucide-react";
import type { Experience } from "@/lib/data";

interface PositionEntry {
  position: string;
  employmentType: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  technologies: string;
}

function emptyPosition(): PositionEntry {
  return {
    position: "",
    employmentType: "Full-time",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
    technologies: "",
  };
}

interface Props {
  experience?: Experience;
  id?: string;
}

export function ExperienceForm({ experience, id }: Readonly<Props>) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const isEdit = Boolean(experience);

  // Multi-position state (create mode only)
  const [company, setCompany] = useState(experience?.company ?? "");
  const [logo, setLogo] = useState(experience?.logo ?? "");
  const [positions, setPositions] = useState<PositionEntry[]>([
    experience
      ? {
          position: experience.position,
          employmentType: experience.employment_type ?? "Full-time",
          location: experience.location ?? "",
          startDate: experience.start_date,
          endDate: experience.end_date ?? "",
          description: experience.description,
          technologies: experience.technologies.join(", "),
        }
      : emptyPosition(),
  ]);

  function updatePosition(
    idx: number,
    field: keyof PositionEntry,
    value: string,
  ) {
    setPositions((prev) =>
      prev.map((p, i) => (i === idx ? { ...p, [field]: value } : p)),
    );
  }

  function addPosition() {
    setPositions((prev) => [...prev, emptyPosition()]);
  }

  function removePosition(idx: number) {
    setPositions((prev) => prev.filter((_, i) => i !== idx));
  }

  let submitLabel = "Create";
  if (saving) {
    submitLabel = "Saving...";
  } else if (experience) {
    submitLabel = "Update";
  }

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    try {
      if (isEdit) {
        const formData = new FormData(e.currentTarget);
        await saveExperience(formData);
      } else {
        await saveExperienceGroup(
          company.trim(),
          logo.trim() || null,
          positions.map((p) => ({
            position: p.position.trim(),
            employment_type: p.employmentType.trim() || null,
            location: p.location.trim() || null,
            start_date: p.startDate.trim(),
            end_date: p.endDate.trim() || null,
            description: p.description.trim(),
            technologies: p.technologies
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean),
          })),
        );
      }
      router.push("/admin/experiences");
    } catch {
      setSaving(false);
    }
  }

  // --- Edit mode: simple single form ---
  if (isEdit) {
    return (
      <form onSubmit={handleSubmit} className="mt-6 max-w-2xl space-y-4">
        {id && <input type="hidden" name="id" value={id} />}
        <input type="hidden" name="logo" value={logo} />
        <div>
          <label
            htmlFor="company"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Company
          </label>
          <input
            id="company"
            name="company"
            required
            defaultValue={experience?.company}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-foreground focus:outline-none dark:border-gray-700 dark:bg-gray-900"
          />
        </div>
        <div>
          <label
            htmlFor="position"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Position
          </label>
          <input
            id="position"
            name="position"
            required
            defaultValue={experience?.position}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-foreground focus:outline-none dark:border-gray-700 dark:bg-gray-900"
          />
        </div>
        <div>
          <p className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Company Logo
          </p>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 overflow-hidden rounded-lg border border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900">
              {logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={logo}
                  alt="Company logo preview"
                  className="h-full w-full object-contain"
                />
              ) : (
                <div className="h-full w-full" />
              )}
            </div>
            <ImageUploadButton
              folder="logos"
              label="Upload Logo"
              onUploaded={setLogo}
            />
            {logo && (
              <button
                type="button"
                onClick={() => setLogo("")}
                className="rounded-md border border-gray-300 px-2.5 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800"
              >
                Remove
              </button>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="employmentType"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Employment Type
            </label>
            <select
              id="employmentType"
              name="employmentType"
              defaultValue={experience?.employment_type ?? "Full-time"}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-foreground focus:outline-none dark:border-gray-700 dark:bg-gray-900"
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Freelance">Freelance</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Location
            </label>
            <input
              id="location"
              name="location"
              placeholder="Jakarta, Indonesia · Remote"
              defaultValue={experience?.location ?? ""}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-foreground focus:outline-none dark:border-gray-700 dark:bg-gray-900"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="startDate"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Start Date
            </label>
            <input
              id="startDate"
              name="startDate"
              required
              placeholder="2024-01"
              defaultValue={experience?.start_date}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-foreground focus:outline-none dark:border-gray-700 dark:bg-gray-900"
            />
          </div>
          <div>
            <label
              htmlFor="endDate"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              End Date (leave empty if current)
            </label>
            <input
              id="endDate"
              name="endDate"
              placeholder="2025-01"
              defaultValue={experience?.end_date ?? ""}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-foreground focus:outline-none dark:border-gray-700 dark:bg-gray-900"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={3}
            defaultValue={experience?.description}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-foreground focus:outline-none dark:border-gray-700 dark:bg-gray-900"
          />
        </div>
        <div>
          <label
            htmlFor="technologies"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Technologies (comma separated)
          </label>
          <input
            id="technologies"
            name="technologies"
            defaultValue={experience?.technologies.join(", ")}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-foreground focus:outline-none dark:border-gray-700 dark:bg-gray-900"
          />
        </div>
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-80 disabled:opacity-50"
          >
            {submitLabel}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-900"
          >
            Cancel
          </button>
        </div>
      </form>
    );
  }

  // --- Create mode: company + multiple positions ---
  return (
    <form onSubmit={handleSubmit} className="mt-6 max-w-2xl space-y-6">
      <div>
        <label
          htmlFor="companyName"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Company
        </label>
        <input
          id="companyName"
          required
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-foreground focus:outline-none dark:border-gray-700 dark:bg-gray-900"
        />
      </div>

      <div>
        <p className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Company Logo
        </p>
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 overflow-hidden rounded-lg border border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900">
            {logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={logo}
                alt="Company logo preview"
                className="h-full w-full object-contain"
              />
            ) : (
              <div className="h-full w-full" />
            )}
          </div>
          <ImageUploadButton
            folder="logos"
            label="Upload Logo"
            onUploaded={setLogo}
          />
          {logo && (
            <button
              type="button"
              onClick={() => setLogo("")}
              className="rounded-md border border-gray-300 px-2.5 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800"
            >
              Remove
            </button>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">Positions</h3>
          <button
            type="button"
            onClick={addPosition}
            className="inline-flex items-center gap-1 rounded-md border border-gray-300 px-2.5 py-1 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800"
          >
            <Plus size={13} />
            Add Position
          </button>
        </div>

        {positions.map((pos, idx) => {
          const key = `position-${idx}`;
          return (
            <div
              key={key}
              className="relative rounded-lg border border-gray-200 p-4 space-y-3 dark:border-gray-700"
            >
              {positions.length > 1 && (
                <button
                  type="button"
                  onClick={() => removePosition(idx)}
                  className="absolute right-3 top-3 rounded-md p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-red-500 dark:hover:bg-gray-800"
                  title="Remove position"
                >
                  <Trash2 size={14} />
                </button>
              )}
              <div className="text-xs font-medium text-gray-400 mb-2">
                Position {idx + 1}
              </div>
              <div>
                <label
                  htmlFor={`pos-${idx}`}
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Position Title
                </label>
                <input
                  id={`pos-${idx}`}
                  required
                  value={pos.position}
                  onChange={(e) =>
                    updatePosition(idx, "position", e.target.value)
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-foreground focus:outline-none dark:border-gray-700 dark:bg-gray-900"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor={`type-${idx}`}
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Employment Type
                  </label>
                  <select
                    id={`type-${idx}`}
                    value={pos.employmentType}
                    onChange={(e) =>
                      updatePosition(idx, "employmentType", e.target.value)
                    }
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-foreground focus:outline-none dark:border-gray-700 dark:bg-gray-900"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Freelance">Freelance</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor={`loc-${idx}`}
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Location
                  </label>
                  <input
                    id={`loc-${idx}`}
                    placeholder="Jakarta, Indonesia · Remote"
                    value={pos.location}
                    onChange={(e) =>
                      updatePosition(idx, "location", e.target.value)
                    }
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-foreground focus:outline-none dark:border-gray-700 dark:bg-gray-900"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor={`start-${idx}`}
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Start Date
                  </label>
                  <input
                    id={`start-${idx}`}
                    required
                    placeholder="2024-01"
                    value={pos.startDate}
                    onChange={(e) =>
                      updatePosition(idx, "startDate", e.target.value)
                    }
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-foreground focus:outline-none dark:border-gray-700 dark:bg-gray-900"
                  />
                </div>
                <div>
                  <label
                    htmlFor={`end-${idx}`}
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    End Date (leave empty if current)
                  </label>
                  <input
                    id={`end-${idx}`}
                    placeholder="2025-01"
                    value={pos.endDate}
                    onChange={(e) =>
                      updatePosition(idx, "endDate", e.target.value)
                    }
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-foreground focus:outline-none dark:border-gray-700 dark:bg-gray-900"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor={`desc-${idx}`}
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Description
                </label>
                <textarea
                  id={`desc-${idx}`}
                  required
                  rows={3}
                  value={pos.description}
                  onChange={(e) =>
                    updatePosition(idx, "description", e.target.value)
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-foreground focus:outline-none dark:border-gray-700 dark:bg-gray-900"
                />
              </div>
              <div>
                <label
                  htmlFor={`tech-${idx}`}
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Technologies (comma separated)
                </label>
                <input
                  id={`tech-${idx}`}
                  value={pos.technologies}
                  onChange={(e) =>
                    updatePosition(idx, "technologies", e.target.value)
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-foreground focus:outline-none dark:border-gray-700 dark:bg-gray-900"
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-80 disabled:opacity-50"
        >
          {submitLabel}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-900"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
