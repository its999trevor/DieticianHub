```markdown
# Food Tracker Application

## Table of Contents
- [About](#about)
- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## About
The Food Tracker Application is designed to assist users in maintaining a balanced diet by tracking their daily food intake. The application allows users to log their meals, monitor their nutritional consumption, and manage their dietary goals effectively. Whether you aim to lose weight, maintain your current weight, or achieve specific nutritional goals, this app provides the tools you need.

One of the advanced features of the Food Tracker Application is its ability to generate personalized diet plans using Gemini AI. This functionality is implemented in the `diet.ts` file, leveraging the capabilities of Google Generative AI to provide customized meal recommendations based on user profiles.

## Introduction
The Food Tracker Application is a web-based platform designed to help users track their daily food intake and monitor their nutritional goals. Users can add food items to their meals, view their daily summary, and keep track of their calorie intake.

## Features
- User authentication and authorization
- Search for food items and add them to meals
- Track calories, protein, fats, fibers, and carbs
- View daily summaries and nutritional goals
- Store and display recently used food items
- Persistent data storage with MongoDB
- Personalized diet plan recommendations using Gemini AI

## Technologies Used
- **Frontend:** React, React Router, Axios
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **AI Integration:** Google Generative AI (Gemini)

## Installation
To set up the project locally, follow these steps:

### Prerequisites
- Node.js (v12 or later)
- MongoDB

### Steps
1. **Clone the repository:**
   ```bash
   git clone https://github.com/its999trevor/DieticianHub.git
   cd DieticianHub
   ```

2. **Install dependencies for the backend:**
   ```bash
   cd backend
   npm install
   ```

3. **Install dependencies for the frontend:**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up environment variables:**
   Create a `.env` file in the `backend` directory and add the following:
   ```env
   PORT=port-number
   MONGO_URI=your-mongodb-uri
   JWT_SECRET=your-jwt-secret
   API_KEY=your-google-api-key
   ```

5. **Run the backend server:**
   ```bash
   cd backend
   npm start
   ```

6. **Run the frontend development server:**
   ```bash
   cd frontend
   npm start
   ```

## Usage
1. Open your browser and navigate to `localhost`.
2. Register a new account or log in with an existing account.
3. Use the search functionality to find food items and add them to your meals (breakfast, lunch, dinner).
4. View your daily summary to monitor your nutritional intake and goals.



## Contributing
Contributions are welcome! Please follow these steps to contribute:
1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add new feature'`)
5. Push to the branch (`git push origin feature-branch`)
6. Create a pull request

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.