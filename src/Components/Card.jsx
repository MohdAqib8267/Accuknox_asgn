import { Plus } from "lucide-react";
import React from "react";
import { Button,Card, Checkbox, Label, Modal, Textarea, TextInput } from "flowbite-react";
import { useState } from "react";

const Cards = ({widget}) => {

  return (
    
    <Card className="grid-cols-1 h-[15rem] bg-white flex justify-center items-start rounded-2xl">
      <div className=" flex w-full h-full flex-col gap-4">
        <h2 className="font-bold text-3xl text-zinc-900">{widget.name}</h2>
        <p className="text-gray-700 font-medium">{widget?.information!=""?widget?.information:"No Information Available"}</p>
      </div>
    </Card>

  );
};

export default Cards;
