"use client";

import { useEffect, useState } from "react";

export default function IntroGate({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 1850);
    return () => window.clearTimeout(timer);
  }, []);

  return <>
    <div className={`intro-gate ${visible ? "is-visible" : "is-hidden"}`} aria-hidden={!visible}>
      <div className="intro-gate-line" />
      <p>INDEPENDENTLY ORGANIZED TED EVENT</p>
      <svg className="intro-stroke-title" viewBox="0 0 900 210" role="img" aria-label="TEDx BITS Hyderabad"><text x="450" y="88" textAnchor="middle">TEDx BITS</text><text x="450" y="174" textAnchor="middle">HYDERABAD</text></svg>
      <small>2026</small>
    </div>
    <div className={visible ? "site-underlay is-held" : "site-underlay"}>{children}</div>
  </>;
}
