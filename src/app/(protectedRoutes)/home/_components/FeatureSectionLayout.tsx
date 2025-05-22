import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  children: React.ReactNode;
  heading: string;
  link: string;
  className?: string;
};

const FeatureSectionLayout = ({
  children,
  heading,
  link,
  className,
}: Props) => {
  return (
    <div
      className={`p-10 flex flex-col items-center justify-center gap-10 rounded-3xl border border-border bg-background-10 ${className}`}
    >
      {children}
      <div className="w-full justify-center item-center flex flex-col flex-wrap gap-10">
        <h3 className="sm:w-[70%] font-semibold text-3xl text-primary">
          {heading}
        </h3>
        <Link
          href={link}
          className="text-primary font-semibold text-lg flex items-center justify-center rounded-xl-md opacity-50"
        >
          View <ArrowRight className="ml-2 w-6 h-6" />
        </Link>
      </div>
    </div>
  );
};

export default FeatureSectionLayout;
