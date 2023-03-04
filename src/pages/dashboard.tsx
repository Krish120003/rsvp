import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import Balancer from "react-wrap-balancer";

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ModeToggle } from "@/components/mode-toggle";

const Dashboard: NextPage = () => {
  return (
    <>
      <Head>
        <title>River</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="px-4 py-2">
        <header className="flex items-center justify-between border-b border-slate-500 pb-2">
          <h2>Dashboard</h2>
          <ModeToggle />
          <Button onClick={() => signIn()}>Create Event</Button>
        </header>
        <div className="px-16">
          <p className="pb-4 text-center text-xl text-slate-700 dark:text-slate-400">
            <Balancer>
              You do not have any events right now. Create one to get started.
            </Balancer>
          </p>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
