+++
title = "getenvoy extension push"
type = "reference"
parent = "extension"
command = "push"
+++
## getenvoy extension push

Push the built WASM extension to the OCI-compliant registry.

### Synopsis


Push the built WASM extension to the OCI-compliant registry. This command requires to lo
gin the target container registry with docker CLI

```
getenvoy extension push <image-reference> [flags]
```

### Examples

```

  # Push built WASM extension to the local docker registry.
  getenvoy extension push localhost:5000/test/image-name:tag
```

### Options

```
      --allow-insecure          allow insecure TLS communication with registry
      --extension-file string   Use a pre-built *.wasm file
  -h, --help                    help for push
      --toolchain string        Name of the toolchain to use, e.g. "default" toolchain t
hat is backed by a Docker build container (default "default")
      --use-http                Use HTTP for communication with registry
```

### Options inherited from parent commands

```
      --home-dir string   GetEnvoy home directory (location of downloaded artifacts, caches, etc) (default "$HOME/.getenvoy")
      --no-colors         disable colored output
      --no-prompt         disable automatic switching into interactive mode whenever a parameter is missing or not valid
```

### SEE ALSO

* [getenvoy extension](/reference/getenvoy_extension)	 - Delve into Envoy extensions.

