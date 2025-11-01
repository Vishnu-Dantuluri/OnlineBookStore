package com.example.bookstore.controller;

import com.example.bookstore.model.Book;
import com.example.bookstore.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/books")
@CrossOrigin(origins = "*") // allows requests from all origins
public class BookController {
    @Autowired
    private BookRepository bookRepository;

    // Get all books
    @GetMapping
    public List<Book> getBooks() {
        return bookRepository.findAll();
    }

    // Add a book
    @PostMapping
    public Book addBook(@RequestBody Book book) {
        // You can add validation here if needed
        return bookRepository.save(book);
    }

    // Delete a book by id
    @DeleteMapping("/{id}")
    public void deleteBook(@PathVariable Long id) {
        bookRepository.deleteById(id);
    }
}
