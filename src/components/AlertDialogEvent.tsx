import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/AlertDialog";
import { Button } from "@/components/ui/Button";
import Form from "@/components/CreateForm";
import { api } from "@/utils/api";
import { useState } from "react";

const AlertDialogEvent = () => {
  interface EventForm {
    eventname: string;
    description: string;
    sttime: string;
    endtime: string;
    slug: string;
    location: string;
  }
  const [formData, setFormData] = useState<EventForm>();

  const { mutateAsync, isSuccess } = api.events.create.useMutation();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Create Event</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Enter event details</AlertDialogTitle>
          <Form updater={setFormData}></Form>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={async (e) => {
              console.log(formData?.eventname);
              if (!formData) {
                return;
              }
              try {
                const result = await mutateAsync({
                  name: formData?.eventname,
                  description: formData?.description,
                  startTime: new Date(formData?.sttime),
                  location: formData?.location,
                  slug: formData?.location,
                });
              } catch (e) {
                console.error(e);
              }
              console.log(formData);
            }}
          >
            Submit
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default AlertDialogEvent;
