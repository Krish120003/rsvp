import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import Balancer from "react-wrap-balancer";

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ModeToggle } from "@/components/mode-toggle";
import { Icons } from "@/components/icons";

import Image from "next/image";

const Home: NextPage = () => {
  const { status } = useSession();

  return (
    <>
      <Head>
        <title>River</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="px-4 py-2">
        <header className="flex items-center justify-between border-b border-slate-500 pb-2">
          <p>River</p>

          {status === "authenticated" ? (
            <Link href={"/dashboard"}>
              <Button>Dashboard</Button>
            </Link>
          ) : (
            <Button
              onClick={async () => {
                const signInActionResult = await signIn(undefined, {
                  callbackUrl: "/dashboard",
                });
              }}
            >
              Sign In
            </Button>
          )}
        </header>
        <div className="px-28">
          <Image
            src="/assets/engineer-light.svg"
            alt="notion style engineer ready to manage their events"
            width={400}
            height={400}
            className="px-5 dark:hidden"
          ></Image>
          <Image
            src="/assets/engineer-dark.svg"
            alt="notion style engineer ready to manage their events"
            width={400}
            height={400}
            className="hidden px-5 dark:block"
          ></Image>
          <h1 className="scroll-m-20 py-4 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Event Management.
            <br />
            Simplified.
          </h1>
          <p className="w-1/2 pb-4 text-xl text-slate-700 dark:text-slate-400">
            <Balancer>
              River makes it easy to collect, manage, and contact RSVPs for your
              events.
            </Balancer>
          </p>
          <Button onClick={() => signIn()}>Get Started</Button>
        </div>
      </main>
    </>
  );
};

export default Home;
