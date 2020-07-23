+++
title = "getenvoy extension init"
type = "reference"
parent = "extension"
command = "init"
+++
## getenvoy extension init

Scaffold a new Envoy extension.

### Synopsis


Scaffold a new Envoy extension in a language of your choice.

```
getenvoy extension init [DIR] [flags]
```

### Examples

```

  # Scaffold a new extension in interactive mode.
  getenvoy extension init

  # Scaffold a new extension according to command options: Envoy HTTP filter, in Rust, with a given name, in the current working directory.
  getenvoy extension init --category envoy.filters.http --language rust --name mycompany.filters.http.custom_metrics

  # Scaffold a new extension according to command options: Envoy Access logger, in Rust, with a given name, in the "my-access-logger" directory.
  getenvoy extension init my-access-logger --category envoy.access_loggers --language rust --name mycompany.access_loggers.custom_log
```

### Options

```
      --category string   Choose extension category. One of: "envoy.filters.http", "envoy.filters.network", "envoy.access_loggers"
  -h, --help              help for init
      --language string   Choose programming language. One of: "rust"
      --name string       Choose extension name, e.g. "mycompany.filters.http.custom_metrics"
```

### Options inherited from parent commands

```
      --home-dir string   GetEnvoy home directory (location of downloaded artifacts, caches, etc) (default "$HOME/.getenvoy")
      --no-colors         disable colored output
      --no-prompt         disable automatic switching into interactive mode whenever a parameter is missing or not valid
```

### SEE ALSO

* [getenvoy extension](/reference/getenvoy_extension)	 - Delve into Envoy extensions.

