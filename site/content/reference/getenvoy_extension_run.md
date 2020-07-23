+++
title = "getenvoy extension run"
type = "reference"
parent = "extension"
command = "run"
+++
## getenvoy extension run

Run Envoy extension in the example setup.

### Synopsis


Run Envoy extension in the example setup.

```
getenvoy extension run [flags]
```

### Examples

```

  # Run Envoy extension in the "default" example setup
  getenvoy extension run

  # Run Envoy extension in the "default" example setup using a particular Envoy release provided by getenvoy.io
  getenvoy extension run --envoy-version wasm:nightly

  # Run Envoy extension in the "default" example setup using a custom Envoy binary
  getenvoy extension run --envoy-path /path/to/envoy

  # Run Envoy extension in the "default" example setup using Envoy with extra options
  getenvoy extension run --envoy-options '--concurrency 2 --component-log-level wasm:debug,config:trace'

  # Run Envoy extension in the "default" example setup using a pre-built *.wasm file
  getenvoy extension run --extension-file /path/to/extension.wasm

  # Run Envoy extension in the "default" example setup using a custom extension config
  getenvoy extension run --extension-config-file /path/to/config.json

  # Run Envoy extension in the "default" example setup; build the extension using Docker build container with extra options
  getenvoy extension run --toolchain-container-options '-e VAR=VALUE -v /host/path:/container/path'

  # Run Envoy extension in the "default" example setup; build the extension using Docker build container with SSH agent forwarding enabled (Docker for Mac)
  getenvoy extension run --toolchain-container-options '--mount type=bind,src=/run/host-services/ssh-auth.sock,target=/run/host-services/ssh-auth.sock -e SSH_AUTH_SOCK=/run/host-services/ssh-auth.sock'
```

### Options

```
      --envoy-options stringArray                 Run Envoy using extra cli options
      --envoy-path string                         Use a custom Envoy binary
      --envoy-version string                      Use a particular Envoy release provided by getenvoy.io. For a list of available releases run "getenvoy list"
      --example string                            Name of the example to run (default "default")
      --extension-config-file string              Use a custom extension config
      --extension-file string                     Use a pre-built *.wasm file
  -h, --help                                      help for run
      --toolchain string                          Name of the toolchain to use, e.g. "default" toolchain that is backed by a Docker build container (default "default")
      --toolchain-container-image string          Run build container using given image
      --toolchain-container-options stringArray   Run build container using extra Docker cli options
```

### Options inherited from parent commands

```
      --home-dir string   GetEnvoy home directory (location of downloaded artifacts, caches, etc) (default "$HOME/.getenvoy")
      --no-colors         disable colored output
      --no-prompt         disable automatic switching into interactive mode whenever a parameter is missing or not valid
```

### SEE ALSO

* [getenvoy extension](/reference/getenvoy_extension)	 - Delve into Envoy extensions.

