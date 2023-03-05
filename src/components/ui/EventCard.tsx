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
      <div className="w-full bg-[#D9D9D9] px-4 py-2">
        <h2>Event Name</h2>
        <h2>X Views</h2>
        <h2>X RSVPs</h2>
        <h2>Desc</h2>
      </div>
    </>
  );
};

export default Event;
