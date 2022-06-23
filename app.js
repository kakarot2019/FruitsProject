// requiring mongoose
const mongoose= require("mongoose");

//this line connects our database to localhost and takes us to FruitsDB , if it isn't created then it will create a bew DB called so
//usenewurlparser removes the depreciation warning that occrs when node app.js is run
//mongoose.Connection("mongodb://localhost:27017//FruitsDB",{useNewUrlparser : true})
mongoose.connect('mongodb://127.0.0.1:27017/fruitsDB', {useNewUrlParser: true,  useUnifiedTopology: true});
var connection = mongoose.connection;

//creatin a schema
const FruitsSchema= mongoose.Schema({
    name: {
        type:String,
        required: [true,"Error,Please enter name..!"]
    },
    //data validators in mongoose
    rating: {
        type: Number,
        min:1,
        max:10
    },
    review: String
});

//creating a new document(collection/table) called fruit that obeys fruitsschema model,
//we will name it singular "Fruit" but mongoose will automatically save it in plural form "fruits" using lodash 
const Fruit =mongoose.model("Fruit",FruitsSchema);

//putting value of row 1 elements as jsobjects
const fruit= new Fruit({
    name: "Apple",
    rating: 8,
    review: "Review of apple"
});

//saving and inserting it in the collection,(f.save() , f.insertOne(), insertMany() -- all can be used)
//everytime we save the file and run it will save the file again and again
//fruit.save();

//to read the rows in the collection
//"Fruit" is the collection name onm which find() is ran
Fruit.find(function(err , fruits){
    if(err)
        console.log(err);
    else
    //we can also loop through the fruits using forEach() and print out specific columns using .name , .rating,etc
        console.log(fruits);
    
        //close the connection once we are done showing fruits
        mongoose.connection.close();
})

// to update a row, we can use Fruit.updateOne({})
// refer to mongoose docs for CRUD operations
