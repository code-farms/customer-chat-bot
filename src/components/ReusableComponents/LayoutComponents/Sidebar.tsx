"use client";

import { usePathname } from "next/navigation";
import React from "react";
import Link from "next/link";
import { sidebarData } from "@/lib/data";

import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { UserButton } from "@clerk/nextjs";

type Props = {};

const Sidebar = (props: Props) => {
  console.log(props)
  const pathname = usePathname();

  return (
    <TooltipProvider>
      <div className="w-18 sm:w-28 h-screen sticky top-0 py-10 px-2 sm:px-6 border bg-background border-border flex flex-col items-center justify-start gap-10">
        <div className="w-full h-full flex flex-col justify-between items-center">
          <div className="flex flex-col gap-4">
            {sidebarData.map((item) => (
              <Tooltip key={item.id}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.link}
                    className={`flex items-center gap-2 cursor-pointer rounded-lg p-2 transition-colors ${
                      pathname.includes(item.link)
                        ? "bg-muted text-primary"
                        : "opacity-80 hover:bg-muted"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{item.title}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
          <UserButton />
        </div>
      </div>
    </TooltipProvider>
  );
};

export default Sidebar;
