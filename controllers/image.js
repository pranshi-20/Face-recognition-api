const clarifai=require('clarifai');
const app=new Clarifai.App({
  apiKey: '9fcb90299c374b7cbec96535a74a775b'
});

const handleApiCall=(req, res)=>{
	app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data=>{
		res.json(data);
	})
	.catch(err=>res.status(400).json('Unable to work with API'))
}
const handleImage=(req, res, db)=>{
	const { id }=req.body; 
	db('users').where('id', '=', id)
		.increment('entries', 1)
		.returning('entries')
		.then(entries=>{
			res.json(entries[0]);
		})
		.catch(err=>res.status(400).json('Unable to Get'))	

}

module.exports={
	handleImage: handleImage,
	handleApiCall: handleApiCall
}
