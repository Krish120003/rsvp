import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import Balancer from "react-wrap-balancer";

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ModeToggle } from "@/components/mode-toggle";
import EventCard from "@/components/ui/EventCard";
import { api } from "@/utils/api";
import AlertDialogEvent from "@/components/AlertDialogEvent";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/Tabs";

const NoEvents: React.FC = () => {
  return (
    <p className="flex-box w-full justify-center pt-4 pb-4 text-center align-middle text-xl text-[#6F6F6F] dark:text-slate-400">
      You do not have any events right now. Create one to get started.
    </p>
  );
};

const Dashboard: NextPage = () => {
  const { data: session } = useSession();
  const { data: events } = api.events.list.useQuery();

  const eventCards = events?.map((event) => {
    return (
      <EventCard
        key={event.id}
        name={event.name}
        description={event.description}
        count={event._count.attendees}
        slug={event.slug}
        views={event.views}
      />
    );
  });
  //
  return (
    <>
      <Head>
        <title>River</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-full px-4 py-2">
        <header className="flex h-14 items-center justify-between border-b border-slate-500 pb-2">
          <Link href="/">River</Link>
        </header>
        <div className="h-max w-full px-8 py-4">
          <h1 className="scroll-m-20 pt-12 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Your Events
          </h1>
          <p className="flex-box w-full py-2 text-xl text-slate-700 dark:text-slate-400">
            Welcome to your event dashboard. View your current, drafted, and
            archived events.
          </p>
          <div className="flex h-14 items-center justify-between border-slate-500 pr-4">
            <Tabs defaultValue="active" className="w-[400px]">
              <TabsList>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="inactive">Inactive</TabsTrigger>
                <TabsTrigger value="drafts">Drafts</TabsTrigger>
                <TabsTrigger value="archived">Archived</TabsTrigger>
              </TabsList>
            </Tabs>
            <AlertDialogEvent />
          </div>
          <div className="py-8">{events ? eventCards : <NoEvents />}</div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
