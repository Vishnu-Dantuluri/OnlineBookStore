**Online Bookstore Full-Stack Project**
A stylish, beginner-friendly bookstore web app with Java Spring Boot REST API backend, MySQL database, and modern HTML/CSS/JS frontend.
Features book listing, cart, purchase, and user authentication (sign up/sign in/logout) with all data stored in a real database.

**Features**
Browse books with category filter, images, and prices.
Add books to cart, update quantity, view total price (live).
User sign up/sign in — required to make a purchase (secure, multi-user).
Stylish profile button shows username and enables logout via dropdown.
Mobile-friendly, dark/light theme toggle, beautiful responsive UI.
All backend and frontend code given; easy to deploy anywhere!

**Prerequisites**
Java JDK 17+
Maven
MySQL (or use Railway's MySQL add-on)
Node.js (optional, for serving static frontend)
IntelliJ IDEA / VS Code (recommended)

**Setup – Backend**
Clone/download the repo and open in your IDE.
MySQL Setup
sql
CREATE DATABASE bookstore;
USE bookstore;

CREATE TABLE users (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE book (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  category VARCHAR(60),
  price INT,
  image VARCHAR(255)
);


**Configure application.properties**
text
spring.datasource.url=jdbc:mysql://localhost:3306/bookstore
spring.datasource.username=YOUR_MYSQL_USERNAME
spring.datasource.password=YOUR_MYSQL_PASSWORD
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
server.port=8080
Build & Run Backend
bash
mvn spring-boot:run
# App runs at http://localhost:8080

**Setup – Frontend**
Files needed:
index.html (main homepage, no separate signin/signup pages needed!)
style.css
script.js

**Just open index.html in your browser.**
Usage
1. Browse Books
All books are displayed with their images, categories, and prices.

2. Add to Cart
Click “Add to Cart” for any book. Change quantity from the cart on the right.

3. User Auth (Sign Up/Sign In)
Click “Login” (profile) at the top right.
Use the pop-up for sign up or sign in.
Only authenticated users can make purchases.
After login, your name shows in the header. Open dropdown → logout any time.

4. Purchase
Logged-in users click “Buy Now” to make a purchase (“Your purchase is successful!” popup).

5. Add Books (as admin/developer)
6. Use Postman to POST new books:
text
POST http://localhost:8080/books
Body (JSON):
{
  "title": "Atomic Habits",
  "category": "Technology",
  "price": 450,
  "image": "https://images.unsplash.com/photo-1516979187457-637abb4f9353"
}
Repeat for as many as you want.

**REST API Endpoints**
Method	Endpoint	Purpose
GET	/books	List all books
POST	/books	Add new book
DELETE	/books/{id}	Delete book by ID
POST	/api/auth/signup	Register user
POST	/api/auth/signin	Login

**Advantages & Can-Do**
Modern real-world full stack structure—used in startups and industry.
Excels at teaching REST, auth, database, and UI integration skills.
Fully customizable look, great as a portfolio project.
Easy to scale: host backend on Railway/Render/Heroku, frontend on Netlify/Vercel.
Secure login (upgradeable for OAuth/social login and password hashing).

**Project Structure (example)**
text
/OnlineBook/
  ├── src/main/java/com/example/bookstore/
      ├── controller/
      ├── model/
      ├── repository/
      ├── BookstoreApplication.java
  ├── src/main/resources/
      ├── application.properties
  ├── frontend/
      ├── index.html
      ├── style.css
      ├── script.js
  ├── pom.xml
