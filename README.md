# Openchat server

Pull Openchat server to use the socket communication management to set a webchat in your webapp.  

[Live demo](http://164.132.106.118:4646/)  

## 📝 Requirements

### Environment variables

Tne environment variables bellow must be saved at the root of the repository as `.env` file.  

JSON format
```
{
  "NODE_ENV": "production",
  "SERVER_IP": "___", // server ip (ex: 127.0.0.1)
  "SERVER_PORT": 5656,
  "LOCALE": "fr",
  "ACCESS_TOKEN": "___", // access token to access in a specific route (ex: DZedihfzfezfih)
  "REDIS_URL": "___",
  "POSTGRES_URL": "___",
  "POSTGRES_DB": "___",
  "POSTGRES_USER": "___",
  "POSTGRES_PASSWORD": "___"
}

```

Ini format
```
NODE_ENV=production
SERVER_IP=___
SERVER_PORT=5656
LOCALE=fr
ACCESS_TOKEN=___
REDIS_URL=___
POSTGRES_URL=___
POSTGRES_DB=___
POSTGRES_USER=___
POSTGRES_PASSWORD=___
```

### Generate public and private keys

First, you have to create `pem` directory.  
Then, follow the instructions in this url: [How generate public and private keys](https://gist.github.com/ygotthilf/baa58da5c3dd1f69fae9).  
The last step is obviously to move the files in `pem` directory and to rename `jwtRS256.key` to `private.key` and `jwtRS256.key.pub` to `public.key`.   

## ⚙️ Run the project with Docker

### Verify if the repository have the latest version

```
git fetch && git pull --rebase // update your repository
```

### Build the docker image

Not required but it's a good practice.  

```
docker build -t openchat_server_image .
```

### Run it !

```
docker run -d -p 5656:5656 --env-file .env --name openchat_server openchat_server_image
```

## ⚙️ Run the project without Docker

### Verify if the repository have the latest version
```
git fetch && git pull --rebase // update your repository
```

### Set the environment variables in your environment

...

### SQL initialization

You have to go in `initialization` directory and run the `docker-entrypoint.sh` file. 

### Run the project

```
npm install
node index.js
```

## ❓️ The project is working ?

You can directly check if the project is working via the route `http://localhost:port/health`.   

## ☁️ Watch routes

An amazing tool has been set up on the project called `openapi` AKA `swagger`.   
To watch the routes, you have to go to `http://localhost:port/swagger?token=ACCESS_TOKEN` url.   

## 💡 Tips

If you want to be admin: you must to create an account via the client and then update directly in base the field `is_admin` to `true` for your user in `account` table.  
