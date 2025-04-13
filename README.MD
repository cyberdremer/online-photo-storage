# Dave.Save

## Overview

- This is a fullstack project that allows for users to create an account, login, upload folders and files to said account in order to access them.

## Features

- __Account Creation__: Users can create an account and login to said account.
- __Folder Creation__: Users can create folders and folders within folders to store their files.
- __File Upload__: Users can upload files, rename files and delete them.

## Tech Used

- __Frontend__: React, Javascript
- __Backend__: Nodejs, Express, Javascript
- __Database__: Postgress
- __Asset Storage__: Cloudinary
- __Misc__: Passport.js, Chakra-UI, react-cookies

## Screenshots

![Image](https://github.com/user-attachments/assets/b6ef4938-a04d-4f96-b4bc-7f6c14eb6d7e)

![Image](https://github.com/user-attachments/assets/4f52c102-dd39-450f-8bc2-0c82e99d31df)

![Image](https://github.com/user-attachments/assets/542b997e-df22-4da0-a58e-1a24480f2839)

## Installation

1. Clone the repository

```
git clone git@github.com:cyberdremer/online-photo-storage.git
cd online-photo-storage
```

2. Install dependencies for the front-end:

```
cd front_end
npm install
```

3. Install dependencies for the back-end:

```
cd back_end
npm install
```

4. Setup environment variables: Create a .env file in the root directory of the backend and add the following fields

```
PORT=
DATABASE_URL=
JWTTOKENSECRET=
JWTREFRESHTOKENSECRET=
NODE_ENV=
TEST_DATABASE_URL=
CLOUDINARY_URL=
```

5. Setup environment variables: Create a .env file in the root directory of the front end add add the following fields

`PORT=`

6. Start the server

```
cd back_end
node --watch app.js
```

7. Start the front end

```
cd front_end
npm run dev
```

8. Access the front end by going over to http:localhost:${PORT}, with port being the port you designated in your .env file
