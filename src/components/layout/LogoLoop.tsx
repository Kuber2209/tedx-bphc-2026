const loopItems = [
  "TEDx BITS Hyderabad",
  "Ideas worth spreading",
  "One stage · many perspectives",
  "Independently organized TED event",
];

export default function LogoLoop() {
  return (
    <div className="logo-loop" aria-label="TEDx BITS Hyderabad">
      <div className="logo-loop-track">
        {[...loopItems, ...loopItems].map((item, index) => (
          <span key={`${item}-${index}`} className="logo-loop-item">
            <b>TED</b><i>x</i> <em>{item.replace("TEDx ", "")}</em>
            <small aria-hidden="true">✦</small>
          </span>
        ))}
      </div>
    </div>
  );
}
