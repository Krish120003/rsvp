import Link from "next/link";
import { Button } from "./Button";

interface Attendee {
  id: string;
  eventId: string;
  name: string;
  email: string;
  confirmationCode: string;
  confirmed: boolean;
  event: Event;
}

interface cardProps {
  name: string;
  description: string;
  count: number;
  slug: string;
  views: number;
}

const EventCard = (props: cardProps) => {
  return (
    <div className="w-full rounded-md border-b py-4">
      <div className="flex scroll-m-20 justify-between align-middle text-xl tracking-tight">
        <h2 className="">{props.name}</h2>
        <h2 className="">{`${props.views}`} views</h2>
        <h2 className="">{props.count} RSVPs</h2>
        <Link
          className=""
          href={`${document.location.href.replace("/dashboard", "")}/event/${
            props.slug
          }`}
        >
          <Button variant={"link"}>
            {`${document.location.href.replace("/dashboard", "")}/event/${
              props.slug
            }`}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
