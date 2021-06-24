<img src="https://mayeryn.com/wp-content/uploads/2019/05/logo_wp_dark@2x.png" style="width: 30%;">

# STARTER PROJECT README


# Application start

First of all and almost only thing you need is docker and docker-compose. For example instalation on ubuntu:

1) sudo apt-get update
2) sudo apt install docker.io 
3) sudo systemctl start docker (starting docker)
4) sudo systemctl enable docker (enable starting docker on linux startup)
5) sudo curl -L "https://github.com/docker/compose/releases/download/1.25.5/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
6) sudo chmod +x /usr/local/bin/docker-compose 
7) docker-compose --version (Optional to check if docker-compose is installed)

Post install steps: (to run docker without sudo)
1) sudo groupadd docker
2) sudo usermod -aG docker $USER (log out and log back might be necessary)
3) newgrp docker


# How to run

## Developmnet mode

If you have docker-compose installed type ``` docker-compose build ``` to build containers. After building to start app simply type ``` docker-compose up ```. After few moments everything Should work file. (Usage if ``` sudo ``` may be necessery)

If you want you can start app in detached mode (no console logs and not blocking current shell) by adding -d in the end ``` docker-compose up -d ```

If you don't like using the cli you can use thing like Portainer/DockStation/Kitematic :)

## Production mode

If you want to run app in production mode you need to modify starting command like this: ``` docker-compose -f docker-compose.prod.yml up -d ```

## How to stop

CTRL-C :) or manually via Docker cli with ``` docker container stop [CONTAINERS] ``` if you run in detach mode (-d flag)

## Troubleshooting

- This application uses 3 ports which for convenience are exposed to local machine. Port 3308 81 and 82 need to be avaiable.
- If you notice a lot of disk space used by docker run ``` docker image prune ```, which removes unused images. If you have a lot of containers you can run ``` docker container prune ``` (which removes unused containers (stopped)) and then remove unused images.
- My database is not updated. Remove container with mysql and restart app. To check list of containers use ``` docker container ps -a ```. Find container you want to remove and type ```docker container stop <FEW_CHARS_OF_CONTAINER_ID> && docker container rm <FEW_CHARS_OF_CONTAINER_ID>```.

## Connecting to containers from local machine

- **DataBase**: 
    1) If you want to check what is happening in DB you can connect it to workbench/intellij etc. via jdbc:mysql://localhost:3308 or jdbc:mysql://127.0.0.1:3308 with login:password root:root
    2) You can request or connect to DB via terminal by mysql -h 127.0.0.1 -P 3306 -u root
- **SERVER**    
    1) Server is running on port 81, you can check api documentation on http://localhost:81/api-docs
- **WEB**
    1) Front is located on port 82, so landing page is on http://localhost:82
    
# Steps after coping starter project:
1) Docker-compose file:
    - change environment variable for mysql MYSQL_DATABASE to your real server name based on project name,
2) Server:
    - pom.xml: artifactId, name, and also description should be changed
    - src/main/resources/application.yml: spring.application.name change it to be same as variable in docker-compose MYSQL_DATABASE
    - src/main/resources/migration: delete example migration file
