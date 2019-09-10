import { Accounts } from "meteor/accounts-base";
import { Router } from 'meteor/iron:router';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

/// routing

Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

Router.route('/', function () {
  this.render('welcome', {
    to:"main"
  });
});

Router.route('/images', function () {
  this.render('navbar', {
    to:"navbar"
  });
  this.render('images', {
    to:"main"
  });
});

Router.route('/image/:_id', function () {
  this.render('navbar', {
    to:"navbar"
  });
  this.render('image', {
    to:"main",
    data:function(){
      return Images.findOne({_id:this.params._id});
    }
  });
});


/// infiniscroll

Session.set("imageLimit", 8);
lastScrollTop = 0;
$(window).scroll(function(event){
// test if we are near the bottom of the window
if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
  // where are we in the page?
  var scrollTop = $(this).scrollTop();
  // test if we are going down
  if (scrollTop > lastScrollTop){
    // yes we are heading down...
   Session.set("imageLimit", Session.get("imageLimit") + 4);
  }

  lastScrollTop = scrollTop;
}

})




/// accounts config

Accounts.ui.config({
passwordSignupFields: "USERNAME_AND_EMAIL"
});

///


Template.images.helpers({
images:function(){
  if (Session.get("userFilter")){// they set a filter!
    return Images.find({createdBy:Session.get("userFilter")}, {sort:{createdOn: -1, rating:-1}});
  }
  else {
    return Images.find({}, {sort:{createdOn: -1, rating:-1}, limit:Session.get("imageLimit")});
  }
},
filtering_images:function(){
  if (Session.get("userFilter")){// they set a filter!
    return true;
  }
  else {
    return false;
  }
},
getFilterUser:function(){
  if (Session.get("userFilter")){// they set a filter!
    var user = Meteor.users.findOne(
      {_id:Session.get("userFilter")});
    return user.username;
  }
  else {
    return false;
  }
},
getUser:function(user_id){
  var user = Meteor.users.findOne({_id:user_id});
  if (user){
    return user.username;
  }
  else {
    return "anon";
  }
}
});