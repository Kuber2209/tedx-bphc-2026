import React from "react";
import Image from "next/image";
import { TeamMember } from "@/data/types";

interface TeamCardProps {
  member: TeamMember;
}

export default function TeamCard({ member }: TeamCardProps) {
  return (
    <article className="group relative flex flex-col rounded-2xl border border-zinc-800 bg-[#121212] p-5 shadow-xl transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-zinc-700 hover:shadow-2xl">
      {/* 1. Photo / Avatar Area */}
      <div className="relative aspect-[4/4.2] w-full overflow-hidden rounded-2xl border border-zinc-800 bg-[#171717] transition-colors duration-300 group-hover:border-zinc-700">
        {member.imageUrl ? (
          <Image
            src={member.imageUrl}
            alt={member.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-top grayscale transition-all duration-500 ease-out group-hover:scale-105 group-hover:grayscale-0"
          />
        ) : (
          /* Placeholder Matching Speaker Design */
          <div className="flex h-full w-full flex-col items-center justify-center p-6 text-zinc-600 transition-colors duration-300 group-hover:text-zinc-500">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900 shadow-inner transition-transform duration-300 group-hover:scale-105 group-hover:border-zinc-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-8 w-8 text-zinc-500 transition-colors duration-300 group-hover:text-zinc-300"
                aria-hidden="true"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <span className="mt-3 font-mono text-[10px] uppercase tracking-widest text-zinc-600 transition-colors duration-300 group-hover:text-zinc-400">
              Photo Placeholder
            </span>
          </div>
        )}

        {/* Subtle hover gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#121212]/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* 2. Text Info Area */}
      <div className="mt-5 flex flex-1 flex-col items-center text-center">
        <h3 className="text-xl font-bold tracking-tight text-white transition-colors duration-200">
          {member.name}
        </h3>

        {member.handle && (
          <p className="mt-0.5 text-xs font-mono text-zinc-500">
            {member.handle}
          </p>
        )}

        <div className="mt-2.5 inline-flex items-center rounded-full border border-zinc-700/80 bg-zinc-900/90 px-3 py-0.5 font-mono text-[10px] uppercase tracking-widest text-zinc-300 transition-colors group-hover:border-zinc-600">
          {member.role}
        </div>

        {member.bio && (
          <p className="mt-3 text-xs leading-relaxed text-zinc-400 line-clamp-3">
            {member.bio}
          </p>
        )}
      </div>

      {/* 3. Bottom Action Bar (Phone & Email) */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 border-t border-zinc-800/80 pt-4">
        {/* Phone Capsule */}
        {member.phone && (
          <a
            href={`tel:${member.phone.replace(/\s+/g, "")}`}
            aria-label={`Call ${member.name} at ${member.phone}`}
            className="group/btn flex items-center gap-2 rounded-full border border-zinc-700/80 bg-zinc-900/80 px-3.5 py-1.5 text-xs font-mono text-zinc-300 transition-all duration-200 hover:border-zinc-500 hover:bg-zinc-800 hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3.5 w-3.5 text-zinc-400 transition-colors group-hover/btn:text-white"
              aria-hidden="true"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span>{member.phone}</span>
          </a>
        )}

        {/* Email Icon Button */}
        {member.email && (
          <a
            href={`mailto:${member.email}`}
            aria-label={`Email ${member.name}`}
            title={`Email ${member.name}`}
            className="group/btn flex h-8 w-8 items-center justify-center rounded-full border border-zinc-700/80 bg-zinc-900/80 text-zinc-300 transition-all duration-200 hover:border-zinc-500 hover:bg-zinc-800 hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 text-zinc-400 transition-colors group-hover/btn:text-white"
              aria-hidden="true"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </a>
        )}

        {/* Optional LinkedIn */}
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name}'s LinkedIn`}
            title={`${member.name}'s LinkedIn`}
            className="group/btn flex h-8 w-8 items-center justify-center rounded-full border border-zinc-700/80 bg-zinc-900/80 text-zinc-300 transition-all duration-200 hover:border-zinc-500 hover:bg-zinc-800 hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3.5 w-3.5 text-zinc-400 transition-colors group-hover/btn:text-white"
              aria-hidden="true"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect width="4" height="12" x="2" y="9" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
        )}
      </div>
    </article>
  );
}
