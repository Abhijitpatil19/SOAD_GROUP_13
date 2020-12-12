# Workgent Backend

This project aims to build a rest api using [Django Rest Framework](https://www.django-rest-framework.org/) also known as DRF.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

* Download and install [pip](https://pip.pypa.io/en/stable/installing/) and [python](https://www.python.org/downloads/), preferably the latest versions.
* Download [npm](https://www.npmjs.com/get-npm) to use [Swagger-UI(REST API Documentation Tool)](https://swagger.io/tools/swagger-ui/)

### Development

Install using `pip`...

    pip install virtualenv

To verify installation run

    pip show virtualenv

Create a virutalenv

    virtualenv mypython

Activate the virutal environment

    source mypython/bin/activate

To deactivate the virtual environment, use

    deactivate

You can learn more about customizing your virutal environment [here](https://virtualenvwrapper.readthedocs.io/en/latest/command_ref.html#controlling-the-active-environment)

Use the `requirements.txt` to install all the required dependencies

    pip install -r requirements.txt

After the installation, get into the `workgent` folder

    cd workgent

Install the dependencies for `Swagger-UI`

    npm install

Here we are done with the `installation` part.

## Time to get our app `up` and `running`

Migrate the database

    ./manage.py makemigrations && ./manage.py migrate

Create a `Super User` to use all the features

    ./manage.py createsuperuser

Fill all the details required and start the app

    ./manage.py runserver

## Using [Swagger-UI(REST API Documentation Tool)](https://swagger.io/tools/swagger-ui/)

While the app is up and running, you can make use of this tool to view all the `API's` available for use

    http://localhost:8000/auth/swagger-ui/

## Hacks

To use FilterSet:

    http://localhost:8000/accounts/item?name=onion&price=5000

To use Search Filter:

    http://localhost:8000/accounts/item?search=onion
    note: also supports regex

To use Ordering Filter:

    http://localhost:8000/accounts/item?ordering=name,price
    note: add prefix "-" to reverse the order

## Acknowledgments

* Code -> eat -> repeat
