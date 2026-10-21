const mongoose = require("mongoose");

const analyseSchema = new mongoose.Schema(
  {
    contenu : String,
    status: {
      type: String,
      enum: ["En cours", "Pret"],
      default : "En cours",
      required: true
    },
    patient : {
        type : mongoose.Types.ObjectId,
        ref : "User"
    } ,
    biologiste : {
        type : mongoose.Types.ObjectId,
        ref : "User"
    } 
    
  }
);

module.exports = mongoose.model("Analyse", analyseSchema);
