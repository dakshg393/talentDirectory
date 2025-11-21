import React, { useState } from "react";
import { IoBriefcase, IoMail } from "react-icons/io5";
import { MdDelete, MdEdit, MdKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import UpdateTalent from "../majorComponents/Talent/UpdateTalent";
import DeleteTalent from "../majorComponents/Talent/DeleteTalent";

function TalentCard({ talent }) {
  const navigate = useNavigate();

  const [selectedTalent, setSelectedTalent] = useState(null);
  const [updateTalent, setUpdateTalent] = useState(false);
  const [deleteTalent, setDeleteTalent] = useState(false);
  return (
    <>
      <div
        onClick={() => navigate(`viewTalent/${talent?._id}`)}
        className="group flex flex-col border-1 border-border-color gap-[10px] bg-surface dark:bg-surface-dark p-[25px] rounded-[20px] cursor-pointer gap-[20px] flex-wrap
    transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 hover:shadow-xl"
      >
        <div className="flex flex-row gap-[20px]">
          <div className="h-full  group-hover:text-primary bg-surface dark:bg-surface-dark border-1 border-border-color aspect-square rounded-[10px] flex items-center justify-center text-2xl font-bold">
            {talent?.name[0]}
          </div>
          <div className="flex flex-col justify-between">
            <h1 className="group-hover:text-primary capitalize">
              {talent?.name}
            </h1>
            <span className="flex flex-row gap-[2px]">
            {talent?.skills.map((skill) => (
              <h3>{skill}, </h3>
            ))}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-[10px]">
          <h2 className="inline-flex gap-[10px] items-center">
            <span className="flex items-center justify-center bg-surface dark:bg-surface-dark border-1 border-border-color p-1 rounded-[5px]">
              <IoBriefcase />{" "}
            </span>
            {talent?.experience} Years Experience
          </h2>
          <h2 className="inline-flex gap-[10px] items-center">
            <span className="flex items-center justify-center bg-surface dark:bg-surface-dark border-1 border-border-color p-1 rounded-[5px]">
              <IoMail />{" "}
            </span>
            {talent?.email}
          </h2>
        </div>

        <div className="flex flex-row justify-between gap-[20px] py-[15px] border-t-1 border-border-color">
          <h2 className="inline-flex gap-[2px] items-center text-primary">
            View Profile
            <MdKeyboardArrowRight />
          </h2>
          <div className="hidden group-hover:flex flex-row  items-center gap-[10px]  ">
            <span
              onClick={(e) => {
                e.stopPropagation();
                setSelectedTalent(talent);
                setUpdateTalent(true);
              }}
              className="flex items-center justify-center bg-surface dark:bg-surface-dark border-1 border-border-color p-1 rounded-[5px] "
            >
              <MdEdit />{" "}
            </span>
            <span
              onClick={(e) => {
                e.stopPropagation();
                setSelectedTalent(talent);
                setDeleteTalent(true);
              }}
              className="flex items-center justify-center bg-surface dark:bg-surface-dark border-1 border-border-color p-1 rounded-[5px]"
            >
              <MdDelete />{" "}
            </span>
          </div>
        </div>
      </div>
      {updateTalent && <UpdateTalent onClose={() => setUpdateTalent(false)} defaultData={selectedTalent} />}
      {deleteTalent && <DeleteTalent onClose={() => setDeleteTalent(false)} defaultData={selectedTalent}/>}
    </>
  );
}

export default TalentCard;
