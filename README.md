# Task Manager App

This project implements an e-commerce Store API with a frontend built using React and a backend created with Express.js, MongoDB, and Node.js.


## Project Structure

The project is structured into two main directories:

**frontend/**: Contains the React frontend application.

**backend/**: Contains the Express.js backend server.


## Running the project locally

To run the backend locally, run the following commands


cd backend

npm install

npm start

The Express server will be hosted at localhost:3000

<br>

To run the frontend locally, run the following commands


cd frontend

npm install

npm run dev

React application will be hosted on localhost:5173

Note: Change the apiBaseUrl to "http://localhost:3000/api/v1/products" at line no. 27 in ProductsList.jsx in the react app


## Deployment

**Frontend**: Deployed using Netlify. "https://sidstoreapi.netlify.app/"

**Backend**: Deployed using Render.com.  "https://store-api-1q3l.onrender.com"



## APIs

### Fetching Products

**GET /api/v1/products**

Fetches all products with optional query filters.

#### Query Parameters:

- `featured` (boolean): Filter products by featured status.
  - Example: `?featured=true`
- `company` (string): Filter products by company name.
  - Example: `?company=Apple`
- `name` (string): Search products by name (case-insensitive, partial match).
  - Example: `?name=phone`
- `sort` (string): Sort products by fields. Multiple fields can be sorted by separating them with commas.
  - Example: `?sort=price,name`
- `fields` (string): Select specific fields to return. Multiple fields can be separated by commas.
  - Example: `?fields=name,price`
- `numericFilters` (string): Filter products using numeric comparison operators. Supports price and rating fields.
  - Example: `?numericFilters=price>30,rating>=4`

 
## Technologies Used

**Frontend**: React

**Backend**: Express.js, MongoDB, Node.js


## Contact

For any inquiries, please contact Siddhesh Sonawane at siddheshsonawane07@gmail.com
