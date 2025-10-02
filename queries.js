// queries.js
// MongoDB queries for plp_bookstore

// ----------------------
// Task 2: Basic CRUD
// ----------------------

// 1. Find all books in a specific genre (e.g., Fiction)
db.books.find({ genre: "Fiction" })

// 2. Find books published after a certain year (e.g., after 1950)
db.books.find({ published_year: { $gt: 1950 } })

// 3. Find books by a specific author (e.g., George Orwell)
db.books.find({ author: "George Orwell" })

// 4. Update the price of a specific book (e.g., The Hobbit)
db.books.updateOne(
  { title: "The Hobbit" },
  { $set: { price: 16.99 } }
)

// 5. Delete a book by its title (e.g., Moby Dick)
db.books.deleteOne({ title: "Moby Dick" })

// ----------------------
// Task 3: Advanced Queries
// ----------------------

// 1. Find books that are both in stock and published after 2010
db.books.find({
  in_stock: true,
  published_year: { $gt: 2010 }
})

// 2. Projection – return only title, author, and price fields
db.books.find(
  {},
  { title: 1, author: 1, price: 1, _id: 0 }
)

// 3. Sorting – by price
db.books.find().sort({ price: 1 })   // ascending
db.books.find().sort({ price: -1 })  // descending

// 4. Pagination – 5 books per page
db.books.find().skip(0).limit(5)   // page 1
db.books.find().skip(5).limit(5)   // page 2

// ----------------------
// Task 4: Aggregation Pipelines
// ----------------------

// 1. Average price of books by genre
db.books.aggregate([
  { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
])

// 2. Author with the most books
db.books.aggregate([
  { $group: { _id: "$author", totalBooks: { $sum: 1 } } },
  { $sort: { totalBooks: -1 } },
  { $limit: 1 }
])

// 3. Group books by publication decade and count them
db.books.aggregate([
  {
    $project: {
      decade: {
        $subtract: ["$published_year", { $mod: ["$published_year", 10] }]
      }
    }
  },
  { $group: { _id: "$decade", count: { $sum: 1 } } },
  { $sort: { _id: 1 } }
])

// ----------------------
// Task 5: Indexing
// ----------------------

// 1. Create an index on title
db.books.createIndex({ title: 1 })

// 2. Create a compound index on author and published_year
db.books.createIndex({ author: 1, published_year: -1 })

// 3. Use explain() to show performance improvement
db.books.find({ title: "1984" }).explain("executionStats")
