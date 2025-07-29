'use strict';

import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { resourceFromAttributes } from '@opentelemetry/resources';
import * as opentelemetry from '@opentelemetry/sdk-node';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';

// NOTE: OTEL has several environment variables that can be used to tell it where to send traces. Here, rather than
// add our own, we're just going to depend on those. The variables of interest are below, taken from
// https://opentelemetry.io/docs/languages/sdk-configuration/otlp-exporter/
// OTEL_EXPORTER_OTLP_ENDPOINT-- sets the hostname and port for all of the endpoints; paths are the same as default
// OTEL_EXPORTER_OTLP_TRACES_ENDPOINT-- just for traces; defaults to http://localhost:4318/v1/traces
// OTEL_EXPORTER_OTLP_LOGS_ENDPOINT-- just for logs; defaults to http://localhost:4318/v1/logs
// OTEL_EXPORTER_OTLP_METRICS_ENDPOINT-- just for metrics; defaults to http://localhost:4318/v1/metrics

// Enable all auto-instrumentations from the meta package
const sdk = new opentelemetry.NodeSDK({
    traceExporter: new OTLPTraceExporter(),
    instrumentations: [getNodeAutoInstrumentations()],
    resource: resourceFromAttributes({
        [ATTR_SERVICE_NAME]: 'roman-numerals-service',
    }),
});

// initialize the SDK and register with the OpenTelemetry API
// this enables the API to record telemetry
sdk.start();

// gracefully shut down the SDK on process exit
process.on('SIGTERM', () => {
    sdk.shutdown()
        .then(() => console.log('Tracing terminated'))
        .catch((error) => console.log('Error terminating tracing', error))
        .finally(() => process.exit(0));
});

export default sdk;
