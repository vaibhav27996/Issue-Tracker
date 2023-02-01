const mongoose=require('mongoose');

const projectIssueSchema=new mongoose.Schema({
    project_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Project'
    },
    issue_title:{
        type:String,
        required:true
    },
    issue_description:{
        type:String,
        required:true
    },
    issue_author:{
        type:String,
        required:true
    },
    issue_array:[
        {
            type:String,
        }
    ],
    issue_status:{
        type:Number,
    }
},{
    timestamps:true
});

const ProjectIssue=mongoose.model('Project_Issue',projectIssueSchema);
module.exports=ProjectIssue;