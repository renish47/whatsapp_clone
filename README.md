# WhatsApp Clone - Realtime Messaging App


![Screenshot 2023-09-29 221437](https://github.com/renish47/whatsapp_clone/assets/107568859/e8b8e13b-0e1a-4a51-9903-47436224e143)

This is a realtime messaging app designed to clone WhatsApp's design and functionality. It allows users to communicate in real-time using text and image messages. The app is built using a modern tech stack, including Next.js, React, Tailwind CSS, Socket.io, TypeScript, Redux, Axios for the frontend, and Node.js, Express, Prisma, PostgreSQL for the backend. Cloudinary is used to store images sent in the app and user profile pictures. Authentication is handled using Google's OAuth 2.0 through Next-Auth.

## Table of Contents
- [Demo](#demo)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Todos](#todos)

## Demo

You can access a live demo of the application at [https://clonewhatsapp.vercel.app](https://clonewhatsapp.vercel.app/).

**Note:** Since the server side of the code is hosted in a free server hosting site, real-time functionalities aren't working properly since they'll spin down the server with inactivity. But check out this app's complete functionality by loading the server side code locally. 

## Tech Stack

- **Frontend:**
  - Next.js
  - React
  - Tailwind CSS
  - Socket.io
  - TypeScript
  - Redux
  - Axios

- **Backend:**
  - Node.js
  - Express
  - Prisma
  - PostgreSQL
  - Cloudinary
  - Next-Auth (Google OAuth 2.0)

## Features

1. **Google Authentication:**
   - Users can sign in using their Google accounts.

2. **Onboarding:**
   - New users are redirected to an onboarding page where they can update their profile name, about, and profile picture.

3. **Chatting:**
   - Users can find all registered users in the friends page.
   - They can select a user to start a chat with.
     


https://github.com/renish47/whatsapp_clone/assets/107568859/f25d3f90-7d11-4648-8f17-34a0e25559e7


4. **Search Functionality:**
   - A search bar is provided to search for users by their name.
     
5. **Notification:**
   - In mobile view, users receive notifications for incoming messages while actively chatting with someone.


https://github.com/renish47/whatsapp_clone/assets/107568859/3ea1122b-b845-4bec-84bb-1b70ac7f975c



6. **Message Types:**
   - Users can send both text and image messages.

7. **Message Status:**
   - Each message shows three types of statuses: sending, sent, delivered, and read, similar to WhatsApp's ticks (single tick, double tick, blue tick).

     

https://github.com/renish47/whatsapp_clone/assets/107568859/82afe4f1-3472-40bf-bf2e-40ec918751ab



8. **Responsiveness:**
   - The app is fully responsive, providing a great user experience on both large and small screens.

     

https://github.com/renish47/whatsapp_clone/assets/107568859/0bdb9556-0cb3-49c5-9624-34cfc4bbf5a6



## Getting Started

### Installation

To run this application locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/renish47/whatsapp_clone.git
   cd whatsapp_clone
   ```

2. Install the dependencies for both the client and server:

   ```bash
   # Install client dependencies
   cd client
   npm install

   # Install server dependencies
   cd ../server
   npm install
   ```

### Configuration

1. Create a `.env` file in the `server` directory and add the following environment variables:

   ```
   DATABASE_URL=your_postgresql_database_url
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   SESSION_SECRET=your_session_secret
   ```

2. Configure your PostgreSQL database by updating the `schema.prisma` file in the `server` directory.

### Usage

1. Start the server:

   ```bash
   cd server
   npm run dev
   ```

2. Start the client:

   ```bash
   cd client
   npm run dev
   ```

3. Access the application at `http://localhost:3000`.



### Todos 

1. Add sending and managing friend requests to users. As of now, a user can start conversation with any users who have created an account in this app
2. Load message on need basis (This will helps to reduce load time of messages)
3. Add sending voice message functionality 


