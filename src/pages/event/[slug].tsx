import { type NextPage } from "next";
import { Event } from "@prisma/client";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { prisma } from "@/server/db";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import Balancer from "react-wrap-balancer";
import { Listbox, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

import BG from "../../components/BG.svg";
import LOCATION from "../../components/location_icon.svg";
import TIME from "../../components/time_icon.svg";
import DATE from "../../components/date_icon.svg";
import { api } from "@/utils/api";
import { cn } from "@/lib/utils";

interface EventDetailsProps {
  name: string;
  description: string;
  location: string;
  startTime: Date;
}

const EventDetails: React.FC<EventDetailsProps> = ({
  name,
  description,
  location,
  startTime,
}) => {
  // extract the date as a string from the time
  // format the date as dd MM, yyyy
  const dateString = `${startTime.toLocaleString("en-us", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })}`;

  // extract the time as a string from the time
  // format the time as hh:mm
  const timeString = `${startTime.toLocaleString("en-us", {
    hour: "2-digit",
    minute: "2-digit",
  })}`;

  return (
    <div className="flex flex-col gap-4 text-white">
      <h1 className="w-[10em] flex-wrap text-6xl font-bold">{name}</h1>
      <p className="w-[35em] flex-wrap text-lg">{description}</p>
      <div className="flex flex-col gap-2">
        <p className="flex flex-row gap-3">
          <img src={LOCATION.src}></img>
          {location}
        </p>
        <p className="flex flex-row gap-3">
          <img src={TIME.src}></img>
          {dateString}
        </p>
        <p className="flex flex-row gap-3">
          <img src={DATE.src}></img>
          {timeString}
        </p>
      </div>
    </div>
  );
};
const RSVPForm: React.FC = () => {
  const statuses = ["Attending", "Not Attending", "Maybe"];
  const [selected, setSelected] = useState(statuses[0]);

  return (
    <div className="">
      <form className="flex flex-col gap-4">
        <h1 className="text-4xl font-semibold">RSVP</h1>
        <p className="text-gray-400">
          Please enter your details to RSVP for this event.
        </p>
        <div>
          <label className="block text-gray-700" htmlFor="name">
            Name
          </label>
          <input
            className="w-full rounded-md border border-gray-300 px-4 py-2"
            type="text"
            id="name"
          />
        </div>
        <div>
          <label className="block text-gray-700" htmlFor="email">
            Email
          </label>
          <input
            className="w-full rounded-md border border-gray-300 px-4 py-2"
            type="email"
            id="email"
          />
        </div>
        <div>
          <p className="text-gray-700">Status</p>
          {/* Headless UI Listbox for either Attending, Unsure, or Not Attending */}
          <div className="h-10">
            <Listbox value={selected} onChange={setSelected}>
              <div className="relative mt-1 h-full">
                <Listbox.Button className="relative h-full w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:text-sm">
                  <span className="block truncate">
                    {selected ? selected : ""}
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {statuses.map((status, statusIdx) => (
                      <Listbox.Option
                        key={statusIdx}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active
                              ? "bg-violet-100 text-fuchsia-900"
                              : "text-gray-900"
                          }`
                        }
                        value={status}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {status}
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-violet-600">
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>
        </div>
        <button
          className="rounded-md bg-purple-600 py-2 text-white"
          type="submit"
        >
          RSVP
        </button>
      </form>
    </div>
  );
};

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

interface RSVPFormData {
  name: string;
  email: string;
}

const EventPage: NextPage<EventPageProps> = (props) => {
  const { register, handleSubmit, watch } = useForm<RSVPFormData>();

  const submittedName = watch("name");

  const { mutateAsync, isIdle, isLoading, isSuccess } =
    api.events.rsvp.useMutation();

  const onSubmit: SubmitHandler<RSVPFormData> = async (data) => {
    console.log(data);
    await mutateAsync({
      name: data.name,
      email: data.email,
      slug: props.event.slug,
    });
  };

  const dateString = `${props.event.startTime.toLocaleString("en-us", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })}`;

  // extract the time as a string from the time
  // format the time as hh:mm
  const timeString = `${props.event.startTime.toLocaleString("en-us", {
    hour: "2-digit",
    minute: "2-digit",
  })}`;

  return (
    <>
      <Head>
        <title>{`${props.event.name} - River`}</title>
      </Head>
      <div className="grid h-full grid-cols-2">
        <div className="relative flex h-full items-end overflow-hidden bg-black">
          <img src={BG.src} alt="background" className="absolute w-full" />
          <div className="z-10 flex flex-col gap-4 p-8 text-white">
            <h1 className="w-[10em] flex-wrap text-6xl font-bold">
              {props.event.name}
            </h1>
            <p className="w-[35em] flex-wrap text-lg">
              {props.event.description}
            </p>
            <div className="flex flex-col gap-2">
              <p className="flex flex-row gap-3">
                <img src={LOCATION.src}></img>
                {props.event.location}
              </p>
              <p className="flex flex-row gap-3">
                <img src={TIME.src}></img>
                {dateString}
              </p>
              <p className="flex flex-row gap-3">
                <img src={DATE.src}></img>
                {timeString}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="w-md relative max-w-md p-4">
            <div
              className={cn([
                "w-full opacity-100 transition-all",
                (isLoading || isSuccess) && "opacity-0",
              ])}
            >
              <h1 className="text-4xl font-bold">RSVP</h1>
              <p className="text-md text-slate-500">
                Please enter your information to register for this event.
              </p>
              <div className="py-4">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    {...register("name")}
                  />
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@email.com"
                    {...register("email")}
                  />
                  <Button type="submit" className="mt-4 w-full">
                    RSVP
                  </Button>
                </form>
              </div>
            </div>
            <div
              className={cn([
                "absolute top-1/2 left-1/2 w-full -translate-x-[50%] -translate-y-1/2 scale-75 text-center opacity-0 transition-all ",
                isLoading && "scale-100 opacity-100",
              ])}
            >
              <h1 className="animate-pulse text-2xl font-bold ">
                Processing Your RSVP
              </h1>
            </div>
            <div
              className={cn([
                "absolute top-1/2 left-1/2 w-full -translate-x-[50%] -translate-y-1/2 scale-75 text-center opacity-0 transition-all",
                isSuccess && "scale-100 opacity-100",
              ])}
            >
              <h1 className="text-2xl font-bold ">
                <Balancer>You are RSVPed, {submittedName}!</Balancer>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventPage;

// Server-side rendering
export const getServerSideProps: GetServerSideProps = async (context) => {
  context.res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate");

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

  await prisma.event.update({
    where: {
      id: event.id,
    },
    data: {
      views: {
        increment: 1,
      },
    },
  });

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
