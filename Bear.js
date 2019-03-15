let express = require('express');
let bodyParser = require('body-parser');
let router = express.Router();
let cors = require('cors');
let app = express();
app.use(cors());

// all of our routes will be prefixed with /api
app.use('/api', bodyParser.json(), router);   //[use json]
app.use('/api', bodyParser.urlencoded({ extended: false }), router);

let bears = [{'id':0,'name':'pooh','surname': 'Titi','major':'CoE','GPA':3.32},
   {'id':1,'name':'tooh','surname': 'Witi','major':'CoE','GPA':3.2}
];

let bearIndex=2;

router.route('/bears')
   // get all bears
   .get( (req, res) =>  res.json(bears) ) 

   // insert a new bear
   .post( (req, res)=> {
       var bear = {};
       bear.id =  bearIndex++;
       bear.name = req.body.name
       bear.surname = req.body.surname
       bear.major = req.body.major
       bear.GPA = req.body.GPA
       bears.push(bear);
       res.json( {message: 'Bear created!'} )
   })

router.route('/bears/:bear_id')
   .get ( (req,res) => res.json(bears[req.params.bear_id]))  // get a bear

   .put ( (req,res) => {                               // Update a bear
       var id = req.params.bear_id
       bears[id].major = req.body.major;   
       bears[id].GPA = req.body.GPA;   
       res.json({ message: 'Bear updated!' + req.params.bear_id});
   })

   .delete ( (req,res) => {                   // Delete a bear
       delete     bears[req.params.bear_id]
       res.json({ message: 'Bear deleted: ' + req.params.bear_id});
   })




app.use("*", (req,res) => res.status(404).send('404 Not found') );
app.listen(80,  () => console.log("Server is running") );