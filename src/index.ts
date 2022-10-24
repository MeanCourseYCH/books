import express,{Request,Response} from 'express';
import mongoose from 'mongoose';
import Book from './models/book.model';
import bodyParser from 'body-parser';
const app = express();
// app.use(bodyParser.json)
app.use(bodyParser.json());
const uri = 'mongodb://root:AMSHXbKIoiG2@192.168.64.4:27017/biblio?authSource=admin';
mongoose.connect(uri,(err) => {
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

//pagination
app.get('/booksParPage',(req:Request,res:Response)=>{
	const page:number = parseInt(req.query.page?.toString()||'1');
	const size:number = parseInt(req.query.size?.toString()||'5');

	Book.paginate({},{page:page,limit:size},(err:any,books:any)=>{
		if(err) res.status(500).send(err);
		else res.send(books);
	});
})

// search and paginate
app.get('/booksSearch',(req:Request,res:Response)=>{
	const search = req.query.search || '';
	const page:number = parseInt(req.query.page?.toString()||'1');
	const size:number = parseInt(req.query.size?.toString()||'5');

	Book.paginate({title:{$regex:".*(?i)"+search+".*"}},{page:page,limit:size},(err:any,books:any)=>{
		if(err) res.status(500).send(err);
		else res.send(books);
	});
	
});

// create
app.post('/books',  (req:Request,res:Response) => {
	const book = new Book(req.body);
	book.save((err)=>{
		if(err) return res.status(500).send(err);
		else return res.status(200).send(book);
	})

});

//delete
app.delete('/books/:id',(req:Request,res:Response) => {
	Book.findByIdAndDelete(req.params.id,(err: any)=>{
		if(err) return res.status(500).send(err);
		else return res.send("book deleted");
	})
});

// update
app.put('/books/:id', (req:Request,res:Response) => {
	Book.findByIdAndUpdate(req.params.id,req.body,(err:any,book:any)=>{
		if(err) return res.status(500).send(err);
		else return res.status(200).send(book);
	})
});

// find by id
app.get('/books/:id',(req:Request,res:Response) => {
	Book.findById(req.params.id,(err:Error,book:any)=>{
		if(err) return res.status(500).send(err);
		else return res.status(200).send(book);
	})
});




app.get('/', (req, res) => {
	  res.send('Hello World!');
});
let port = 8085;
let connected = false;
app.listen(port, () => {
	console.log('Server is running on port '+port);
});
