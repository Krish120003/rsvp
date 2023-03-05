import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "./Input";
import { Button } from "./Button";

type FormValues = {
  name: string;
  description: string;
  sttime: string;
  endtime: string;
  slug: string;
};

function MyForm() {
  const { register, handleSubmit, watch } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);

  const [inputValue, setInputValue] = useState<string>("");
  const [labelValue, setLabelValue] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setLabelValue(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <label htmlFor="name" className="">
        Name
      </label>
      <Input type="text" id="name" {...register("name")} />
      <label htmlFor="description" className="">
        Description
      </label>
      <Input type="text" id="description" {...register("description")} />
      <label htmlFor="sttime" className="">
        Start time
      </label>
      <div className="flex">
        <Input type="date" id="sttime" {...register("sttime")} />
        <Input type="time" {...register("sttime")}></Input>
      </div>
      <label htmlFor="endtime" className="">
        End time
      </label>
      <div className="flex">
        <Input type="date" id="endtime" {...register("endtime")} />
        <Input type="time" {...register("endtime")} />
      </div>
      <div>
        <label htmlFor="my-input">
          URL{" "}
          <span className="opacity-40">
            https://rsvp-river.vercel.app/event/
          </span>
        </label>
        <span>{labelValue}</span>
      </div>

      <Input
        type="text"
        id="my-input"
        value={inputValue}
        onChange={handleInputChange}
      />
    </form>
  );
}

export default MyForm;
