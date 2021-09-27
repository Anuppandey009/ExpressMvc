const express=require("express");
const mongoose=require("mongoose");

const connect= ()=>{
    return mongoose.connect("mongodb://127.0.0.1:27017/web11"); //database
}

const app=express();
app.use(express.json());


// creating user schema

const User= new mongoose.Schema({
    first_name:{type:String,required:true},
    last_name:{type:String,required:true},
    gender:{type:String,required:true},
    date_of_birth:{type:Number,required:false}

})

const user1 = mongoose.model("User", User);



// creating student Schema

const student= new mongoose.Schema({
    current_batch:{type:String,required:true},
    
    roll_id:{type:Number,required:true},
    user_ref: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }

    ],

  

})

const student1 = mongoose.model("student", student);



 // creating instructor schema

//  const instructor=new mongoose.Schema({
//      ia_name:{type:"string",required:true} ,
//     // user_schema: {
//     //     type: mongoose.Schema.Types.ObjectId,
//     //     ref: "User",
//     //     required: true,
//     //   }
   
// })
// const instructor1 = mongoose.model("instructor", instructor);


// creating topi schema

const topic_schema=new mongoose.Schema({
   subject1:{type:String,required:true},
   subject2:{type:String,required:true},
   subject3:{type:String,required:true},


   
})

const topic1 = mongoose.model("topic", topic_schema);



// creating evaluation schema

const Evaluation=new mongoose.Schema({
    date_of_evaluation:{type:Number,required:true},
    user_schema: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      }
      ,
      subject_schema: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "topic",
        required: true,
      }

})
const Evaluation1= mongoose.model("evaluation", Evaluation);





//   CRUD API



                          // user crud operation
//============================================================================
              // user crud operation

app.post("/users", async(req, res) => {
    const users = await user1.create(req.body); //this line works as a mongo db query>>
    return res.status(201).send({ users });
  });
  

  app.get("/users", async (req, res) => {
        const user = await user1.find().lean().exec();    //Db query
        return res.status(200).send({ user });
    });
    



//=============================================================================================





// crud operation for student


app.post("/students", async(req, res) => {
    const student = await student1.create(req.body); 
    return res.status(201).send({ student });
  });
  

  app.get("/students", async (req, res) => {
        const student = await student1.find().populate("user_ref").lean().exec();    //Db query
        return res.status(200).send({ student});
    });



//===========================================================================

//crud operation  for subject


app.post("/subject", async(req, res) => {
    const sub = await  topic1.create(req.body); 
    return res.status(201).send({sub});
  });
  

  app.get("/subject", async (req, res) => {
        const sub = await topic1.find().lean().exec();    //Db query
        return res.status(200).send({sub});
    });





//============================================================================

// crud operation for Evaluation

app.post("/evaluation", async(req, res) => {
    const eval = await  Evaluation1.create(req.body); 
    return res.status(201).send({eval});
  });
  

  app.get("/evaluation", async (req, res) => {
        const eval = await Evaluation1.find().populate("user_schema").populate("subject_schema").lean().exec();    //Db query
        return res.status(200).send({eval});
    });












app.listen(2345,async function(){
    await connect();
    console.log("listen on port 2345");
})