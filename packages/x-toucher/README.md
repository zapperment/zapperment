# Zapperment X-Toucher

A command line utility that adds functionality to the Behringer X-Touch Mini MIDI controller.

## How to run

```
yarn start
```

## Instructions for developers 

### Running in development mode

To rerun the X-Toucher every time a source file is changed:

```
yarn dev
```

### Debugging

To produce debugging output on the command line, set the environment variable *DEBUG* before the *start* or *dev* command, example:

```
DEBUG=* yarn dev
```

The asterisk is a placeholder that matches any debug messages. If the output is too noisy, you can be more specific, example:

```
DEBUG=*x-toucher
```

This will only output debug statements from the X-Toucher's root module, but not from other modules, e.g. in *utils*.
