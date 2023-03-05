import { type NextPage } from "next";
import { Event } from "@prisma/client";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { prisma } from "@/server/db";

interface EventDetails {
  name: string;
  description: string;
  status: string;
  startTime: Date;
  endTime: Date;
  location: string;
  slug: string;
}

interface EventPageProps {
  event: EventDetails;
}

const EventPage: NextPage<EventPageProps> = (props) => {
  console.log(props.event);
  return (
    <>
      <Head>
        <title>{`${props.event.name} - River`}</title>
      </Head>
      <main className="flex h-full items-center justify-center">
        <div className="max-w-2xl p-4">
          <h1 className="text-4xl font-bold">{props.event.name}</h1>
          <p className="text-md">{props.event.description}</p>
        </div>
      </main>
    </>
  );
};

export default EventPage;

// Server-side rendering
export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!context.params) {
    return {
      notFound: true,
    };
  }
  const { slug } = context.params;

  if (typeof slug !== "string") {
    return {
      notFound: true,
    };
  }

  const event = await prisma.event.findUnique({
    where: {
      slug: slug,
    },
  });

  if (!event) {
    return {
      notFound: true,
    };
  }

  const reshapedEvent: EventDetails = {
    name: event.name,
    description: event.description,
    status: event.status,
    startTime: event.startTime,
    endTime: event.endTime,
    location: event.location,
    slug: event.slug,
  };

  return {
    props: {
      event: reshapedEvent,
    },
  };
};
