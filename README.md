Frontend: React + Rust/WASM Calculator & Shader App

This project is the frontend for a two-page application that demonstrates the integration of a React user interface with a high-performance Rust module compiled to WebAssembly (WASM).

    Tab 1: Rust Calculator: A simple calculator where math expressions are evaluated by a Rust function running directly in the browser via WASM.

    Tab 2: Text-to-Shader: A tool that communicates with an Elixir backend to generate and render WebGL shaders from a text description.

🚀 Live Deployment

Frontend URL: https://invideo-task-frontend.onrender.com/
🛠️ How to Run Locally
Prerequisites

Before you begin, ensure you have the following installed:

    Node.js (v18 or later)

    Rust (installed via rustup)

    wasm-pack (for compiling Rust to WASM)

1. Clone & Install Dependencies

First, clone the repository and navigate into the React application's directory to install the necessary Node.js packages.

# Navigate into the React project folder
cd two-page-app

# Install dependencies
npm install

2. Compile the Rust/WASM Module

The React application depends on the compiled Rust code. You need to build it once before starting the development server.

# Navigate into the Rust project folder
cd ../calculator_logic

# Compile the Rust code into a WebAssembly package
wasm-pack build --target web

This will create a pkg folder inside calculator_logic, which the React app will import.
3. Start the Development Server

Now, you can start the local Vite development server.

# Navigate back to the React project folder
cd ../two-page-app

# Run the dev server
npm run dev

Your application should now be running on http://localhost:5173.
📦 Building for Production

To create an optimized production build of the application, run the following command from the two-page-app directory:

npm run build

This will generate a dist folder containing the final, static files for your application, ready for deployment.