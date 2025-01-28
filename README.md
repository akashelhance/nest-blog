## Overview

The backend of the Blog Application is built using NestJS. It provides RESTful APIs for user authentication and post management. Authentication is implemented via Google login using PassportJS, and JSON Web Tokens (JWTs) are used to secure API requests.

## Features

Authentication:

- Login using Google.

- JWT-based authentication for secured routes.

Post Management:

- Create, read, update, and delete posts.

- Public access to view post details.

Prerequisites

- Node.js and npm installed.

- NestJS CLI installed.



## Project setup

Clone the repository:


```bash
git clone https://github.com/akashelhance/nest-blog.git
cd nest-blog
```

```bash
$ npm install

```

## Environment Variables

Create a .env file in the root of your project with the following configuration:

```bash
DB_HOST=""
DB_PORT=""
DB_USERNAME=""
DB_PASSWORD=""
DB_DATABASE=""

JWT_SECRET=""

GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GOOGLE_CALLBACK_URL=""

```

## How to Obtain GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET

## Step 1: Go to Google Cloud Console
- Visit the Google Cloud Console.
- Log in with your Google account.

## Step 2: Create a New Project

- In the top navigation bar, click on the Select a project dropdown.
- Click New Project.
- Enter a name for your project (e.g., "My App").
- Select your organization (if applicable) and billing account.
- Click Create.
## Step 3: Enable the OAuth 2.0 API

- Once the project is created, click on the Navigation Menu (☰) on the top left.
- Navigate to APIs & Services > Library.
- Search for "Google Identity Services".
- Click on it and then click Enable.
 ## Step 4: Create OAuth 2.0 Credentials
- Go to APIs & Services > Credentials.
- Click + CREATE CREDENTIALS at the top and select OAuth 2.0 Client IDs.
- If prompted, configure your OAuth consent screen:
- Go to OAuth consent screen.
- Choose External (recommended for most applications).
- Enter an App name, Support email, and other required information.
- Save your changes.
- Once the consent screen is configured, return to Credentials.
- Choose Web application as the application type.
## Step 5: Set Authorized Redirect URIs
- In the Authorized redirect URIs field, enter the URL where users will be redirected after authenticating via Google.
- For local development: http://localhost:3000/auth/google/callback
- For production: Use your application's domain, e.g., https://yourdomain.com/auth/google/callback
Click Create.


## Setting Up PostgreSQL Database 

- Open pgAdmin:
- Launch the pgAdmin application from your system.
- Connect to Your PostgreSQL Server:
- In the left-hand panel, right-click on Servers and click Create > Server.
- In the pop-up dialog:
- General Tab: Enter a name for your server (e.g., Local PostgreSQL).
- Connection Tab: Fill in the connection details:
- Host name/address: localhost (or your PostgreSQL server address).
- Port: 5432 (default PostgreSQL port).
- Maintenance database: postgres.
- Username: Your PostgreSQL username (e.g., postgres).
- Password: Your PostgreSQL password.
- Click Save.
- Create a New Database:
- Right-click on Databases and select Create > Database.
- Database Name: Enter a name for your database (e.g., blog_app).
- Owner: Select the owner (default: postgres).
- Click Save.
- Set Up Environment Variables:
- Update your .env file with the database connection details:



## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

# to seeds the database
$ npx ts-node -r tsconfig-paths/register src/scripts/seed.ts
```

## API Endpoints

### Authentication
- `GET /auth/google` - Login With Gogole and return JWT token.
- `GET /auth/signout` - To Logout .

### Post EndPoints
- `POST /posts` - Create Post and Token is required

- **Request:**
  ```json
  {
      "title": "My First Post",
      "content": "This is the content of my post."
  }

- `GET /posts?page=1` - Fetches a list of all Posts.
- `GET /posts/:id` - Retrieves a Post Details by ID.
- `PUT /posts/:id` - Updates Post information and Token is required . 
- `DELETE /posts/:id` - Deletes a Post by ID and Token is required.

### User EndPoints
- `GET /users/email/:email` - To Get User information by Email.

### User-Post EndPoints
- `GET /user-posts` - Fetches a list of all Posts Created By Logged In User and Token is required.
