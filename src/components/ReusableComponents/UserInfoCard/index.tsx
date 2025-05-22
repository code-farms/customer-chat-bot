import { Attendee } from "@/generated/prisma";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  customer: Attendee;
  tags: string[];
  className?: string;
};

const UserInfoCard = ({ customer, tags, className }: Props) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 p-3 pr-10 text-primary rounded-xl border-[0.5px] border-border backdrop-blur-[20px] bg-background/10",
        className
      )}
    >
      <h3 className="font-semibold text-xs">{customer.name}</h3>
      <p className="text-sm">{customer.email}</p>
      <div>
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-foreground px-3 py-1 border border-border rounded-md"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default UserInfoCard;
