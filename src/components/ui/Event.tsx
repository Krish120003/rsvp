import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import Balancer from "react-wrap-balancer";

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ModeToggle } from "@/components/mode-toggle";

const Event: NextPage = () => {
  return (
    <>
      <div className="w-full px-4 py-2">
        <header className="flex items-center justify-between border-b border-slate-500 pb-2">
          <h2>Event Name</h2>
          <h2>X Views</h2>
          <h2>X RSVPs</h2>
          <h2>Desc</h2>
        </header>
        <div className="w-full px-16">
          <p className="flex-box w-full justify-center pt-4 pb-4 text-center align-middle text-xl text-[#6F6F6F] dark:text-slate-400">
            You do not have any events right now. Create one to get started.
          </p>
        </div>
      </div>
    </>
  );
};

export default Event;
