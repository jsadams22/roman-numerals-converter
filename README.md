# Roman Numerals Converter

Simple backend and frontend which converts an integer to roman numerals.

The backend is provided by NestJS, and the frontend by Vite. The frontend is served via the NestJS serve static module.

## Design choices

### Frontend

The frontend makes use of Vite to serve the React application, and Axios for the request library.

Vite was chosen because it is a new tool that is quickly becoming one of the go-to standard tools in React application
development. It is fast, easy to get started with, and lightweight. Likewise, vitest was chosen for its integration with
Vite, and support for Jest-like syntax.

Axios was chosen since it is also a standard industry tool, but includes built-in typing via generics. Typed
data transfer objects lead to a cleaner and easier to use interface.

### Backend

The backend makes use of NestJS as the server framework, along with the Serve Static module, which is built into Nest.

NestJS was chosen because it provides a well-defined framework for implementing a REST service, which speeds development.
Many essential decisions are already made and are easy to use. Nest's method of handling requests via Controllers, data
access via Services, and code segmentation via Modules makes it very easy to organize the project and add new functionality.
Nest is also supports many different ways of doing things that all tie into the same approach, which makes it easier to
think about the project's concepts.

## Development

To run this project in development mode, proceed with the following steps.

```bash
cd frontend
npm install
npm run build
cd ../backend
npm install
npm run start:dev
```

This will start the backend up on the configured port (default 3000), which is then accessible via the browser at `localhost:3000/index.html`.

## Running the project

The project can be built with the following commands, depending on if you want to run the development or production version of the container image.
The development version will run Nest in watch mode, which will detect changes in the backend and hot reload, without requiring a container
rebuild. Note that to accomplish this, you would need to mount the backend directory appropriately.

```bash
# Development version of the image
docker build --target=development . -t roman-numerals-dev
# Production version
docker build --target=production . -t roman-numerals-prod
```

To run the container, you can simply execute the following:

```bash
# For the development version; exposes the server on port 8080
docker run --rm -p 8080:3000 roman-numerals-dev:latest
# Or for the production version
docker run --rm -p 8080:3000 roman-numerals-prod:latest
```

Obviously, you can change the name of the image as needed when you build it.

The frontend can then be accessed by navigating to `http://localhost:8080/index.html`.

### Docker Compose

Alternatively, a Docker Compose file has been provided to make things a little easier with regard to mounting and port exposure. The
compose file targets the development image, and mounts the backend directory for hot reload.

```bash
docker compose build roman-numerals
docker compose up roman-numerals
# Do some work...
# Shut the service down
docker compose down roman-numerals
```
