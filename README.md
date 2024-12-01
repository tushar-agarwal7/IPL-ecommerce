# Ipl-Ecommerce 🎉🏏
A IPL ecommerce platform designed for IPL fans! This project allows users to select their favorite IPL team during signup, and the website dynamically updates its UI to reflect the selected team's theme. From merchandise to an IPL-themed shopping experience, this platform is a one-stop-shop for IPL enthusiasts.

<h2 id='build'> How I built it 🐺</h2>

![HowItsMadeCuriousGIF](https://user-images.githubusercontent.com/59244289/136423987-f44902a6-a93b-423d-af6d-1d2c525bdfa4.gif)

- Nextjs and Typescript is used on the client side.
- Node.js and Express is used on the server side.
- Mongodb database is used to store the incomming data.
- Tailwind CSS is used for styling, ensuring a responsive and visually appealing design.
- JWT Authentication is implemented for secure user login and session management.
- Responsive UI for a seamless experience on all devices. 
- Team Selection Functionality: Users select their favorite IPL team during signup, and the website dynamically customizes its UI based on their chosen team.
- Deployment: The backend is deployed on **Railway**, ensuring a scalable and reliable server environment. The frontend is hosted on **Vercel**, providing fast and efficient content delivery.




## 📂 Installation and Setup  
Follow these steps to run the project locally:  

1. **Clone the repository:**  
   ```bash
   git clone git@github.com:tushar-agarwal7/IPL-ecommerce.git
   cd IPL-ecommerce
   ```  

2. **Backend Setup**  
   ```bash
   cd backend
   npm install
   ```  

3. **Set up environment variables:**  
   Create a `.env` file in the root directory and add the following variables:  
   ```env
   MONGO_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
  
   ```  

4. **Start the server:**  
   ```bash
   node app.js
   ```  

5. ** Frontend Setup**  
   Navigate to the `frontend` directory and run:  
   ```bash
   cd frontend
   npm install
   ```  

6. **Set up environment variables:**  
   Create a `.env` file in the root directory and add the following variables:  
   ```env
   BACKEND_URL=http://localhost:8080
  
   ```  
7. **Start the frontend server:**  
   Make sure you are in frontend folder 
   ```bash
   npm run dev
   ```  
8. Open [http://localhost:3000](http://localhost:3000) to view the app.


Notes

- Ensure your MongoDB connection string and JWT secret are secure and not shared publicly.
- Make sure MongoDB is running locally before starting the backend server.
   
## 🤔 Team Assignment Logic  
- During the **signup process**, the user is prompted to select their favorite color.
- Based on the selected color, a corresponding *team* is automatically assigned to the user on the backend.
- The selected team is stored in the **MongoDB database** as part of the user's profile.  
- On each login, the backend retrieves the user's preferred team and sends it to the frontend.  
- The frontend dynamically adjusts the **color scheme and theme** based on the team.
- The theme is selected from a predefined array of styles based on the user's assigned team.
- A theme context is implemented to manage and propagate the theme styles across all components, ensuring consistent styling throughout the app.
- This logic ensures a personalized experience for every user.

## Hit ⭐ if you like this project


## 📜 License  
This project is licensed under the MIT License.  

 
