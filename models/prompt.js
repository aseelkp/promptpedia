import mongoose, { Schema, models }  from "mongoose"

const PromptSchema = new Schema({
    creator : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    prompt : {
        type : String,
        required : [true , "prompt is required"]
    },
    tag : {
        type : String,
        required : [true , "tag is required"]
    },
});

const Prompt = models.Prompt || mongoose.model("Prompt" , PromptSchema);


export default Prompt; 
