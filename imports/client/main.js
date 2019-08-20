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

