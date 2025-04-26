# VocabMaster

A full-stack vocabulary learning application that helps users master new words through an interactive and engaging interface. By leveraging OpenAI API, users can learn English vocabulary tailored to their IELTS proficiency level, ensuring personalized and effective learning experiences.

## Project Structure

The project is divided into two main directories:

### Client (`/client`)

A modern React-based frontend application built with:

- React 19
- Vite as the build tool
- Mantine UI for components
- React Router for navigation
- React Toastify for notifications
- ESLint for code quality

#### Client Setup

```bash
cd client
npm install
npm run dev
```

### Server (`/server`)

A Node.js/Express backend with MongoDB integration featuring:

- Express.js framework
- MongoDB with Mongoose ODM
- JWT authentication
- Rate limiting
- Request logging
- OpenAI integration
- CORS support
- Error handling middleware

#### Server Setup

```bash
cd server
npm install
npm run dev
```

## Features

### Frontend (Client)

- Modern, responsive UI built with Mantine
- Interactive vocabulary learning interface
- Real-time feedback and notifications
- Client-side routing
- Type-safe development with TypeScript

### Backend (Server)

- RESTful API architecture
- Secure authentication with JWT
- MongoDB database integration
- Rate limiting for API protection
- Comprehensive logging system
- OpenAI integration for enhanced features
- Error handling and validation

## Development

### Prerequisites

- Node.js (latest LTS version recommended)
- MongoDB
- npm or yarn

### Environment Setup

1. Clone the repository
2. Install dependencies for both client and server
3. Create `.env` files in both directories with necessary environment variables
4. Start the development servers

## License

MIT License - See LICENSE files in both client and server directories for details.

## Author

Issei Toura
