let express = require('express');
let bodyParser = require('body-parser');
let router = express.Router();
let cors = require('cors');
let app = express();
app.use(cors());

// all of our routes will be prefixed with /api
app.use('/api', bodyParser.json(), router);   //[use json]
app.use('/api', bodyParser.urlencoded({ extended: false }), router);

let students = [{'id':0,'name':'pooh','surname': 'Titi','major':'CoE','GPA':3.32},
   {'id':1,'name':'tooh','surname': 'Witi','major':'CoE','GPA':3.2}
];

let studentIndex=2;

router.route('/students')
   // get all bears
   .get( (req, res) =>  {students = students.filter((student) => student !== null )
    res.json(students) }) 

   // insert a new bear
   .post( (req, res)=> {
       var student = {};
       student.id =  studentIndex++;
       student.name = req.body.name
       student.surname = req.body.surname
       student.major = req.body.major
       student.GPA = req.body.GPA
       students.push(student);
       res.json( {message: 'student delete!'} )
   })

router.route('/students/:id')
   .get ( (req,res) => res.json(students[req.params.id]))  // get a bear

   .put ( (req,res) => {                               // Update a bear
       var id = req.params.id
       students[id].major = req.body.major;   
       students[id].GPA = req.body.GPA;   
       res.json({ message: 'student updated!' + students[id].id + students[id].name + students[id].surname + students[id].major + students[id].GPA});
   })

   .delete ( (req,res) => {                   // Delete a bear
       delete     students[req.params.id]
       res.json({ message: 'student deleted: ' + req.params.id});
   })




app.use("*", (req,res) => res.status(404).send('404 Not found') );
app.listen(80,  () => console.log("Server is running") );