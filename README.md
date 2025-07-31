# Roman Numerals Converter

Simple backend and frontend which converts an integer to roman numerals.

The backend is provided by NestJS, and the frontend by Vite. The frontend is served via the NestJS serve static module.

## Design choices

### Frontend

The frontend makes use of Vite to serve the React application, and Axios for the request library. The frontend also makes
use of the styled-components library.

Vite was chosen because it is a new tool that is quickly becoming one of the go-to standard tools in React application
development. It is fast, easy to get started with, and lightweight. Likewise, vitest was chosen for its integration with
Vite, and support for Jest-like syntax.

Axios was chosen since it is also a standard industry tool, but includes built-in typing via generics. Typed
data transfer objects lead to a cleaner and easier to use interface.

The `styled-components` library was chosen because it's a nice way to make clean components that have particular styles.
The styles can be defined in a common location where they can be easily seen and modified, and the main view section of
the component they are being used in can be kept clean and easy to read.

### Backend

The backend makes use of NestJS as the server framework, along with the Serve Static module, which is built into Nest.

NestJS was chosen because it provides a well-defined framework for implementing a REST service, which speeds development.
Many essential decisions are already made and are easy to use. Nest's method of handling requests via Controllers, data
access via Services, and code segmentation via Modules makes it straightforward to organize the project and add new functionality.
Nest is also supports many different ways of doing things that all tie into the same approach, which makes it easier to
think about the project's concepts.

Additionally, I chose Open Telemetry (OTEL) for traces, logs, and metrics. OTEL is easy to integrate with Node through
its auto-instrumentation, and there were several guides that could be found online that made troubleshooting issues much
easier. Furthermore, OTEL is vendor-agnostic and open source, which makes it compatible with a number of metrics
visualization products that could be chosen later. For the purposes of validation locally, I chose to use a local instance
of SigNoz, again, for ease of setup, but that is not strictly required as part of this project.

In order to integrate with OTEL's logging, I chose Winston for the logging library. The default NestJS logger is not bad
but is not set up to integrate with OTEL out of the box. Winston is a widely used logging library and has a NestJS integration
library that is popular in the community. It was easy to get set up with these options and tie into OTEL.

## Development

To run this project in development mode, proceed with the following steps.

```bash
cd frontend
npm install
npm run build
npm run dev
# In a separate terminal
cd backend
npm install
npm run start:dev
```

This will start the backend up on the configured port (default 3000), which is then accessible via the browser at `localhost:3000/romannumeral`. The frontend
will be accessible at `localhost:5173`.

Note that the backend expects exactly one query parameter, `query`, which takes an integer between 1 and 3,999.

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

To run the container you can execute the following:

```bash
# For the development version; exposes the server on port 8080
docker run --rm -p 8080:3000 roman-numerals-dev:latest
# Or for the production version
docker run --rm -p 8080:3000 roman-numerals-prod:latest
```

Obviously, you can change the name of the image as needed when you build it. Note that if you wish to collect metrics, traces, and logs, you
will need to provide the environment variables to the container as specified below, under
[Collecting metrics, traces, and logs](#collecting-metrics-traces-and-logs).

For example:

```bash
docker run --rm -p 8080:3000 -e OTEL_EXPORTER_OTLP_ENDPOINT="http://host.docker.internal:4318" roman-numerals-dev:latest
```

The frontend can then be accessed by navigating to http://localhost:8080/. If you wish to access the backend directly, it can also be found at
http://localhost:8080/health or http://localhost:8080/romannumeral?query=123, where the value for `query` can be modified as desired.

### Docker Compose

Alternatively, a Docker Compose file has been provided to make things a little easier with regard to mounting and port exposure. The
compose file targets the development image, and mounts the backend directory for hot reload.

```bash
docker compose build roman-numerals
docker compose up roman-numerals
# Do some work...
# Shut the service down
docker compose down -v roman-numerals
```

### E2E Tests

The service is set up with Playwright E2E tests. See the frontend's README for additional details. Running the service
via the compose file will put it in the correct state to accept connections from the E2Es.

### Collecting metrics, traces, and logs

The service has been set up with Open Telemetry to collect metrics, traces, and logs.

#### Configuration

OTEL configuration is more deeply explained [in their documentation](https://opentelemetry.io/docs/languages/sdk-configuration/otlp-exporter/),
but here is a brief overview of interesting environment variables that are used to configure the backend for this project.

| Env var                             | Default                            | Description                                                                                         |
|-------------------------------------|------------------------------------|-----------------------------------------------------------------------------------------------------|
| OTEL_EXPORTER_OTLP_ENDPOINT         | `http://localhost:4318`            | Used to override the hostname and port for all otel endpoints, if the path is otherwise the default |
| OTEL_EXPORTER_OTLP_TRACES_ENDPOINT  | `http://localhost:4318/v1/traces`  | Informs the backend where to send OTEL traces; overrides the general variable above                 |
| OTEL_EXPORTER_OTLP_LOGS_ENDPOINT    | `http://localhost:4318/v1/logs`    | Informs the backend where to send OTEL logs; overrides the general variable above                   |
| OTEL_EXPORTER_OTLP_METRICS_ENDPOINT | `http://localhost:4318/v1/metrics` | Informs the backend where to send OTEL metrics; overrides the general variable above                |

#### Local traces and logs with SigNoz

An easy way to view these is with SigNoz, which can be set up for self-hosting. See their
[docker compose setup instructions](https://signoz.io/docs/install/docker/#install-signoz-using-docker-compose) for additional information.
You should also be able to use other metrics viewers that are compatible with OTEL.

Note that the default SigNoz web application port collides with our port; to deal with that, modify the port in SigNoz's
compose file to be at one that is more appropriate, such as `8082`.

Here is where the file needs to be modified, as of time of
writing: https://github.com/SigNoz/signoz/blob/210393e28133405548f229e3cbc9142cab870298/deploy/docker/docker-compose.yaml#L118

```
  signoz:
    !!merge <<: *db-depend
    image: signoz/signoz:${VERSION:-v0.91.0}
    container_name: signoz
    command:
      - --config=/root/config/prometheus.yml
    ports:
      - "8080:8080" # signoz port               <-- Modify this to "8082:8080", or appropriate external port
    #   - "6060:6060"     # pprof port
    volumes:
```
