+++
title = "getenvoy fetch"
type = "reference"
parent = "getenvoy"
command = "fetch"
+++
## getenvoy fetch

Retrieve Envoy binaries from GetEnvoy.

### Synopsis


Retrieves the referenced Envoy binary from GetEnvoy. The reference can be a full or partial reference.
A complete list of available builds can be retrieved using`getenvoy list`.

```
getenvoy fetch <reference> [flags]
```

### Examples

```
# Fetch using a partial manifest reference to retrieve a build suitable for your operating system.
getenvoy fetch standard:1.11.1
		
# Fetch using a full manifest reference to retrieve a specific build for Linux. 
getenvoy fetch standard:1.11.1/linux-glibc
```

### Options

```
  -h, --help   help for fetch
```

### Options inherited from parent commands

```
      --home-dir string   GetEnvoy home directory (location of downloaded artifacts, caches, etc) (default "$HOME/.getenvoy")
```

### SEE ALSO

* [getenvoy](/reference/getenvoy)	 - Fetch, deploy and debug Envoy

