🍽️ Restoran - Online Table Reservation System 

Student: Rajdeep Sahu
Technology Stack: Node.js, Express, MongoDB (Mongoose), HTML, Bootstrap, CSS, JavaScript (AJAX)

🌟 1. Project Overview & Features

This is a secure and full-stack web application that allows users to reserve tables online and provides the restaurant management (Admin) with the facility to monitor and manage bookings.

Key Features Implemented:

Secure Authentication (Login/Signup): Utilizes Bcryptjs for secure password hashing.

Data Persistence: All data is securely stored in MongoDB Atlas (Cloud Database).

Modular Architecture: Code is separated into auth_routes.js and admin_routes.js (a programming best practice).

Personalized Experience: Displays the user's name (e.g., "Hi, Rajdeep!") after successful login.

User Booking Status: Each user can check the status of their reservation (Pending/Confirmed/Cancelled) on the My Bookings page.

🔐 Secure Admin Panel: A separate login dashboard is provided for the Admin.

Booking Management: The Admin can view and manage (Confirm or Cancel) all user bookings in real-time.

Security Best Practice: Sensitive data (MongoDB URI, Session Secret) is hidden using a .env file (dotenv package is used).

🛠️ 2. Setup and Installation Guide

Follow these steps to run the project on your local machine.

A. Prerequisites

Node.js & npm (Must be installed)

MongoDB Atlas Account (You will need your connection string)

B. Installation Steps

Clone / Download Project

# Place all project files in a single directory
# (Example: D:\Restaurant)


Install Dependencies
Open the terminal in the project's root folder and run the following command:

npm install express body-parser mongoose bcryptjs express-session dotenv


Create and Configure .env File
Create a file named .env in the root folder and paste your details into it:

MONGODB_URI="mongodb+srv://Nothuman_001:Rajd_1234@cluster0.s00qblg.mongodb.net/?appName=Cluster0"
SESSION_SECRET="mera_final_year_project_key_2025_Rajdeep_sahu_restaurant"


Run the Server

node server.js


(The terminal should display: MongoDB connected successfully! (.env secured))

🔑 3. Testing and Admin Access

A. General User Testing

Home Page: http://localhost:3000

Signup: Use the LOGIN / SIGNUP button (or Pages dropdown). Ensure you enter your Name during signup.

Check Bookings: After logging in, check the My Bookings page (via the Pages dropdown) to see the reservation status.

B. Admin Dashboard Access (For Viva/Presentation)

Admin Login URL: http://localhost:3000/admin/login

Admin Credentials:

Email: ...........

Password: .......

Functionality: The Admin Dashboard allows you to view, Confirm, and Cancel user bookings.




In Hindi :- 

🍽️ Restoran - Online Table Reservation System 

Student: Rajdeep Sahu
Technology Stack: Node.js, Express, MongoDB (Mongoose), HTML, Bootstrap, CSS, JavaScript (AJAX)

🌟 1. Project Overview & Features

Yeh ek secure aur full-stack web application hai jo users ko online table reserve karne aur restaurant management (Admin) ko bookings monitor karne ki suvidha pradan karta hai.

Key Features Implemented:

Secure Authentication (Login/Signup): Password hashing ke liye Bcryptjs ka upyog kiya gaya hai.

Data Persistence: Saara data MongoDB Atlas (Cloud Database) mein secure roop se store hota hai.

Modular Architecture: Code ko auth_routes.js aur admin_routes.js mein alag kiya gaya hai (Best Practice).

Personalized Experience: Login ke baad user ka naam (e.g., "Hi, Rajdeep!") dikhta hai.

User Booking Status: Har user apni My Bookings page par apni reservation ka status (Pending/Confirmed/Cancelled) dekh sakta hai.

🔐 Secure Admin Panel: Admin ke liye ek separate login dashboard hai.

Booking Management: Admin bookings ko real-time mein Confirm ya Cancel kar sakta hai.

Security Best Practice: Sensitive data (MongoDB URI, Session Secret) .env file mein chhipaya gaya hai (dotenv package ka use karke).

🛠️ 2. Setup and Installation Guide

In steps ko follow karke project ko local machine par run kiya ja sakta hai.

A. Prerequisites (Zaruri Tools)

Node.js & npm (Installed)

MongoDB Atlas Account (Aapki connection string)

B. Installation Steps

Clone / Download Project

# Project files ko ek folder mein rakhein
# (Example: D:\Restaurant)


Install Dependencies
Terminal mein project ke root folder mein jaakar yeh command chalaayein:

npm install express body-parser mongoose bcryptjs express-session dotenv


Create and Configure .env File
Root folder mein .env naam ki ek file banaayein aur yeh details daalein:

MONGODB_URI="mongodb+srv://Nothuman_001:Rajd_1234@cluster0.s00qblg.mongodb.net/?appName=Cluster0"
SESSION_SECRET="mera_final_year_project_key_2025_Rajdeep_sahu_restaurant"


Run the Server

node server.js


(Terminal mein MongoDB se safaltapoorvak connect ho gaya! dikhna chahiye.)

🔑 3. Testing and Admin Access

A. General User Testing

Home Page: http://localhost:3000

Signup: Pages dropdown se ya Navbar ke aakhri button se Sign Up karein (apna name zaroor daalein).

Check Bookings: Login ke baad, Pages dropdown mein My Bookings par jaakar apna status dekhein.

B. Admin Dashboard Access (For Viva/Presentation)

Admin Login URL: http://localhost:3000/admin/login

Admin Credentials:

Email: ...........

Password: ..........

Functionality: Admin Dashboard mein aap saari user bookings (Pending, Confirmed, Cancelled) dekh aur manage kar sakte hain.
