const express = require('express') , 
      router  = require('express').Router(),
      mainController = require('../app/controllers/main.controller') ,
      eventsController = require('../app/controllers/events.controller');

module.exports = router;

// Application Route 
router.get('/' , mainController.index);
// Events Route
router.get('/events' , eventsController.showEvents);
// Create Event
router.get('/events/create' , eventsController.create);
router.post('/events/create' , eventsController.store);
// Create Single
router.get("/events/:_id" , eventsController.show);
router.get("/events/:_id/edit" , eventsController.edit);
router.post("/events/:_id/update" , eventsController.update);
router.get("/events/:_id/delete" , eventsController.deleteEvent);




