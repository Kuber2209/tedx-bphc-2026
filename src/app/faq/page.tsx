import React from "react";
import FAQ3 from "@/components/faq/FAQ3";

export const metadata = {
  title: "FAQ | TEDx BITS Hyderabad",
  description: "Frequently asked questions about TEDx BITS Hyderabad 2026.",
};

const faqItems = [
  {
    category: "General",
    question: "When and where is TEDx BITS Hyderabad 2026 taking place?",
    answer: "The event will take place in November 2026 at the Auditorium, BITS Pilani Hyderabad Campus.",
  },
  {
    category: "Ticketing",
    question: "How can I purchase passes for the event?",
    answer: "Passes will be available soon through our official website. Please check the Passes section for updates.",
  },
  {
    category: "General",
    question: "What is the theme for this year's TEDx event?",
    answer: "This year's theme is centered around challenging the ordinary and shaping the future. Full details will be revealed closer to the event date.",
  },
  {
    category: "Event Format",
    question: "Will there be networking opportunities?",
    answer: "Yes, our events are designed not just for talks, but for serendipitous encounters and networking with visionaries, speakers, and the community.",
  },
  {
    category: "Ticketing",
    question: "Can I get a refund if I can't attend?",
    answer: "Ticket policies will be strictly non-refundable. However, tickets might be transferable based on the terms and conditions outlined during purchase.",
  },
];

export default function FAQPage() {
  return (
    <div className="bg-white text-black min-h-screen font-sans pt-32 pb-24">
      <div className="max-w-[1000px] mx-auto relative z-10">
        <FAQ3 
          heading="What you need to know." 
          subheading="Find answers to common questions about TEDx BITS Hyderabad 2026."
          items={faqItems}
        />
      </div>
    </div>
  );
}
