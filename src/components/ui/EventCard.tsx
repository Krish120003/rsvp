interface Attendee {
  id: String;
  eventId: String;
  name: String;
  email: String;
  confirmationCode: String;
  confirmed: Boolean;
  event: Event;
}

interface cardProps {
  name: String;
  description: String;
  image: String;
  attendees: Attendee[];
}

const EventCard = (props: cardProps) => {
  const rsvps = props.attendees.length;
  return (
    <div className="w-full bg-[#a26b6b] px-4 py-8">
      <div className="flex scroll-m-20 justify-between px-4 align-middle text-xl tracking-tight">
        <h2 className="">Event Name {props.name}</h2>
        <h2 className="">X Views{props.description}</h2>
        <h2 className="">X RSVPs{rsvps}</h2>
        <h2 className="">Desc{props.description}</h2>
      </div>
    </div>
  );
};

export default EventCard;
