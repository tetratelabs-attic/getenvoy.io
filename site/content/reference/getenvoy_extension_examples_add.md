+++
title = "getenvoy extension examples add"
type = "reference"
parent = "examples"
command = "add"
+++
## getenvoy extension examples add

Scaffold a new example setup.

### Synopsis


Scaffold a new example setup.

```
getenvoy extension examples add [flags]
```

### Examples

```

  # Scaffold the default example setup (named "default").
  getenvoy extension examples add

  # Scaffold an example setup with a given name.
  getenvoy extension examples add --name advanced
```

### Options

```
  -h, --help          help for add
      --name string   Example name, e.g. "default", advanced", "grpc-web", etc (default "default")
```

### Options inherited from parent commands

```
      --home-dir string   GetEnvoy home directory (location of downloaded artifacts, caches, etc) (default "$HOME/.getenvoy")
      --no-colors         disable colored output
      --no-prompt         disable automatic switching into interactive mode whenever a parameter is missing or not valid
```

### SEE ALSO

* [getenvoy extension examples](/reference/getenvoy_extension_examples)	 - Manage example setups.

