# user-preferences-center-api

> An API to collects Users consents and preferences to help companies get in compliance with data privacy regulations like GDPR and CCPA.

## About

I've developed this securized API in the context of this chalenge :

https://github.com/didomi/challenges/tree/master/backend

Continue reading and you'll have the information you need set up your local environement and run the App.

## Technologies

What have I use to develop the API ?
    -   Typescript/Node.js : this is a Typescript app
    -   Feathers : a JS open source web framework for building modern real-time applications
    -   Express.js
    -   Sequelise ORM : I've defined schema of tables with Typescript code, so that the application should be able to work with any of these databases : Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server.
    -   MySQL : I've done my tests on MySQL, feel free to use any other Database supported by the ORM Sequelise

## Features
    - I've covered the entire features to be develop for the context of the challenge, feel free to use a client of your choice and exchange data with the API.
    - I've added 2 other features :
        -   API security by JWT token, as local strategy (login/paasword)
        -   Event history of users and their consents  

## Getting Started 

I suppose the person reading this document is a developer and therefore has skills to set up his developpent environment without too much difficulties.

Getting up and running is as easy as 1, 2, 3.

1. Install your favorite IDE (I've used VS Scode)

2. Make sure you install [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) 
    I've used Node v14.15.1 
    It comes with npm v6.14.8
    Download link : https://nodejs.org/en/
   
 
3. Get the source code of the application from my git repository from the HTTP link below :

    https://github.com/Compilator0/user-preferences-center-api.git


4. Start your IDE and use it to open the folder containing the application you donwload

5. Run IDE Terminal and use it get into the application's folder path.
   Install the application dependencies by running the command below :

    ```
    cd path/to/user-preferences-center-api
    npm install
    ```

6. Install the database MySQL, a recent version is suitable

   First create a database called : 'dev_consent_management_db'

   Then if you want, as I recommend, you can initialise your database with some data of my dev environment (users, events history) by running the SQL scripts present in this file at the root folder of the project's source code :
    ```
    dev_consent_management_db.sql
    ```
    
    Note that if you run or not those SQL scripts the application with generate for free :) a database for you, the tables will be empty and you'll have to fill them via the API web services.

7. Configure and Start the app 
    In the project's folder open the JSON file at /config/default.json and configure it according to your needs.
    A very important field has to be created to define credentials needed by the application to communicate with the MySQL database.

    This is how I've defined the values for me :

    ```
            "mysql": "mysql://user:password@localhost:3306/dev_consent_management_db"

    ```
    In the value of the key "mysql", replace "user" by your MySQL 'user' and "password" by your MySQL 'password'.

    For people using postgres database, the connection string will be something like this :

            "postgres": "postgres://user:password@localhost:5432/dev_consent_management_db"
    

    
    Finally start the app by using command below to run on your development environment :

        ```
        NODE_ENV=development npm start
        ```


8.  Enjoy the App by using these main web services with a API client tool.
    ```
    '/users' ,  '/events' , '/users-events-history' 

    ```    
        The API Client tool I've used is 'Postman', feel free to choose your favorite API client tool.
        Postman download link : https://www.postman.com/downloads/


9. Tutorial
    
    9.1 The API authentication web service for security

    ```
    /api-users 

    ```
    Use this service to get a JWT token that you'll need to be authenticated by the API server, else your HTTP request to the app web services will fail. It's easy to that, keep reading.
    
    9.1.1 Create your API user account by sending a post request via your API client tool, to this endpoint with a JSON object containing your credentials.
        Example :
            ```
                POST on http://localhost:3030/api-users
                {
                    "email": "idris.tsafack@didomi.com",
                    "password": "mysweetyPassword"
                }

            ```

    9.1.2 Then use your account to get a JwT Token by using the service at the below API's endpoint, by doing another POST request to the web service /authentication with a JSON object containing your credentials created above including the authentication strategy.     
        Example :  
    
            ```
                POST on http://localhost:3030/authentication

                {
                    "strategy": "local",
                    "email": "idris.tsafack@didomi.com",
                    "password": "mysweetyPassword"
                }

            ```    
    Look at the server response on the API client tool and copy the value of the field 'accessToken'. Finally configure your API client tool to user this JwT Token as 'Bearer Token' to be included in the header of all the HTTP request you'll noww send to the application. You shall need to renew your JwT token since it will expire after 24H.

    Feel happy as you can now use access the 3 main services of the API application.

    9.1.3

9.2 The Users web service

     ```
    /users 

    ```
        9.2.1 Create a user by POSTING a JSON object as the example below :
                ```
                    POST on http://localhost:3030/users
                    {
                        "email": "idris.tsafack@didomi.com"
                    }

                ```  
            The application will then insert the new user into the database after :     
                    -   Generating a UUID for the user 
                    -   Contolling that the email is valid 
                    -   Controling that email is not already registered in the system

            You'll then observe the User consent statut in the API reponse as the example below :
            In the API reponse, you can observe the current consent status of the User as the example below :

                ```
                    {
                        "id": "a2079b1a-ccdc-474d-860f-49741c262edc",
                        "email": "idris.tsafack@didomi.com",
                        "consents": []
                    }

                ```
            

        9.2.2 Observe the user current statut by a GET request as the example below :
            You can also obtain the above reponse by a GET request on 
            http://localhost:3030/users/a2079b1a-ccdc-474d-860f-49741c262edc

        9.2.3 You can Update the User data by a PUT or PATCH request on 
            http://localhost:3030/users/a2079b1a-ccdc-474d-860f-49741c262edc
        
        9.2.3 You can delete the User from the database by a DELETE request on 
            http://localhost:3030/users/a2079b1a-ccdc-474d-860f-49741c262edc


9.3 The Events web service

     ```
    /users 

    ```
        Create an event containing the user consent by POSTING a JSON object as the example below :
                ```
                    POST on http://localhost:3030/authentication
                    {
                        "email": "idris.tsafack@didomi.com"
                    }

                ```  
9.4 The users events history web service

     ```
    /users-history 

    ```



## Testing
I've written some test in the application with Mocha. Feel free to run some units test in App, it's simple since I've well configured the command lines needed in the 'package.json' application's file.

To tun unit tests, simply run the command below :
 run `npm test` and all the tests in the `test/` directory will be run.


Thanks for reading.
I'm opened to a possible code review and peer to peer programming with you.


Cheers !

