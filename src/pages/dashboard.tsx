import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import Balancer from "react-wrap-balancer";

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ModeToggle } from "@/components/mode-toggle";
import EventCard from "@/components/ui/EventCard";

const Dashboard: NextPage = () => {
  const { data: session } = useSession();
  return (
    <>
      <Head>
        <title>River</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-full px-4 py-2">
        <header className="flex items-center justify-between border-b border-slate-500 pb-2">
          <h2>River</h2>
          <Button onClick={() => signIn()}>Create Event</Button>
        </header>
        <div className="h-max w-full px-8 py-4">
          <h1 className="scroll-m-20 pt-6 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Your Events
          </h1>
          <p className="flex-box w-full py-2 text-xl text-slate-700 dark:text-slate-400">
            Welcome to your event dashboard. View your current, drafted, and
            archived events.
          </p>
          <div className="py-16">
            <EventCard
              name="string"
              description="EE"
              image="S"
              attendees={[]}
            />
            <p className="flex-box w-full justify-center pt-4 pb-4 text-center align-middle text-xl text-[#6F6F6F] dark:text-slate-400">
              You do not have any events right now. Create one to get started.
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
