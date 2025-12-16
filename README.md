# Orbit CMS

**Orbit CMS** is a web-based code editor that has all file system functionallity you expect.  

---

## Overview

Users are able to login, then they can pull a specific directory on a webserver. This directory will be saved to the local disk so the users can edit the files using the folder tree view.
User can then post it back using FTP.

All folder / file functions are available: 
rename, download, delete, add file / folder, or upload under a specific folder.

[Figma design]([https://www.figma.com/design/Gd2qxspnrKTQLjloc0GOSF/Niek-CMS?node-id=2-1712&t=xS2UVMMV6y8GXald-1])

---

## Showcase

![dashboard](https://github.com/niekelodeon/Niek-CMS/blob/main/assets/dashboard.png "Dashboard page")
![login](https://github.com/niekelodeon/Niek-CMS/blob/main/assets/dashboard.png "Login page")
![selecting](https://github.com/niekelodeon/Niek-CMS/blob/main/assets/selecting.png "Selecting folder view")

## 🚀 Quick Start  

1. **Clone and install**
```bash
git clone <github.com/niekelodeon/Niek-CMS> orbit-cms && cd orbit-cms
npm install
```

2. **Create your .env file**
```
# website
websiteName = your_website_url

# server
serverPort = 8000

# mail server (setup using mailhog docker image)
mailHost = 0.0.0.0
mailPort = 55002
# mailEmail = for_production
# mailPassword = for_production

# database (sequalize will setup all tables)
host = your_database_ip
databasePort = your_database_port
database = your_database_name
user = your_database_username
password = your_database_password

# token
privateKey = your_jwt_privatekey

# file server (not implemmented yet)
```

3. **Run the application**
```cd server```

```npm run dev```

**&**

```cd client```

```npm run dev```

---

## Setting up a user: 

Go to localhost:(portnumber)/register and create one, if succesfull go to localhost:(portnumber)/login, you will be redirected to localhost:(portnumber)/edit/dashboard and you can start from there!
