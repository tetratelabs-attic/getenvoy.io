+++
title = "getenvoy run"
type = "reference"
parent = "getenvoy"
command = "run"
toc = true
+++
## getenvoy run

Runs an instance of Envoy.

### Synopsis


Manages full lifecycle of Envoy including bootstrap generation and automated collection of access logs,
Envoy state and machine state into the `~/.getenvoy/debug` directory.

```
getenvoy run <reference|filepath> [flags] [-- <envoy-args>]
```

### Examples

```
# Run using a manifest reference.
getenvoy run standard:1.11.1 -- --config-path ./bootstrap.yaml

# Run as a gateway using an Istio controlplane bootstrap.
getenvoy run standard:1.11.1 --mode loadbalancer --bootstrap istio --controlplaneAddress istio-pilot.istio-system:15010

# Run using a filepath.
getenvoy run ./envoy -- --config-path ./bootstrap.yaml

# List available Envoy flags.
getenvoy run standard:1.11.1 -- --help

```

### Options

```
      --accessLogServerAddress string   (experimental) location of Envoy's access log server <host|ip:port> (requires bootstrap flag)
  -b, --bootstrap string                (experimental) controlplane bootstrap to generate and use <istio>
      --controlplaneAddress string      (experimental) location of Envoy's dynamic configuration server <host|ip:port> (requires bootstrap flag)
  -h, --help                            help for run
      --mode string                     (experimental) mode to run Envoy in <loadbalancer> (requires bootstrap flag)
```

### SEE ALSO

* [getenvoy](/reference/getenvoy)	 - Fetch, deploy and debug Envoy

