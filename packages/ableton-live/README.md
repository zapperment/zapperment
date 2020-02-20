# Ableton Live

Python scripts used to control Ableton Live with Zapperment. Installation is
done using Yarn scripts.

## Prerequisites

Before running the scripts, you need to figure out where the directory for the
Ableton Live MIDI Remote Scripts is located on your local file system. It's a
subdirectory of where Live is installed.

Example for macOS, Ableton Live 10 Lite:

- _/Applications/Ableton Live 10 Lite.app/Contents/App-Resources/MIDI Remote
  Scripts_

After you found the file path, use the `export` command on your shell to set an
environment variable to this path, like this, for example:

```
export MIDI_REMOTE_SCRIPTS_DIR="/Applications/Ableton Live 10 Lite.app/Contents/App-Resources/MIDI Remote Scripts"
```

## Installing the MIDI Remote Script

You can then run the `install-live` script to install the MIDI Remote Script for
Zapperment:

```
yarn install-live
```

## Running Install Steps Separately

`install-live` executes the build steps `clean`, `compile` and `deploy` in one
go. You can also run the steps individually.

To clean up build-time files (`dist` directory) and remove the MIDI Remote
Script from Ableton Live:

```
yarn clean
```

To compile the Python source code files to the `dist` directory:

```
yarn compile
```

To copy the compiled Python files over to the MIDI Remote Scripts directory of
Ableton Live:

```
yarn deploy
```

## Running in Watch Mode (Mac only)

On macOS, you can run a watch mode that automatically re-installs the MIDI
Remote Script when changes in the source code are detected.

To be able to do this, install `fswatch` via Homebrew:

```
brew install fswatch
```

You can then run this Yarn script:

```
yarn watch
```
