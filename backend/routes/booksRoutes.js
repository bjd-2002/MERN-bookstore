import express from "express";
import { Book } from "../models/bookModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

const router = express.Router();

// Route for save a new book

router.post('/', asyncHandler(async(req, res) => {
    const {title, author, publishYear} = req.body;
    if(!title || !author || !publishYear) 
    {
        throw new ApiError(400,'All fields are necessary' );
        
    }
    const newBook = {
        title,
        author,
        publishYear
    }
    const book = await Book.create(newBook);
    return res.status(201).send(book);
}))

// Route for GET all books
router.get('/', asyncHandler(async(req, res) => {
    const books = await Book.find({});
    return res.status(200).json({
        count: books.length,
        data: books
    });
}))

// Route to GET one book with id
router.get('/:id', asyncHandler(async (req, res) => {
    const {id} = req.params;
    const book = await Book.findById(id);
    return res.status(200).json(book);
}))

// Route to update a book
router.put('/:id', asyncHandler(async (req, res) => {
    const {title, author, publishYear} = req.body;
    if(!title || !author || !publishYear) 
    {
        throw new ApiError(400, 'All fields are required');
    }
    const {id} = req.params;

    const result = await Book.findByIdAndUpdate(id, req.body)
    if (!result) {
        throw new ApiError(404, 'Book not found');
    }
    return res.status(200).json({message: 'Book updated successfully'})
}))

// Route for Delete book
router.delete('/:id', asyncHandler(async(req, res) => {
    const {id} = req.params;

    const result = await Book.findByIdAndDelete(id)
    if (!result) {
        throw new ApiError(404, 'Book not found');
    }
    return res.status(200).json({message: 'Book deleted successfully'})
}))

export default router;