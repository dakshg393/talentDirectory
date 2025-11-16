import { useState } from "react";
import AddTalent from "../components/majorComponents/Talent/AddTalent";
import TalentList from "../components/majorComponents/Talent/TalentList";

const Talent = () => {
  const [addTalent, setAddTalent] = useState(false);
  const [filterSkill, setFilterSkill] = useState(null);

  return (
    <div className="p-[10px] flex flex-col w-full">
      <div className="flex flex-col items-center mt-[20px] w-full ">
        <input
          className=" p-[10px] max-w-full w-[400px] bg-gray-200 border-1 rounded-[10px]"
          type="text"
          placeholder="Search Talent By Skills"
            onChange={(e) => {setFilterSkill(e.target.value)}}
        />
        <div className="flex flex-row justify-end w-full mt-[10px] ">
          <button
            onClick={() => setAddTalent(true)}
            className="bg-blue-500 text-white p-[10px] cursor-pointer"
          >
            Add Talent
          </button>
        </div>
        <TalentList filterSkill={filterSkill} />
        {addTalent && <AddTalent onClose={()=>setAddTalent(false)}/>}
      </div>
    </div>
  );
};

export default Talent;
