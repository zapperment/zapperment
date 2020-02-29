# Ableton Live

Python scripts to create an Ableton Live control surface, which can be used to
control Live with Zapperment. Compilation is done using Yarn scripts.

## Prerequisites

Before running the scripts, you need to figure out where the directory for the
Ableton Live MIDI Remote Scripts is located on your local file system. It's a
subdirectory of where Live is installed.

Example for macOS, Ableton Live 10 Lite:

- _/Applications/Ableton Live 10 Lite.app/Contents/App-Resources/MIDI Remote
  Scripts_

After you found the correct file path, use the `export` command on your shell to
set an environment variable to this path, like this, for example:

```
export MIDI_REMOTE_SCRIPTS_DIR="/Applications/Ableton Live 10 Lite.app/Contents/App-Resources/MIDI Remote Scripts"
```

## Creating a Zip File for Distribution

The control surface for Ableton Live is contained in the zip file
[zapperment-control-surface.zip](zapperment-control-surface.zip), along with
installation instructions.

To build this file, run this command:

```
yarn package
```

## Installing the MIDI Remote Script for Local Development

You can run the `install-live` script to install the control surface for
Zapperment directly from the Python sources without having to bundle the zip
file and unzip it again in the MIDI Remove Scripts directory:

```
yarn install-live
```

## Running Install Steps Separately

`install-live` executes the build steps `clean`, `compile` and `deploy` in one
go. You can also run the steps individually.

### Cleaning up

To clean up build-time files (`dist` directory) and remove the MIDI Remote
Script from Ableton Live:

```
yarn clean
```

To clean up only the `dist` directory:

```
yarn clean:dist
```

To clean up only the target directory (remove the Zapperment control surface
from Ableton Live's MIDI Remote Scripts):

```
yarn clean:target
```

### Compiling

To compile the Python source code files to the `dist` directory:

```
yarn compile
```

To copy the compiled Python files over to the MIDI Remote Scripts directory of
Ableton Live:

### Deploying

```
yarn deploy
```

## Additional Scripts for Local Development

### Checking Log Files

You can check the log files of Ableton Live, which is indispensable when
debugging the Python script as you work on it.

Before you run the log file script, set an environment variable pointing to the
location of Ableton Live's log files on your machine.

Example for macOS, Ableton Live 10 Lite:

- _~/Library/Preferences/Ableton/Live 10.1.7/Log.txt_

After you found the correct file path, use the `export` command on your shell to
set an environment variable to this path, like this, for example:

```
export ABLETON_LIVE_LOG_FILE="~/Library/Preferences/Ableton/Live 10.1.7/Log.txt"
```

You can now run the `logs` script like this:

```
yarn logs
```

This is using the `less` command “under the hood”, here are some tips for
viewing the log using key strokes:

- `gg` – skip to the beginning of the log file
- `G` – skip to the end of the log file
- `F` – follow mode, show lew log lines as they are written by Live (stop if
  with `Ctrl+C`)
- `/` – enter a search term
- `q` – exit the log file viewer
