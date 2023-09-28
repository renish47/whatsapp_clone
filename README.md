# WhatsApp Clone - Realtime Messaging App

![WhatsApp Clone](https://link.to.your.app/screenshot.png)

This is a realtime messaging app designed to clone WhatsApp's design and functionality. It allows users to communicate in real-time using text and image messages. The app is built using a modern tech stack, including Next.js, React, Tailwind CSS, Socket.io, TypeScript, Redux, Axios for the frontend, and Node.js, Express, Prisma, PostgreSQL for the backend. Cloudinary is used to store images sent in the app and user profile pictures. Authentication is handled using Google's OAuth 2.0 through Next-Auth.

## Table of Contents
- [Demo](#demo)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Demo

You can access a live demo of the application at [https://your-app-url.com](https://your-app-url.com).

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

4. **Search Functionality:**
   - A search bar is provided to search for users by their name.

5. **Message Types:**
   - Users can send both text and image messages.

6. **Message Status:**
   - Each message shows three types of statuses: sending, sent, delivered, and read, similar to WhatsApp's ticks (single tick, double tick, blue tick).

7. **Responsiveness:**
   - The app is fully responsive, providing a great user experience on both large and small screens.
   - In mobile view, users receive notifications for incoming messages while actively chatting with someone.

## Getting Started

### Installation

To run this application locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/whatsapp-clone.git
   cd whatsapp-clone
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
