# TEMPLATE - MERN STACK - BOOTSTRAP UI

This template will make it easier to start a new MERN project. It has both backend apis and front end interface for registering and logging in. A profile is included also.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You will ned to have nodejs, npm and git installed on your computer.

### Installing

A step by step series of examples that tell you how to get a development env running

Using your terminal clone the project first:

```
git clone https://github.com/lboone/template-mern_material_ui.git
```

Initialize the project (This will install all of the dependancies)

```
npm init
npm run dev-install
```

Dev Dependancies

```
install react devtools chrome extension
install redux devtools chrome extension
```

Update the config keys files

```
config/keys.js
Change the mongo db reference and the Secret Key

client/src/config/keys.js
If you don't want to pull in Github repositories, change the GITHUB.USE_REPOSITORIES to false.
 - - ELSE - -
Register your application with Github if you want to pull in Github repositories.
Change the GITHUB.CLIENT_SECRET & GITHUB.CLIENT_ID for pulling in your git hub repositories.
```

Run the project

```
npm run dev
```

Update the client/src/img/showcase.jpg image and the css file if you change the name of the image

```
This is the home page image, you can either add a new one, or replace the existing one using the same name.
If you add a new one, you will have to go into the client/src/App.css file and change the reference there.
```

Update the title in the client\public\index.html file

```
Open the file and type a new title for your site.
```

Update the client config keys in the client\src\config\keys.js file

```
Open the file and change all of the config keys.
```

## Deployment

You can deploy on heroku.

## Built With

- [MongoDB](https://www.mongodb.com/) - The database framework
- [ExpressJS](https://expressjs.com/) - Server Routing and Apis
- [ReactJS](https://reactjs.org/) - The web framework used
- [NodeJS](https://nodejs.org/) - The server framework used

## Authors

- **Lloyd Boone** - _Initial work_ - [LAMB Apps](https://lambapps.com)

## License

This project is licensed under the MIT License

## Acknowledgments

- Brad Traversy - MERN Stack Front To Back: Full Stack React, Redux & Node.js
