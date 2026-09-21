'use client';

import { FlowButton } from "@/components/ui/flow-button";
import { ButtonWithIcon } from "@/components/ui/button-with-icon";

export const ButtonDemo = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-10 bg-gray-100 p-8">
      <div className="text-center space-y-2">
        <h2 className="text-sm font-mono uppercase tracking-widest text-neutral-500">
          Home Page CTA: Button With Icon (@shadcnspace)
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <ButtonWithIcon text="Get Tickets" variant="red" />
          <ButtonWithIcon text="Let's Collaborate" variant="black" />
          <ButtonWithIcon text="Explore Passes" variant="white" />
        </div>
      </div>

      <div className="text-center space-y-2">
        <h2 className="text-sm font-mono uppercase tracking-widest text-neutral-500">
          Timeline & Detail: Flow Buttons
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <FlowButton text="Flow Button" />
          <FlowButton text="Explore Passes" variant="red" />
          <FlowButton text="Venue Guide" variant="white" hasArrow={false} />
          <FlowButton text="Request Delegation Access" variant="black" />
        </div>
      </div>
    </div>
  );
};

export default ButtonDemo;
export { AuroraBackgroundDemo } from "@/components/ui/aurora-demo";
