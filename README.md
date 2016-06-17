# centerpoint-admin

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.15.1.

You must run a local copy of the [centerpoint-api](https://github.com/maxatbrs/centerpoint-api) to work with data

## Run and Build App

To run

    grunt serve

To build and run locally

    grunt build

    cd dist/;

    python -m SimpleHTTPServer

## Testing

Running `grunt test` will run the unit tests with karma. `grunt serve` will run this in real time.

All code must have 100% test coverage.

Coverage is reported in `coverage/` and an HTML report can be found at `coverage/report-html/index.html`

### Naming Conventions
Below are some naming conventions of the project:

 - snake-case for element id, classes, and file names
 - camelCase for definitions

### Branching / PR
Here is the development flow:

 - Branch from master to feature/name or bug/name
 - Make a PR and assign it to another developer
 - Once approved, merge branch into master and cull branch

## Yeoman Recipes
Below are a few helpful things when using yeoman to generate Angular code

### Creating a Route
Create a Route named {feature}-{action}

    yo angular:route {feature}-{action}

    yo angular:route asset-list

### Creating a Directive
Create a Route named {directive-name}

    yo angular:directive {directive-name}

    yo angular:directive asset-upload

### Creating a Service
Create a service named {service-name}-service , appending the keyword -service to the end

    yo angular:service {service-name}-service

    yo angular:service asset-service

### Creating a Factory
Create a factory named {factory-name}-factory , appending the keyword -factory to the end

    yo angular:factory {factory-name}-factory

    yo angular:factory asset-factory
