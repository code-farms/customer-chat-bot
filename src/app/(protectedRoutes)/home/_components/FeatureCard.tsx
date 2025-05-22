import Link from "next/link";
import React from "react";

type Props = {
  link: string;
  heading: string;
  Icon: React.ReactNode;
};

const FeatureCard = ({ heading, link, Icon }: Props) => {
  return (
    <Link
      href={link}
      className="px-8 py-6 flex flex-col items-start justify-center gap-14 rounded-xl border border-border bg-secondary backdrop-blur-xl"
    >
      {Icon}
      <p className="text-primary font-semibold text-xl">{heading}</p>
    </Link>
  );
};

export default FeatureCard;
