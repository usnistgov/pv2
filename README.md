# PV<sup>2</sup>
PV<sup>2</sup> is a web application that calculates the cost of ownership of a residential 
solar system. It utilizes the E<sup>3</sup> API for running the economic analysis.

## Running the app
Clone the repository:

    $ git clone https://github.com/usnistgov/pv2.git
    $ cd pv2

## Run locally for development
Build and run with yarn:

    $ yarn install
    $ yarn run start

Or build and run with npm:

    $ npm install
    $ npm run start

## Run production build on docker 
Ensure docker and docker-compose are installed.

Build and run with docker-compose: 

    $ docker-compose build
    $ docker-compose up