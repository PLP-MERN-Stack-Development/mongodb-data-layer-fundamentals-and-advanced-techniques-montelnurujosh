# 📚 PLP Bookstore (MongoDB Assignment)

This project is part of the **PLP MERN Stack Course**.  
It demonstrates working with **MongoDB** — from inserting data to performing CRUD operations, advanced queries, aggregation pipelines, and indexing.

---

## 🚀 Project Setup

1. Install **MongoDB** and **MongoDB Compass** on your machine.
2. Clone this repository or create a new folder for the project:
   mkdir plp_bookstore && cd plp_bookstore
3. Initialize Node.js:
   npm init -y
4. Install MongoDB driver:
   npm install mongodb

---

## 📂 Files in this Project

- insert_books.js → Inserts 12 book documents into the books collection.
- queries.js → Contains all MongoDB queries (CRUD, advanced queries, aggregation, indexing).
- README.md → Project documentation.

---

## 🗄️ Database Structure

- Database: plp_bookstore
- Collection: books
- Sample Fields:
  {
    "title": "1984",
    "author": "George Orwell",
    "genre": "Dystopian",
    "published_year": 1949,
    "price": 10.99,
    "in_stock": true,
    "pages": 328,
    "publisher": "Secker & Warburg"
  }

---

## 🛠️ Tasks Implemented

### ✅ Task 1: Insert Data
Run:
  node insert_books.js

This inserts 12 books into the books collection.

---

### ✅ Task 2: Basic CRUD

- Find all Fiction books  
  db.books.find({ genre: "Fiction" })

- Find books published after 1950  
  db.books.find({ published_year: { $gt: 1950 } })

- Find books by George Orwell  
  db.books.find({ author: "George Orwell" })

- Update price of The Hobbit  
  db.books.updateOne(
    { title: "The Hobbit" },
    { $set: { price: 16.99 } }
  )

- Delete book "Moby Dick"  
  db.books.deleteOne({ title: "Moby Dick" })

---

### ✅ Task 3: Advanced Queries

- Find in-stock books published after 2010  
  db.books.find({ in_stock: true, published_year: { $gt: 2010 } })

- Projection (title, author, price only)  
  db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 })

- Sorting by price (ascending / descending)  
  db.books.find().sort({ price: 1 })  
  db.books.find().sort({ price: -1 })

- Pagination (5 per page)  
  db.books.find().skip(0).limit(5)   // page 1  
  db.books.find().skip(5).limit(5)   // page 2

---

### ✅ Task 4: Aggregation Pipelines

- Average price of books by genre  
  db.books.aggregate([
    { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
  ])

- Author with the most books  
  db.books.aggregate([
    { $group: { _id: "$author", totalBooks: { $sum: 1 } } },
    { $sort: { totalBooks: -1 } },
    { $limit: 1 }
  ])

- Group books by publication decade  
  db.books.aggregate([
    {
      $project: {
        decade: { $subtract: ["$published_year", { $mod: ["$published_year", 10] }] }
      }
    },
    { $group: { _id: "$decade", count: { $sum: 1 } } },
    { $sort: { _id: 1 } }
  ])

---

### ✅ Task 5: Indexing

- Create index on title  
  db.books.createIndex({ title: 1 })

- Compound index on author and published_year  
  db.books.createIndex({ author: 1, published_year: -1 })

- Use explain() to show performance improvement  
  db.books.find({ title: "1984" }).explain("executionStats")

---

## 📸 Screenshots

- Screenshot of 12 inserted documents in Compass.  
- Screenshot results of CRUD queries.  
- Screenshot results of aggregation pipelines.  
- Screenshot of created indexes.

---

## 📌 How to Run Queries

### Using Mongo Shell
- Open terminal:
  mongosh
- Switch to database:
  use plp_bookstore
- Copy queries from queries.js.

### Using MongoDB Compass
- Open plp_bookstore → books.  
- Paste queries in the **Filter** box or **Aggregation** tab.  
- Click **Find** to view results.

---

## 🎯 Outcome

By completing this project, we practiced:
- MongoDB CRUD operations  
- Advanced queries  
- Aggregation pipelines  
- Indexing & query optimization  

---

👨🏾‍💻 Author: Joshua Nuru
