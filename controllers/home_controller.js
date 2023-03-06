const Project=require('../models/project');
const ProjectIssue=require('../models/project_issue');

//const env=require('../config/environment');

//home page
module.exports.home=async function(req,res){
    let projectList=await Project.find({});
    

    return res.render('home',{
        title:'Projest Page',
        projectList:projectList
    });
}

