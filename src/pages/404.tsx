import Head from "next/head";
import { NextPage } from "next/types";

const Dashboard: NextPage = () => {
  return (
    <>
      <Head>
        <title>Not Found - River</title>
      </Head>
      <main className="w-full px-4 py-2">
        <header className="flex items-center justify-between border-b border-slate-500 pb-2">
          <h1 className="text-2xld w-auto py-6 pl-4 font-bold lg:text-4xl">
            Not Found
          </h1>
        </header>
        <div className="w-full px-16">
          <p className="flex-box w-full justify-center pt-4 pb-4 text-center align-middle text-xl text-[#6F6F6F] dark:text-slate-400">
            The page you are looking for does not exist.
          </p>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
