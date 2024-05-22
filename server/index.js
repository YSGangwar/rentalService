import express from 'express';
import mongoose from 'mongoose'
import cors from 'cors';
import router from './route/index.js';
console.log("TCL: router", router)

const app = express();
app.use(express.json());
app.use(cors());
mongoose.connect("mongodb+srv://yuvrajgangwar:t8B4otz0LL5ImBGs@fullstackprojects.4p96yrc.mongodb.net/?retryWrites=true&w=majority&appName=FullstackProjects",{
}).then(() => {
    console.log('Connected to MongoDB');
  }).catch((err) => {
    console.error('Error connecting to MongoDB', err);
  });


app.use('/',router)

app.listen(3000,()=>{
    console.log("Dont Touch ,its Still Alive ");
})