# Go-Adventure

Go-Adventure is a web application project with a front-end built using HTML, CSS, and JavaScript, and a back-end powered by Node.js, Express, and Mongoose. This application includes features for user login and sign-up.

## Project Structure

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express, Mongoose

## Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/)

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/abhishek-1010B/Go-Adventure.git
    ```

2. Navigate to the project directory:

    ```sh
    cd Go-Adventure
    ```

3. Install the required packages:

    ```sh
    npm install
    ```

## Configuration

Before running the project, you need to configure the Mongoose URL. Open the project files and locate the configuration for the Mongoose connection. Replace the placeholder URL with your MongoDB connection string.

```javascript
mongoose.connect('your-mongodb-connection-string', { useNewUrlParser: true, useUnifiedTopology: true });
```

## Running the Project

To start the server, use the following command:

```sh
nodemon server.js
```

## Features

- User Login
- User Sign-Up

## Dependencies

Here are the main dependencies used in this project:

- `bcrypt`: ^5.1.1
- `compression`: ^1.7.4
- `cors`: ^2.8.5
- `express`: ^4.19.2
- `jsonwebtoken`: ^9.0.2
- `mongoose`: ^8.3.2

## Notes

- Ensure MongoDB is running on your machine or accessible via a connection string.
- The login and sign-up functionalities require a valid MongoDB connection.

## Contribution

Feel free to fork this repository and make your own contributions. Pull requests are welcome!

---

By following these steps, you should be able to set up and run the Go-Adventure project on your local machine. If you encounter any issues or have questions, please open an issue on the GitHub repository.

Happy coding! (Made by Abhishek Duggal)
