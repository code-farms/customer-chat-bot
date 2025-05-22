"use client";

import { Button } from "@/components/ui/button";
import { User } from "@/generated/prisma";
import { ArrowLeft, ZapOff } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import PurpleIcon from "../PurpleIcon";
import CreateWebinarButton from "../CreateWebinarButton";

type Props = { user: User };

// TODO: Stripe Subscription, Assistants
const Header = ({ user }: Props) => {
  console.log(user);
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="w-full px-4 py-10 sticky top-0 z-10 flex justify-between items-center flex-wrap gap-4 bg-background">
      {pathname.includes("pipeline") ? (
        <Button
          className="bg-primary/10 border border-border rounded-xl"
          variant={"outline"}
          onClick={() => router.push("/webinar")}
        >
          <ArrowLeft /> Back to Webinar
        </Button>
      ) : (
        <div className="px-4 py-2 flex justify-center items-center text-bold bg-background border border-border rounded-xl text-primary capitalize">
          {pathname.split("/")[1]}
        </div>
      )}

      {/* TODO: Build stripe subscription and create webinar button */}
      <div className="flex items-center flex-wrap gap-6">
        <PurpleIcon className="bg-primary/20 border border-border rounded-xl">
          <ZapOff />
        </PurpleIcon>

        {/* TODO: Add stripe subscription and create webinar button */}
        {/* {user.subscription ? "" : ""} */}

        <CreateWebinarButton />
      </div>
    </div>
  );
};

export default Header;
