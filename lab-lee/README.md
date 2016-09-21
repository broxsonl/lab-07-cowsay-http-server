# Purpose of this Project

The purpose of this project is to allow a user to make either a HTTP GET or HTTP POST request and have the response displayed using the cowsay API.

GET Requests:
        http localhost:3000/ //will respond with "hello world" with no cowsay
        http localhost:3000/cowsay text=='[insert text]' : will respond with cowsay //will

 POST Requests:

 - Ensure you have a model folder in your root directory that contains a data.json file.
 - Ensure your data.json file has an object with the property of 'text' that is set to string.
 - Run the following command

        cat data.json | http post localhost:3000/cowsay
