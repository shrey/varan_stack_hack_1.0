const router = require('express').Router()
const {Storage} = require('@google-cloud/storage')
const Multer = require('multer')
const fs = require('fs');


const secret_file = "./.secret_key.json"

const storage = new Storage({
	projectId: process.env.PROJECT_ID || "varan-e2dbf",
	keyFilename: secret_file

});

const bucket = storage.bucket(process.env.BUCKET_URL || "varan-e2dbf.appspot.com")

const multer = Multer({
	storage: Multer.memoryStorage(),
	limits: {
		fileSize: 10 * 1024 * 1024 // Limit 10mb
	}
});

router.post('/', multer.single('file'), (req, res, next)=>{

	console.log("YOU HIT UPLOAD FILE ENDPOINT")
	const file = req.file;


	if(file){

		let newFileName = `${req.file.originalname}_${Date.now()}`;
        const blob = bucket.file(newFileName);
        const blobStream = blob.createWriteStream({
                metadata: {
                        contentType: req.file.mimetype,
                },
        });

            blobStream.on('error', (err) =>{ var data = { "error" : err}
        		console.log("ERP! ",data);
		    res.status(401).json(data);
            });
            blobStream.on('finish', ()=>{
            const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURI(blob.name)}?alt=media`;

                    var data = {
                        url : publicUrl,
                        fileName : newFileName
                }
                    res.status(200).json(data);
        });
            blobStream.end(file.buffer);
	}
	else{
		res.status(401).json({"msg" : "Please select a file"});
	}
});

const upload = (file) =>{


	if (!file) {
      	var data =  { "error" : "ERROR"};
		return data;
    }else{

	let newFileName = `${file.originalname}_${Date.now()}`;
    	const blob = bucket.file(newFileName);
	const blobStream = blob.createWriteStream({
		metadata: {
			contentType: file.mimetype,
		},
	});

	    blobStream.on('error', (err) =>{ var data = { "error" : err}
	    	return data;
	    });
	    blobStream.on('finish', ()=>{
	    const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURI(blob.name)}?alt=media`;

		    var data = {
			url : publicUrl,
			fileName : newFileName
		}
		    console.log("DATA: ",data);
		    return data;
    	});
	    blobStream.end(file.buffer);

}
}

module.exports = router;
