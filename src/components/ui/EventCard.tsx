interface Attendee {
  id: string;
  eventId: string;
  name: string;
  email: string;
  confirmationCode: string;
  confirmed: Boolean;
  event: Event;
}

interface cardProps {
  name: string;
  description: string;
  count: number;
}

const EventCard = (props: cardProps) => {
  return (
    <div className="w-full rounded-md bg-[#dadada] px-4 py-4">
      <div className="flex justify-between px-4 text-xl tracking-tight align-middle scroll-m-20">
        <h2 className="">{props.name}</h2>
        <h2 className="">10 views</h2>
        <h2 className="">{props.count} RSVPs</h2>
        <h2 className="">{props.description}</h2>
      </div>
    </div>
  );
};

export default EventCard;
