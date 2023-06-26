## Deployment Manual

This manual provides the necessary steps to deploy and configure the service correctly.

### Prerequisites

Before getting started, make sure you have the following requirements installed:

- Node.js (version 18.0 or higher)
- Amazon Web Services (AWS) account
- AWS credentials with permissions to create and configure the necessary services.

### Obtaining a TMDb API Key

1. Visit [The Movie Database (TMDb) website](https://www.themoviedb.org/).
2. Create a free account or log in if you already have one.
3. Once logged in, access your [developer dashboard](https://www.themoviedb.org/settings/api).
4. Click on the "Request an API Key" button.
5. Provide the required information and accept the terms and conditions.
6. You will receive a generated API key. Take note of this key as you will need it in the following steps.

### Configuration of DynamoDB Tables

1. Log in to the [AWS Console](https://console.aws.amazon.com/).
2. Navigate to the DynamoDB service.
3. Create the following tables with their respective primary keys:

   - "users" table:
     - Primary Key: userId (String type)

   - "movies" table:
     - Primary Key: movieId (String type)

   - "favoriteMovies" table:
     - Primary Key: favoriteMovieId (String type)

   - "movienotes" table:
     - Primary Key: movienoteId (String type)

### Configuration of Cognito Client

1. Access the [AWS Console](https://console.aws.amazon.com/).
2. Navigate to the Cognito service.
3. Create a new user pool group.
4. Configure the authentication flow options and client settings according to your needs.
5. Take note of the generated "User Pool ID" and "Client ID" as you will need them in the configuration of environment variables.

### Configuration of Environment Variables

1. Create a `.env` file in the root directory of the project.

2. Open the `.env` file and define the following environment variables:

```plaintext
MOVIE_DB_API_KEY='Your TMDb API Key'
MOVIE_DB_API_URL='https://api.themoviedb.org/3'
MOVIE_DB_ACCESS_TOKEN='Your TMDb Access Token'
MOVIE_DB_BASE_URL='https://api.themoviedb.org/3'

AWS_ACCESS_KEY_ID='Your AWS Access Key ID'
AWS_SECRET_ACCESS_KEY='Your AWS Secret Access Key'
AWS_REGION='us-east-1'

COGNITO_USER_POOL_ID='Cognito User Pool ID'
COGNITO_CLIENT_ID='Cognito Client ID'
```

Make sure to replace the values within the quotes with the corresponding information.

### Service Deployment

1. Clone this repository to your local machine.
2. Open a terminal and navigate to the project directory.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

##  [OpenAPI specification](http://localhost:3000/api-docs)

