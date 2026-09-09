"use client";

import React from "react";
import Image from "next/image";
import { TeamMember } from "@/data/types";
import "./TeamMemberSmallCard.css";

interface TeamMemberSmallCardProps {
  member: TeamMember;
}

export default function TeamMemberSmallCard({ member }: TeamMemberSmallCardProps) {
  return (
    <div className="great-bat-card group" role="article" aria-label={member.name}>
      {/* Top Section with Photo and Iconic Skew Notch */}
      <div className="top-section">
        {/* Skewed notch tab corner based on UIverse great-bat-98 */}
        <div className="notch-tab" aria-hidden="true" />

        {/* Notch Icons Bar */}
        <div className="icons-bar">
          <div className="notch-logo">
            TED<span>x</span>
          </div>

          {/* Upper Links: LinkedIn Only as requested */}
          <div className="social-media">
            {member.linkedin ? (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="linkedin-link"
                aria-label={`${member.name}'s LinkedIn Profile`}
                title={`${member.name} on LinkedIn`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.6a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />
                </svg>
              </a>
            ) : (
              <span className="linkedin-link opacity-40 cursor-not-allowed">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.6a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />
                </svg>
              </span>
            )}
          </div>
        </div>

        {/* Photo Layer */}
        <div className="photo-layer">
          {member.imageUrl ? (
            <Image
              src={member.imageUrl}
              alt={member.name}
              fill
              sizes="230px"
              className="photo-img"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center text-zinc-400">
              <div className="mt-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-black/40 shadow-inner backdrop-blur-sm transition-transform duration-300 group-hover:scale-105">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-7 w-7 text-zinc-300"
                  aria-hidden="true"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <span className="mt-2 font-mono text-[8.5px] uppercase tracking-widest text-zinc-300/80">
                TEDx Member
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bottom-section">
        {/* Name in place of "UNIVERSE OF UI" */}
        <span className="title">{member.name}</span>

        {/* Highlighted Team Name after the member name */}
        <div className="highlighted-team-badge" title="Team Role">
          <span className="badge-dot" aria-hidden="true" />
          <span>{member.role || "TEDX EXECUTIVE"}</span>
        </div>

        {/* Phone and Email below the team name */}
        <div className="contact-info">
          {member.phone && (
            <a
              href={`tel:${member.phone.replace(/\s+/g, "")}`}
              className="contact-pill"
              aria-label={`Call ${member.name} at ${member.phone}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="pill-icon"
                aria-hidden="true"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span className="pill-text">{member.phone}</span>
            </a>
          )}

          {member.email && (
            <a
              href={`mailto:${member.email}`}
              className="contact-pill"
              aria-label={`Email ${member.name} at ${member.email}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="pill-icon"
                aria-hidden="true"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <span className="pill-text">{member.email}</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
