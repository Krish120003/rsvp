import Head from "next/head";
import { NextPage } from "next/types";
import Image from "next/image";
import Link from "next/link";

const Dashboard: NextPage = () => {
  return (
    <>
      <Head>
        <title>Not Found - River</title>
      </Head>
      <main className="w-full px-4 py-2">
        <header className="flex items-center justify-between border-b border-slate-500 pb-2">
          <Link className="w-auto py-2 pl-4" href="/">
            River
          </Link>
        </header>
        <div className="flex flex-col items-center justify-center">
          <Image
            src="/assets/404-error.svg"
            alt="snail having an error"
            width={500}
            height={500}
          ></Image>
          <h1 className="text-4xl font-bold">Oops!</h1>
          <h2 className="py-3 text-2xl">
            {
              "You've crawled to the wrong page. We have nothing to show you here."
            }
          </h2>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
