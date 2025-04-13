# MemoryTrae Project

## Node.js and npm Installation Guide

This guide will help you install Node.js and npm (Node Package Manager) on your Windows system.

### Installation Steps

1. **Download Node.js**
   - Visit the official Node.js website: https://nodejs.org/en/download/
   - Download the Windows Installer (.msi) for the LTS (Long Term Support) version
   - Choose the 64-bit version if your system supports it

2. **Run the Installer**
   - Double-click the downloaded .msi file
   - Follow the installation wizard instructions
   - Accept the license agreement and keep the default installation settings

3. **Complete the Installation**
   - Make sure to check the box that says "Automatically install the necessary tools"
   - This will install additional tools that might be needed for some npm packages

4. **Restart Your Computer**
   - After installation completes, restart your computer to ensure all path variables are properly set

5. **Verify Installation**
   - Open a new Command Prompt or PowerShell window
   - Type `node -v` and press Enter to verify Node.js installation
   - Type `npm -v` and press Enter to verify npm installation
   - If both commands display version numbers, the installation was successful

## Using npm in Your Project

After installation, you can use npm to:

- Install packages: `npm install <package-name>`
- Initialize a new project: `npm init`
- Install dependencies from package.json: `npm install`
- Run scripts defined in package.json: `npm run <script-name>`

## Troubleshooting

If you encounter issues with the installation:

- Make sure you're running the installer with administrator privileges
- Check if your system meets the requirements for the latest Node.js version
- Try installing an older LTS version if you encounter compatibility issues
- Verify that your PATH environment variable includes the Node.js installation directory