var mongoose   = require("mongoose"),
    Campground = require("./models/campground"),
    Comment    = require("./models/comment")
    
    
var data = [
    {
        name:"Cloud's rest",
        image:"https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut eu sem integer vitae justo eget. Pellentesque elit ullamcorper dignissim cras tincidunt lobortis. Enim nulla aliquet porttitor lacus luctus accumsan tortor. Libero justo laoreet sit amet. Turpis tincidunt id aliquet risus feugiat. Maecenas volutpat blandit aliquam etiam erat. Amet consectetur adipiscing elit ut. Rhoncus mattis rhoncus urna neque. Vel turpis nunc eget lorem dolor sed viverra ipsum. Libero nunc consequat interdum varius sit amet mattis vulputate. Eu consequat ac felis donec et odio pellentesque diam volutpat. Sem et tortor consequat id porta nibh venenatis cras. Lacus sed viverra tellus in hac habitasse. Convallis tellus id interdum velit laoreet id donec ultrices tincidunt."
    },
    {
        name:"Desert Mesa",
        image:"https://farm3.staticflickr.com/2353/2069978635_2eb8b33cd4.jpg",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut eu sem integer vitae justo eget. Pellentesque elit ullamcorper dignissim cras tincidunt lobortis. Enim nulla aliquet porttitor lacus luctus accumsan tortor. Libero justo laoreet sit amet. Turpis tincidunt id aliquet risus feugiat. Maecenas volutpat blandit aliquam etiam erat. Amet consectetur adipiscing elit ut. Rhoncus mattis rhoncus urna neque. Vel turpis nunc eget lorem dolor sed viverra ipsum. Libero nunc consequat interdum varius sit amet mattis vulputate. Eu consequat ac felis donec et odio pellentesque diam volutpat. Sem et tortor consequat id porta nibh venenatis cras. Lacus sed viverra tellus in hac habitasse. Convallis tellus id interdum velit laoreet id donec ultrices tincidunt."
    },
    {
        name:"Canyon Floor",
        image:"https://farm9.staticflickr.com/8167/7121865553_e1c6a31f07.jpg",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut eu sem integer vitae justo eget. Pellentesque elit ullamcorper dignissim cras tincidunt lobortis. Enim nulla aliquet porttitor lacus luctus accumsan tortor. Libero justo laoreet sit amet. Turpis tincidunt id aliquet risus feugiat. Maecenas volutpat blandit aliquam etiam erat. Amet consectetur adipiscing elit ut. Rhoncus mattis rhoncus urna neque. Vel turpis nunc eget lorem dolor sed viverra ipsum. Libero nunc consequat interdum varius sit amet mattis vulputate. Eu consequat ac felis donec et odio pellentesque diam volutpat. Sem et tortor consequat id porta nibh venenatis cras. Lacus sed viverra tellus in hac habitasse. Convallis tellus id interdum velit laoreet id donec ultrices tincidunt."
    }
    ]
    
function seedDB(){
    // REMOVE all campgrounds
// Campground.remove({},function(err){
//     if(err){
//         console.log(err);
//     }
//     else {
//         console.log("Removed campgrounds!");
//     }
// })
    // Add campgrounds
// data.forEach(function(seed){
//     Campground.create(seed,function(err,campground){
//         if(err){
//             console.log(err);
//         }
//         else {
//             console.log("Added a campground");
//      // Create a comment
//             Comment.create({
//                 text:"This place is great, but I wish there was internet",
//                 author:"Homer"
//             },function(err,comment){
//                 if(err){
//                     console.log(err);
//             }
//                 else {
//                     campground.comments.push(comment);
//                     campground.save();
//                     console.log("Created new comment");
//                     }   
//                 })
//             }
        
//         })
//     })
}

module.exports = seedDB;