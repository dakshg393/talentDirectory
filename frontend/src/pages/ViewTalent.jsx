import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoBriefcase, IoMail } from "react-icons/io5";
import { MdOutlineArrowBack } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";

function ViewTalent() {
  const navigate = useNavigate();
  const { _id } = useParams();
  const [talent, setTalent] = useState(null);

  useEffect(() => {
    const fetchTalent = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/talents/${_id}`
        );
        setTalent(res?.data?.data); // assuming backend returns { success, data }
        console.log(res.data?.data)
      } catch (err) {
        console.error(err);
        // setError("Failed to fetch talent");
      } finally {
        // setLoading(false);
      }
    };

    fetchTalent();
  }, [_id]);
  return (
    <section className="flex flex-col gap-[20px]">
      <div
        onClick={() => navigate("/")}
        className="inline-flex items-center gap-[10px] hover:text-primary cursor-pointer"
      >
        <div className="h-10 w-10 rounded-full bg-surface dark:bg-surface-dark  p-2 flex items-center justify-center">
          <MdOutlineArrowBack />
        </div>
        <h1>Back To DashBoard</h1>
      </div>

      <div className="flex flex-col p-[40px] gap-[20px] border-1 border-border-color bg-surface dark:bg-surface-dark justify-center rounded-[10px] items-center">
        <div className=" h-[80px] ring-4 ring-primary aspect-square rounded-full flex items-center justify-center font-bold text-4xl ">
          {talent?.name[0]}
        </div>

        <div className="flex flex-col gap-[10px] items-center">
          <h1>{talent?.name}</h1>
          <div className="flex flex-row gap-[7px] flex-wrap">
            {talent?.skills?.map((skill) => (
              <span className="flex p-1 px-2 rounded-[20px] border-1 border-border-color">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <a
          href={`mailto:${`dakshg393@gmail.com`}`}
          className="flex items-center justify-center w-full p-[10px] border-1 border-border-color rounded-[10px] cursor-pointer"
        >
          <h2 className="inline-flex gap-[10px] items-center">
            {/* <span className="flex items-center justify-center bg-surface dark:bg-surface-dark border-1 border-border-color p-1 rounded-[5px]"> */}
            <IoMail /> {talent?.email}
            {/* </span> */}
          </h2>
        </a>
      </div>

      <div className="flex flex-row p-[40px] gap-[20px] border-1 border-border-color bg-surface dark:bg-surface-dark justify-between rounded-[10px] items-center">
        <h1 className="inline-flex gap-[20px] items-center">
          {" "}
          <span className="flex items-center justify-center bg-surface dark:bg-surface-dark border-1 border-border-color p-1 rounded-[5px]">
            <IoBriefcase />{" "}
          </span>
          Experience
        </h1>
        <h1 className="inline-flex justify-between">{talent?.experience} Years</h1>
      </div>
    </section>
  );
}

export default ViewTalent;
