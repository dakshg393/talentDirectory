import Talent from "../models/talent.model.js";

const addTalent = async (req, res) => {
  try {
    const { name, email, skills, experience } = req.body;

    if (!name || !email || experience === undefined) {
      return res
        .status(400)
        .json({ message: "Name, Email and Experience are required" });
    }

    const existingTalent = await Talent.findOne({ email });
    if (existingTalent) {
      return res
        .status(409)
        .json({ message: "Talent with this email already exists" });
    }

    const newTalent = await Talent.create({
      name,
      email,
      skills,
      experience,
    });

    res.status(201).json({
      success: true,
      message: "Talent created successfully",
      data: newTalent,
    });
  } catch (error) {
    console.error("Error creating talent:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};



 const getAllTalents = async (req, res) => {
  try {
    const { skill } = req.query;

    let filter = {};

    if (skill) {
      // i is for case insensative in regex
      const regex = new RegExp(skill, "i");
      filter = { skills: { $regex: regex } };
    }

    const talents = await Talent.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: talents.length,
      data: talents,
    });
  } catch (error) {
    console.error("Error fetching talents:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


export {addTalent,getAllTalents}