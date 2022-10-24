import express,{Request,Response} from 'express';
import mongoose from 'mongoose';
import Book from './models/book.model';
const app = express();

const uri = 'mongodb://root:AMSHXbKIoiG2@192.168.64.4:27017/biblio?authSource=admin';
const connection = mongoose.connect(uri,(err) => {
	if (err) {
		console.log(err.message);
	} else {
		console.log("Successfully Connected!");
	}
});

app.get('/books',(req:Request,res:Response)=>{
	Book.find((err,books) => {
		if (err){
			res.status(500).send(err);
		}else{
			res.status(200).json(books);
		}
	});
});

app.get('/', (req, res) => {
	  res.send('Hello World!');
});

app.listen(3000, () => {
	  console.log('Server is running on port 3000');
});