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

const getTalentById = async (req, res) => {
  try {
    const { _id } = req.params;

    // Validate ObjectId
    if (!_id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid Talent ID" });
    }

    const talent = await Talent.findById(_id);

    if (!talent) {
      return res.status(404).json({ message: "Talent not found" });
    }

    res.status(200).json({ success: true, data: talent });
  } catch (error) {
    console.error("Error fetching talent:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


 const getAllTalents = async (req, res) => {
  try {
    const { skill, page = 1 } = req.query;
    const skipRecords = 25 * (page - 1);

    // Case-insensitive filter on skills
    let filter = {};
    if (skill) {
      const regex = new RegExp(skill, "i");
      filter = { skills: { $regex: regex } };
    }

    // 1️⃣ Get paginated talent list
    const talentList = await Talent.find(filter)
      .sort({ createdAt: -1 })
      .skip(skipRecords)
      .limit(25)
      .lean(); // lean for faster query

    // 2️⃣ Get stats using aggregation
    const statsAggregation = await Talent.aggregate([
      { $match: filter },
      {
        $facet: {
          totalCount: [{ $count: "totalTalent" }],
          avgExperience: [{ $group: { _id: null, avgExp: { $avg: "$experience" } } }],
          uniqueSkills: [
            { $unwind: "$skills" },
            { $group: { _id: null, allSkills: { $addToSet: "$skills" } } },
            { $project: { uniqueSkills: { $size: "$allSkills" } } },
          ],
        },
      },
    ]);

    const stats = {
      totalTalent: statsAggregation[0].totalCount[0]?.totalTalent || 0,
      avgExperience: statsAggregation[0].avgExperience[0]?.avgExp || 0,
      uniqueSkills: statsAggregation[0].uniqueSkills[0]?.uniqueSkills || 0,
    };

    res.status(200).json({
      success: true,
      data:{talentList,
      stats
      }
    });
  } catch (error) {
    console.error("Error fetching talents:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const updateTalent = async (req, res) => {
  try {
    const { id } = req.params; // Talent ID from URL
    const { name, email, skills, experience } = req.body;

    // Validate required fields (optional, you can choose which fields are required)
    if (!name && !email && !skills && experience === undefined) {
      return res
        .status(400)
        .json({ message: "At least one field (name, email, skills, experience) is required to update" });
    }

    // Check if talent exists
    const talent = await Talent.findById(id);
    if (!talent) {
      return res.status(404).json({ message: "Talent not found" });
    }

    // If updating email, check for duplicate
    if (email && email !== talent.email) {
      const existingTalent = await Talent.findOne({ email });
      if (existingTalent) {
        return res.status(409).json({ message: "Another talent with this email already exists" });
      }
    }

    // Update fields
    if (name) talent.name = name;
    if (email) talent.email = email;
    if (skills) talent.skills = skills;
    if (experience !== undefined) talent.experience = experience;

    const updatedTalent = await talent.save();

    res.status(200).json({
      success: true,
      message: "Talent updated successfully",
      data: updatedTalent,
    });
  } catch (error) {
    console.error("Error updating talent:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const deleteTalent = async (req, res) => {
  try {
    const { id } = req.params; // Get talent ID from URL

    // Check if talent exists
    const talent = await Talent.findById(id);
    if (!talent) {
      return res.status(404).json({ message: "Talent not found" });
    }

    // Delete talent
    await Talent.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Talent deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting talent:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


export {addTalent,getAllTalents,getTalentById,updateTalent,deleteTalent}