+++
title = "getenvoy extension examples remove"
type = "reference"
parent = "examples"
command = "remove"
+++
## getenvoy extension examples remove

Remove example setup.

### Synopsis


Remove example setup.

```
getenvoy extension examples remove [flags]
```

### Examples

```

  # Remove example setup by name.
  getenvoy extension examples remove --name advanced
```

### Options

```
  -h, --help          help for remove
      --name string   Example name, e.g. "default", "advanced", "grpc-web", etc
```

### Options inherited from parent commands

```
      --home-dir string   GetEnvoy home directory (location of downloaded artifacts, caches, etc) (default "$HOME/.getenvoy")
      --no-colors         disable colored output
      --no-prompt         disable automatic switching into interactive mode whenever a parameter is missing or not valid
```

### SEE ALSO

* [getenvoy extension examples](/reference/getenvoy_extension_examples)	 - Manage example setups.

