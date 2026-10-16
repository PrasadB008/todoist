#!/bin/bash

# Setup script for Todoist Clone
# This script helps you set up the project for local development

echo "🚀 Todoist Clone - Setup Script"
echo "================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm version: $(npm -v)"
echo ""

# Check if firebase.js exists
if [ -f "src/firebase.js" ]; then
    echo "⚠️  src/firebase.js already exists."
    read -p "Do you want to overwrite it? (y/N): " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Keeping existing firebase.js"
    else
        cp src/firebase.js.example src/firebase.js
        echo "✅ Created src/firebase.js from template"
    fi
else
    cp src/firebase.js.example src/firebase.js
    echo "✅ Created src/firebase.js from template"
fi

echo ""
echo "📝 Next Steps:"
echo "1. Edit src/firebase.js with your Firebase credentials"
echo "2. Create a Firebase project at https://console.firebase.google.com/"
echo "3. Enable Firestore Database in your Firebase project"
echo "4. Add your Firebase configuration to src/firebase.js"
echo ""

# Ask if user wants to install dependencies
read -p "Do you want to install dependencies now? (y/N): " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "📦 Installing dependencies..."
    
    # Check if yarn is available
    if command -v yarn &> /dev/null; then
        read -p "Use yarn instead of npm? (y/N): " -n 1 -r
        echo ""
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            yarn install
        else
            npm install
        fi
    else
        npm install
    fi
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "✅ Dependencies installed successfully!"
        echo ""
        echo "🎉 Setup complete!"
        echo ""
        echo "To start the development server:"
        echo "  npm start"
        echo "  or"
        echo "  yarn start"
        echo ""
        echo "Don't forget to configure Firebase before running!"
    else
        echo ""
        echo "❌ Failed to install dependencies."
        echo "Please check the error messages above."
    fi
else
    echo ""
    echo "⏭️  Skipped dependency installation."
    echo ""
    echo "To install later, run:"
    echo "  npm install"
    echo ""
fi

echo ""
echo "📚 For detailed instructions, see:"
echo "   - QUICKSTART.md for quick setup"
echo "   - SETUP.md for detailed guide"
echo ""
