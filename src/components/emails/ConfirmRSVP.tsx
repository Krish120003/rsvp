import React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Text,
  Tailwind,
  Button,
  Section,
  Column,
} from "@react-email/components";

interface ConfrimRSVPProps {
  confirmationCode: string;
  eventName: string;
  name: string;
}

const baseUrl = process.env.VERCEL_URL || "http://localhost:3000";

const ConfrimRSVP: React.FC<ConfrimRSVPProps> = ({
  confirmationCode = "some-confirmation-code",
  eventName = "some-event-name",
  name = "Jeff Doe",
}) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container>
            <Heading>Confirm your RSVP to {eventName}</Heading>
            <Text>
              Hi {name}, please confirm your RSVP to {eventName} by clicking the
              link below:
            </Text>
            <Container className="text-center">
              <Button
                href={`${baseUrl}/confirm/${confirmationCode}`}
                className="mx-auto rounded-lg bg-blue-600 p-4 text-center text-white"
              >
                Confirm RSVP
              </Button>
            </Container>
            <Text>
              If you are having trouble with the button above, open{" "}
              <Link
                href={`${baseUrl}/confirm/${confirmationCode}`}
              >{`${baseUrl}/confirm/${confirmationCode}`}</Link>{" "}
              in your browser to confirm your RSVP.
            </Text>
          </Container>
          <Container className="text-neutral-500">
            <Text>Powered by River, the RSVP platform.</Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ConfrimRSVP;
