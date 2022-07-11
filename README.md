# Shop-For-Home

> Frontend-> React JS

> Backend-> Node JS & Express JS

> Database-> MongoDB

## Installation process
1. #### clone the repo using this command
    ```bash
    git clone https://github.com/Wipro-Capstone-Project-Grp-9/ShopForHome.git
    ```
2. #### install npm packages
    1. install backend packages
    ```bash
    cd Shop-For-Home
    npm install
    ```
    2. install frontend packages
    ```bash
    cd client
    npm install
    ```
3. Go to the parent folder of Shop-For-Home & create .env for connection, JWT_SECRET, BRAINTREE_MERCHANT_ID, BRAINTREE_PUBLIC_KEY and BRAINTREE_PRIVATE_KEY.

    ```bash
    cd Shop-For-Home
    sudo nano .env
    ```
    (ctrl+x to save & nano follow instruction there)
    
    ##### sample code for backend .env
    ```env
    MONGODB_URI=YOUR_MONGODB_URI
    JWT_SECRET=YOUR_JWT_SECRET
    BRAINTREE_MERCHANT_ID=YOUR_BRAINTREE_MERCHANT_ID
    BRAINTREE_PUBLIC_KEY=YOUR_BRAINTREE_PUBLIC_KEY
    BRAINTREE_PRIVATE_KEY=YOUR_BRAINTREE_PRIVATE_KEY
    ```
4.  Create another .env file inside client directory for REACT_APP_API_URL.

    ```bash
    cd Shop-For-Home/client
    sudo nano .env
    ```
    ##### sample code for frontend .env
    ```env
    REACT_APP_API_URL=YOUR_API_URL
    Ours id is :- REACT_APP_API_URL= "http://localhost:5000/api/"
    ```
    ##### Instructions:
    1. Create mongodb atlas database. Get the connection string to put in .env
    2. You can use any random string as JWTSECRET
    3. For localhost REACT_APP_API_URL is http://localhost:5000/api
    4. #### note: add .env on .gitignore

5. <b>deploy this project</b> on your local server by using this command
    ```bash
    cd Shop-For-Home
    npm run dev
    ```
    #### note: both backend & frontend server will start at once with the above command.

6. #### Database Structure: (Table: columns)
    1. categories: _id, name, createdAt, updatedAt;
    2. orders:  _id, status, products (Array), transaction_id, amount, address, user (Object), createdAt, updatedAt
    3. products: _id, photo (Object), sold, name, description, price, category, shipping, quantity, createdAt, updatedAt
    4. users: _id, role, history (Array), name, email, salt, hashed_password, createdAt, updatedAt

### App Description:
#   User roles.
    1. User can login, register and logout.
    2. User can view all products
    3. User can view single product
    4. User can search products and view products by category and price range
    5. User can increase / decrease the product quantity at the cart
    6. User can apply discount to the product at cart
    7. User can see the stock availability, also which are only few
    8. User can add to cart checkout products using card info
#   Admin roles.
    9. Admin can create, edit, update & delete products.
    10. Admin can create categories.
    11. Admin can also access the home, shop pages, along with dashboard facility
    12. Admin can read & delete Users.
    13. Admin can email to order stock if stock quantity is less than 10
    14. Admin can Manage products and users.
    15. Admin can bulk upload the csv data file into mongo db and fetch in the ui 

### Swagger Documentation
    1. Open-source framework to design, build, document, and consume RESTful Web APIs
    2. In our Shop For Home app the swagger documentation can be started by additional to the process of running the (npm run dev).
    3. Open new tab in the browser, after the server start.
    4. Type the url as http://localhost:5000/api-docs/
    5. This will open the swagger documentation of Shop For Home app.