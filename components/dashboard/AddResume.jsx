"use client";
import { PlusSquare } from "lucide-react";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import FormField from "../custom/FormField";
import { createResume } from "@/lib/database/api/resume";

const AddResume = ({ session }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState(false);
  const [Loading, setLoading] = useState(false);

  const handleCreateResume = () => {
    setLoading(true);
    createResume(session?.user?.email, resumeTitle).then((res) => {
      // console.log(res);
      alert(JSON.stringify(res));
      setLoading(false);
      setOpenDialog(!openDialog);
    });
  };
  return (
    <div className="w-full col-span-1">
      <Dialog open={openDialog}>
        <DialogTrigger
          className="w-full p-14 py-24 border-2 flex items-center justify-center bg-secondary rounded-lg h-[280px] hover:shadow-md border-dashed smooth-transition cursor-pointer"
          onClick={() => {
            setOpenDialog(!openDialog);
          }}
        >
          <PlusSquare />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className={"flex flex-col gap-4"}>
            <DialogTitle>Create new Resume</DialogTitle>
            <FormField
              type={"text"}
              handleChange={(value) => {
                setResumeTitle(value);
              }}
              label={"Resume Title"}
              defaultValue={""}
            />
            {/* <FormField
              type={"textarea"}
              handleChange={(value) => {
                setJobDescription(value);
              }}
              label={"Job Description"}
              defaultValue={""}
            /> */}
            <span className="w-full flex justify-end gap-2">
              <Button
                variant="ghost"
                onClick={() => {
                  setOpenDialog(!openDialog);
                }}
              >
                Cancel
              </Button>
              <Button
                disabled={!resumeTitle || Loading}
                onClick={() => {
                  handleCreateResume();
                }}
              >
                Create
              </Button>
            </span>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddResume;
