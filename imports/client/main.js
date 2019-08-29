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