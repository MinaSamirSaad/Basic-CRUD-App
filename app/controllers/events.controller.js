// Require Our Model 
const Event = require('../models/event');
let errors = [];
// Show All Events 
function showEvents(req, res) {
    // const events = [
    //     {
    //         id : 1 , 
    //         title : "Html5 Event" , 
    //         price : 500 ,
    //         description : "Lorem ipsum dolor sit amet, consectetur adipisicing elit."
    //     },
    //     {
    //         id : 2 , 
    //         title : "Css3 Event" , 
    //         price : 800 ,
    //         description : "Lorem ipsum dolor sit amet, consectetur adipisicing elit."
    //     },
    //     {
    //         id : 3 , 
    //         title : "Javascript Event" , 
    //         price : 1000 ,
    //         description : "Lorem ipsum dolor sit amet, consectetur adipisicing elit."
    //     }
    // ]
    Event.find({}, (err, events) => {
        res.render('events.ejs', { title: "Events Page", events });
    });
}
// Show Single
async function show(req, res) {
    let id = req.params._id;
    const event = await Event.findById(id);
    event == null && res.redirect('/');
    res.render('show.ejs', { title: "Show Single", event })
}
// Create New Event 

function create(req, res) {
    res.render('create.ejs', { title: "Create Event", errors });
}

function store(req, res) {
    const newEvent = new Event({
        title: req.body.title,
        price: req.body.price || 500,
        description: req.body.description
    })

    if (newEvent.title == '' || newEvent.description == '') {
        errors.push("fill the inputs")
        res.redirect('/events/create')

    }
    else if (newEvent.price < 500) { 
        errors.push("the price must be more than 500")
        res.redirect('/events/create')
    } else {
    newEvent.save((err) => {
        if (err) throw err;
        console.log('Event Added Successfully !');
    });
    errors=[]
    res.redirect('/events');
    
    }
}

async function edit(req, res) {
    id = req.params._id;
    const event = await Event.findById(id)
    res.render('edit.ejs', { title: "edit Event", event ,errors})
}
async function update(req, res) {
    id = req.params._id;
    const event = await Event.findById(id)
    event.title = req.body.title
    event.price = req.body.price
    event.description = req.body.description
    if (event.title == '' || event.description == '') {
        errors.push("fill the inputs")
        res.redirect(`/events/${id}/edit`);
    }
    else if (event.price < 500) { 
        errors.push("the price must be more than 500")
        res.redirect(`/events/${id}/edit`);
    } else{
        event.save((err) => {
            if (err) throw err;
            console.log('Event Added Successfully !');
        });
        res.redirect('/events')
        errors=[]
    }

}
async function deleteEvent(req, res) {
    id = req.params._id;
    Event.deleteOne({ "_id": id }, (err) => {
        if (err) console.log(err);
        res.redirect('/events')
    })

}

module.exports = {
    showEvents,
    create,
    store,
    show,
    edit,
    update,
    deleteEvent
}
