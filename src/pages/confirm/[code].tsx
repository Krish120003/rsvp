import { type GetServerSideProps, type NextPage } from "next";
import { prisma } from "@/server/db";
import Head from "next/head";

interface ConfirmProps {
  name: string;
  eventName: string;
}

const Confirm: NextPage<ConfirmProps> = (props) => {
  return (
    <>
      <Head>
        <title>RSVP Confirmed - {props.eventName}</title>
      </Head>
      <main className="px-4 py-2">
        {props.name}, your RSVP to {props.eventName} has been confirmed.
      </main>
    </>
  );
};

export default Confirm;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { code } = context.query;

  if (!code) {
    return {
      notFound: true,
    };
  }

  if (Array.isArray(code) && code.length !== 1) {
    return {
      notFound: true,
    };
  }

  const confCode = Array.isArray(code) ? code[0] : code;

  // fetch the RSVP from prisma

  const rsvp = await prisma.attendee.update({
    where: {
      confirmationCode: confCode,
    },
    data: {
      confirmed: true,
    },
    include: {
      event: true,
    },
  });

  return {
    props: {
      name: rsvp.name,
      eventName: rsvp.event.name,
    },
  };
};
