import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTalent } from "../../../redux/talentSlice"; // your thunk
import InputBox from "../../minorComponents/InputBox";

const AddTalent = ({ onClose }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    skills: "",
    experience: 0,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // convert skills into array
    const payload = {
      name: formData.name,
      email: formData.email,
      experience: Number(formData.experience),
      skills: formData.skills.split(",").map((s) => s.trim()),
    };
    try {
      dispatch(addTalent(payload));

      setFormData({ name: "", email: "", skills: "",experience:0 });
      onClose();
    } catch (error) {
      console.alert("Somthing Went Wrong");
    }
  };

  return (
    <div className="max-w-md bg-white p-6 rounded-lg shadow absolute ">
      <span className="flex flex-row justify-between items-center">
        <h2 className="text-xl font-semibold mb-4 ">Add New Talent</h2>
        <button className="cursor-pointer" onClick={() => onClose()}>
          X
        </button>
      </span>
      <form onSubmit={handleSubmit}>
        <InputBox
          label="Name"
          name="name"
          placeholder="Enter name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <InputBox
          label="Email"
          name="email"
          type="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <InputBox
          label="Experience (in years)"
          name="experience"
          placeholder="e.g. 3"
          type="number"
          value={formData.experience}
          onChange={handleChange}
          required
        />
        <InputBox
          label="Skills (comma separated)"
          name="skills"
          placeholder="e.g. React, Node, MongoDB"
          value={formData.skills}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Add Talent
        </button>
      </form>
    </div>
  );
};

export default AddTalent;
