const express=require('express');
const bodyParser=require('body-parser');
const bcrypt=require('bcrypt-nodejs')
const cors=require('cors');
const knex=require('knex');
const register=require('./controllers/register');
const signin=require('./controllers/signin');
const profile=require('./controllers/profile');
const image=require('./controllers/image');
const db=knex({
	client:'pg',
	connection:{
		host:'127.0.0.1',
		user:'postgres',
		password:'',
		database:'face-recognition'
	}
});



const app= express();
app.use(bodyParser.json());
app.use(cors());
app.get('/', (req, res)=>{res.send('It is Working!')})
app.post('/signin', (req, res)=>{signin.handleSignin(req, res, db, bcrypt)})

app.post('/register', (req, res)=>{register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res)=>{profile.handleProfileGet(req, res, db)})

app.put('/image', (req, res)=>{image.handleImage(req, res, db)})
app.post('/imageurl', (req, res)=>{image.handleApiCall(req, res)})

app.listen(3000, ()=>{
	console.log('app is running');
})



/*
res->this is working
/signin--> Post reques respond with either sucess or fail
/register --> POST=user
/ability to access the profile of the user
/userid--> get user informatio and return user
/image--> PUT --> retur the updated user object or the updated count

*/