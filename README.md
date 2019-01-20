# Fun With Node Email

This repository is a part of my "fun with" series. Each and every day I challenge myself to learn something new. Once I feel like I understand a subject well enough to move onto the next one, I build a small proof of concept or example so that I can reference it in the future. It also has the double benefit of serving as a great learning resource for my Bootcamp students.

Just wanted to build a quick little reference project for working with Node email using Pug.

## Structure

Simple Express server with a Node email handler and sample email controller method/route that sends an email when the endpoint is hit.

## Starting the project

1. Clone the repository
2. Navigate to the cloned project and run `yarn install`
3. Create a variables.env file with the following variables:
   NODE_ENV=development
   DATABASE=<mongoURL>
   PORT=<someport>
   JWT_SECRET=<jwt_secret>
   MAIL_USER=<mail_username>
   MAIL_PASS=<mail_password>
   MAIL_HOST=<mail_host>
   MAIL_PORT=<mail_port>
4. To start the project, run `yarn start`

## TODO

- [] Create a dynamic email using user data
