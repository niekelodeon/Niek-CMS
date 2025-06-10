# Web CMS / Niek CMS
================

a Web-based CMS used with FTP for remote file management.
When users pull their website trough FTP and selected from which folder they want to pull, users then will be able to: add, edit, download, delete & save files just like they would in other editors.
An automated backup will be made for version control.
Push will replace all files and folders from the selected path on the remote webhost.

Pulling will automatically filter files for unwanted file extensions in memory, so will uploading.

Included is a custom ASCII logger, mail service, error handler & more

This project is still being worked on.

## Features

🔗 FTP
---------
• Pull / push files via FTP
• Local editing
• Folder management

📁 Operations
---------
• File editor
• Adding files & folders
• Moving files & folders
• Renaming files & folders
• Uploading recursively
• Deleting recursively
• Downloading recursively

## Setup

### Database Configuration

```
create a SQL MariaDB database, put connection credentials in .env and Sequalize will handle everything.
```

### FTP Configuration

```
create a custom FTP for testing with docker or use your own.
add a new User in the database with your FTP credentials.
```

### Run Server

```bash
cd server
```

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install
```

Start the development server on `http://localhost:8000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev
```

## Run Frontend

```bash
cd client
```

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install
```

Start the development server on `http://localhost:5173`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev
```
