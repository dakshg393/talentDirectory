import React from "react";
import { useDispatch } from "react-redux";
import { deleteTalent } from "../../../redux/talentSlice"; // your thunk
import ModelContainer from "../../minorComponents/ModelContainer";
import Button from "../../minorComponents/Button";
import { toast } from "react-toastify";

function DeleteTalent({ onClose, defaultData }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (!defaultData?._id) return;

    try {
      dispatch(deleteTalent(defaultData._id)); // dispatch delete action with talent ID
      onClose();
    } catch (error) {
      console.error("Error deleting talent:", error);
      toast.error("Something went wrong while deleting");
    }
  };

  return (
    <ModelContainer title={"Delete Talent"} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <h1 className="text-lg font-semibold">
          Are you sure you want to delete this talent?
        </h1>
        <h2>Name: {defaultData?.name}</h2>
        <h2>Email: {defaultData?.email}</h2>

        <Button
          type="button"
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
          onClick={handleDelete}
        >
          Delete
        </Button>
      </div>
    </ModelContainer>
  );
}

export default DeleteTalent;
