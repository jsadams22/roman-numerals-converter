'use strict';

import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { resourceFromAttributes } from '@opentelemetry/resources';
import * as opentelemetry from '@opentelemetry/sdk-node';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';

// If nobody gave us a place to send the traces, then we're going to assume that there's a locally hosted SigNoz instance
// that we can send to (since that is what initial development was done with; see docs)
const tracesEndpoint = process.env.OTEL_TRACES_ENDPOINT ?? 'http://localhost:4318/v1/traces';

const exporterOptions = {
    url: tracesEndpoint,
};

// Enable all auto-instrumentations from the meta package
const traceExporter = new OTLPTraceExporter(exporterOptions);
const sdk = new opentelemetry.NodeSDK({
    traceExporter,
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
