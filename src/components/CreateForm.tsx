import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";

type FormValues = {
  eventname: string;
  description: string;
  sttime: string;
  endtime: string;
  slug: string;
  location: string;
};

function MyForm({ updater }) {
  const { register, handleSubmit, watch } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);

  const [inputValue, setInputValue] = useState<string>("");
  const [labelValue, setLabelValue] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setLabelValue(event.target.value);
  };

  useEffect(() => {
    updater(watch());
  }, [watch()]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <label htmlFor="eventname" className="">
        Name
      </label>
      <Input type="text" id="eventname" {...register("eventname")} required />
      <label htmlFor="description" className="">
        Description
      </label>
      <Input
        type="text"
        id="description"
        {...register("description")}
        required
      />
      <label htmlFor="location">Location</label>
      <Input type="text" id="location" {...register("location")} required />
      <label htmlFor="sttime" className="">
        Start time
      </label>
      <div className="flex">
        <Input
          type="datetime-local"
          id="sttime"
          {...register("sttime")}
          required
        />
      </div>
      <label htmlFor="endtime" className="">
        End time
      </label>
      <div className="flex">
        <Input
          type="datetime-local"
          id="endtime"
          {...register("endtime")}
          required
        />
      </div>
      <div>
        <label htmlFor="slug">
          URL{" "}
          <span className="opacity-40">
            https://rsvp-river.vercel.app/event/
          </span>
        </label>
        <span>{labelValue}</span>
      </div>
      <Input
        type="text"
        id="slug"
        value={inputValue}
        {...register("slug")}
        onChange={handleInputChange}
        required
      />
    </form>
  );
}

export default MyForm;
