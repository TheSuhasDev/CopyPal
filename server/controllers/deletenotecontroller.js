const User = require("../models/User");

const deletenote = async (req, res) => {
  try {
    const { id } = req.params;
    const { index } = req.query;
    const user = await User.findById(id);
    if(!user||!user.notes){
        res.status(400).json({
            success: false,
            message: "failed to delete note",
          });
    }
    const notes = user.notes;
    notes.splice(index, 1);
    await user.save();
    res.status(200).json({
      success: true,
      message: "Note deleted successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      success: false,
      message: "failed to delete note",
    });
  }
};

module.exports = deletenote;
