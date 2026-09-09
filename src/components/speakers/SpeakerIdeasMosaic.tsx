import type { Speaker } from "@/data/speakers";

const defaultIdeas = [
  { number: "01", title: "TED Talks Daily", kicker: "Listen / learn", tone: "red" },
  { number: "02", title: "How to be a better human", kicker: "Small shifts", tone: "teal" },
  { number: "03", title: "Work / life", kicker: "New perspectives", tone: "plum" },
  { number: "04", title: "Corner piece", kicker: "Culture / memory", tone: "blue" },
  { number: "05", title: "Fixable", kicker: "Big questions", tone: "cream" },
  { number: "06", title: "The TED AI show", kicker: "Future signals", tone: "black" },
] as const;

interface SpeakerIdeasMosaicProps {
  edition: string;
  speakers: Speaker[];
}

export default function SpeakerIdeasMosaic({ edition, speakers }: SpeakerIdeasMosaicProps) {
  const ideas = speakers.length > 0
    ? speakers.slice(0, 6).map((speaker, index) => ({
        number: String(index + 1).padStart(2, "0"),
        title: speaker.name,
        kicker: speaker.category,
        tone: defaultIdeas[index % defaultIdeas.length].tone,
      }))
    : defaultIdeas;

  return (
    <section className="speaker-ideas-mosaic" aria-label={`${edition} speaker ideas`}>
      <div className="speaker-ideas-heading">
        <div>
          <span className="speaker-ideas-eyebrow">
            {edition === "2026" ? "Current edition / 06" : `Archive edition / ${edition}`}
          </span>
          <h2>
            {edition === "2026" ? <>Ideas to<br /><em>carry with you.</em></> : <>Voices from<br /><em>{edition}.</em></>}
          </h2>
        </div>
        <p>
          {edition === "2026"
            ? "Six starting points for the conversations, questions, and stories around TEDx BITS Hyderabad."
            : `A selection of speakers and perspectives from the ${edition} TEDx BITS Hyderabad edition.`}
        </p>
      </div>

      <div className="speaker-ideas-grid">
        {ideas.map((idea) => (
          <article key={idea.number} className={`speaker-idea-tile speaker-idea-tile--${idea.tone}`}>
            <span className="speaker-idea-number">{idea.number}</span>
            <span className="speaker-idea-kicker">{idea.kicker}</span>
            <h3>{idea.title}</h3>
            <span className="speaker-idea-arrow">↗</span>
          </article>
        ))}
      </div>

      <div className="speaker-ideas-blackbar">
        <span>Ideas worth spreading.</span>
        <strong>TEDx BPHC / {edition}</strong>
      </div>
    </section>
  );
}
