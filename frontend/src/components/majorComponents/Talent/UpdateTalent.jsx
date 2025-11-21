import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateTalent } from "../../../redux/talentSlice"; // your thunk for update
import InputBox from "../../minorComponents/InputBox";
import ModelContainer from "../../minorComponents/ModelContainer";
import Button from "../../minorComponents/Button";
import { toast } from "react-toastify";

function UpdateTalent({ onClose, defaultData }) {
  const dispatch = useDispatch();
  console.log(defaultData)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    skills: "",
    experience: 0,
  });
console.log(defaultData)
  // Populate form with default data
  useEffect(() => {
    if (defaultData) {
      setFormData({
        name: defaultData.name || "",
        email: defaultData.email || "",
        skills: defaultData.skills ? defaultData.skills.join(", ") : "",
        experience: defaultData.experience || 0,
      });
    }
  }, [defaultData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      id: defaultData._id, // pass the talent ID for update
      name: formData.name,
      email: formData.email,
      experience: Number(formData.experience),
      skills: formData.skills.split(",").map((s) => s.trim()),
    };

    try {
      dispatch(updateTalent(payload)); // dispatch update instead of add

      onClose();
    } catch (error) {
      console.error("Something went wrong:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <ModelContainer title={"Update Talent"} onClose={onClose}>
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
            min={0}
          max={100}
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

        <Button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Update Talent
        </Button>
      </form>
    </ModelContainer>
  );
}

export default UpdateTalent;
