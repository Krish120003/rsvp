import { type NextPage } from "next";
import { Prisma, Event } from "@prisma/client";
import { GetServerSideProps } from "next";
import Head from "next/head";

interface EventPageProps {
  event: Event;
}

const EventPage: NextPage<EventPageProps> = (props) => {
  console.log(props.event);
  return (
    <>
      <Head>
        <title>{`${props.event.name} - River`}</title>
      </Head>
      <main className="w-full px-4 py-2">
        <h1>{props.event.name}</h1>
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

  const temp: Event = {
    id: "1",
    name: "Test Event",
    description: "This is a test event.",
    slug: "test-event",
    createdAt: new Date(),
    updatedAt: new Date(),
    creatorId: "1",
    endTime: new Date(),
    startTime: new Date(),
    location: "Test Location",
    image: "https://picsum.photos/200",
    status: "ACTIVE",
  };

  return {
    props: {
      event: temp,
    },
  };
};
