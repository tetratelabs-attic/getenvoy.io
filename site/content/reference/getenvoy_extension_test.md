+++
title = "getenvoy extension test"
type = "reference"
parent = "extension"
command = "test"
+++
## getenvoy extension test

Unit test Envoy extension.

### Synopsis


Run unit tests on Envoy extension.

```
getenvoy extension test [flags]
```

### Examples

```

  # Run unit tests on Envoy extension using default toolchain (Docker build container)
  getenvoy extension test

  # Run unit tests on Envoy extension using Docker build container with extra options
  getenvoy extension test --toolchain-container-options '-e VAR=VALUE -v /host/path:/container/path'

  # Run unit tests on Envoy extension using Docker build container with SSH agent forwarding enabled (Docker for Mac)
  getenvoy extension test --toolchain-container-options '--mount type=bind,src=/run/host-services/ssh-auth.sock,target=/run/host-services/ssh-auth.sock -e SSH_AUTH_SOCK=/run/host-services/ssh-auth.sock'
```

### Options

```
  -h, --help                                      help for test
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

