# user-preferences-center-api

> An API to collects Users consents and preferences to help companies get in compliance with data privacy regulations like GDPR and CCPA.

## About

I've developed this securized API in the context of this chalenge :

https://github.com/didomi/challenges/tree/master/backend

Continue reading and you'll have the information you need to set up your local environement and run the securized API.

## Technologies

What have I use to develop the API ?
-   Typescript/Node.js : this is a Typescript app
-   Feathers : a JS open source web framework for building modern real-time applications
-   Express.js
-   Sequelise ORM : I've defined schema of tables with Typescript code, so that the application should 
be able to work with any of these databases : Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server.
-   MySQL : I've done my tests on MySQL, feel free to use any other Database supported by the Sequelise ORM

## Features

    - I've covered the entire features to be develop for the context of the challenge, 
      feel free to use a client of your choice and exchange data with the API.
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


5. Run IDE Terminal and use it get into the application's folder path

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
       
    And this web services for the API's client authentication process :

    ```
    '/api-users' ,  '/authentication' 

    ```    


    The API Client tool I've used is 'Postman', feel free to choose your favorite API client tool.
    Postman download link : https://www.postman.com/downloads/


9. API Tutorial
    
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
    Belew is an example of an 'accesToken' :

            
        {
            "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJpYXQiOjE2MDgxMzE1ODksImV4cCI6MTYwODIxNzk4OSwiYXVkIjoiaHR0cHM6Ly95b3VyZG9tYWluLmNvbSIsImlzcyI6ImZlYXRoZXJzIiwic3ViIjoiNyIsImp0aSI6IjRjZWYzOTI3LTU4MGUtNGI4YS1hZjQ2LTVmZGJkODVhZmRhOCJ9.nR5R4iBoxvBNQxHaMD3n1WHZoaS1KvsdADJ8iNuTtJI"
        }    


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

            The service will then insert the new user into the database after :     
                -   Generating a UUID for the user 
                -   Contolling that the email is valid (if not OK, the API throws a 422 status code from a custom User error handler)
                -   Controling that the mail is not already registered in the database

            You'll then observe the 'User consent statut' in the API reponse as the example below :

        
                ```
                    GET on http://localhost:3030/users/a2079b1a-ccdc-474d-860f-49741c262edc
                    {
                        "id": "a2079b1a-ccdc-474d-860f-49741c262edc",
                        "email": "idris.tsafack@didomi.com",
                        "consents": []
                    }

                ```

        9.2.2 Also observe that user current statut by a 'GET' request as the example below :
            http://localhost:3030/users/a2079b1a-ccdc-474d-860f-49741c262edc

        9.2.3 You can visualize the list Users in the database by a 'GET' request à the ressource below :
            http://localhost:3030/users

        9.2.4 You can Update the User data by a 'PUT' or 'PATCH' request on 
            http://localhost:3030/users/a2079b1a-ccdc-474d-860f-49741c262edc
        
        9.2.5 You can delete the User from the database by a 'DELETE' request on 
            http://localhost:3030/users/a2079b1a-ccdc-474d-860f-49741c262edc


9.3 The Events web service

     ```
    /events 

    ```
        9.3.1 Create 2 events relative to the same User consent by POSTING a JSON object as the example below :

                ```
                    POST http://localhost:3030/events 
                    {
                        "user": {
                            "id": "a2079b1a-ccdc-474d-860f-49741c262edc"
                        },
                        "consents": [
                            {
                            "id": "email_notifications",
                            "enabled": true
                            }
                        ]
                    }

                    POST http://localhost:3030/events 
                    {
                        "user": {
                            "id": "a2079b1a-ccdc-474d-860f-49741c262edc"
                        },
                        "consents": [
                            {
                                "id": "email_notifications",
                                "enabled": false
                            },
                            {
                                "id": "sms_notifications",
                                "enabled": true
                            }                            
                        ]
                    }
                ```  

                For each of those POST request the API will return the events persisted formated as above.
                After sendind sequentially those 2 request to the same user, the user consent will become :


                ```
                    GET on http://localhost:3030/users/a2079b1a-ccdc-474d-860f-49741c262edc
                    {
                        "id": "a2079b1a-ccdc-474d-860f-49741c262edc",
                        "email": "idris.tsafack@didomi.com",
                        "consents": [
                            {
                                "id": "email_notifications",
                                "enabled": false
                            },
                            {
                                "id": "sms_notifications",
                                "enabled": true
                            }                            
                        ]
                    }
                ```       
        
        9.3.2 Also observe that event in that format by a 'GET' request as the example below chere the number '1' represents the id of the event :
            http://localhost:3030/users/1

        9.2.3 You can visualize the list events in the database by a 'GET' request à the ressource below :
            http://localhost:3030/events

        9.2.4 You can not Update the event as is forbidden by this exercice, every tentation will ends on a 405 stauts error from a custom Event error handler 
        
        9.2.4 You can not Delete the event as is forbidden by this exercice, every tentation will ends on a 405 stauts error from a custom Event error handler
        

9.4 The users events history web service


     ```
    /users-history 
    ```
        
        This is a Feathers 'custom service' sharing the same Node package as 'users service' and dealing with only 2 services.
        All the events of a user not dealing with his current status are related to the User events history and stored in the database. 
        => Note that in the users events history list, there is a field called 'history_start_at' wich is a number that determines the number from wich start the events that aren't related to the current user's consent status.

        Below is an example of the events list :
        

         ```
            GET ON http://localhost:3030/users-history

            [
                {
                    "id": "24455acd-e0e7-44c4-804f-21e6e9a397a4",
                    "email": "compilator.tsafack@didomi.com",
                    "history_start_at": 3,
                    "consents": [
                        {
                            "id": "email_notifications",
                            "enabled": false,
                            "created_at": "2020-12-15T07:12:11.000Z"
                        },
                        {
                            "id": "sms_notifications",
                            "enabled": true,
                            "created_at": "2020-12-15T07:12:11.000Z"
                        },
                        {
                            "id": "email_notifications",
                            "enabled": true,
                            "created_at": "2020-12-15T07:12:01.000Z"
                        }
                    ]
                },
                {
                    "id": "6145dafb-aef2-447d-b415-ebfdbb5bb416",
                    "email": "compi.tsafack@didomi.com",
                    "history_start_at": 3,
                    "consents": [
                        {
                            "id": "email_notifications",
                            "enabled": true,
                            "created_at": "2020-12-15T01:22:20.000Z"
                        },
                        {
                            "id": "sms_notifications",
                            "enabled": false,
                            "created_at": "2020-12-15T01:22:20.000Z"
                        },
                        {
                            "id": "6c8ebe8b-7009-4518-b68c-527c091f1c3a",
                            "email": "idris@teranova.com",
                            "consents": []
                        },
                        {
                            "id": "a2079b1a-ccdc-474d-860f-49741c262edc",
                            "email": "idris.tsafack@didomi.com",
                            "consents": []
                        },
                        {
                            "id": "b942285c-7496-47c3-aca6-49db02d93003",
                            "email": "idriss.tsafack@didomi.com",
                            "consents": []
                        }
                    ]
                }
            ]

         ```


10. Testing

        I've written some unit to conclude this challenge, tests are done with Mocha. 
        Feel free to run some units test in the App, it's simple since I've well configured the command lines needed in the 'package.json' application's file.

        To run unit tests, simply run the command below and all the tests files in the `test/` directory will be run.

        ```
            run `npm test` 

        ```
        
        These are some features for wich unit tests are implemented :

            -   All web services registration
            -   Local strategy authentication test
            -   API users authentication and accessToken creation
            -   The application starter
            -   starts and shows the index page
            -   JSON 404 error without stack trace


11. Code coverage

    Code coverage is a great way to get some insights into how much of our code is actually executed during the tests. Using 'Istanbul' I've add it to project.
    
    To execute run the code coverage tool run the same command as above, you see a dashboard at the end of the test, illustrating code coverage.



Thanks for reading.
I'm opened to a possible code review and peer to peer programming with you.

Cheers !

