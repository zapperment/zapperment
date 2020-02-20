# Ableton Live

Python scripts used to control Ableton Live with Zapperment. Installation is
done using npm scripts.

Before running the scripts, you need to figure out where the directory for the
Ableton Live MIDI Remote Scripts is located on your local file system. It's a
subdirectory of where Live is installed.

Example for macOS, Ableton Live 10 Lite:

- /Applications/Ableton Live 10 Lite.app/Contents/App-Resources/MIDI Remote
  Scripts

After you found the file path, use the `export` command on your shell to set an
environment variable to this path, like this, for example:

```
export MIDI_REMOTE_SCRIPTS_DIR="/Applications/Ableton Live 10 Lite.app/Contents/App-Resources/MIDI Remote Scripts"
```

You can then run the `install-live` script to install the MIDI Remote Script for
Zapperment:

```
npm run install-live
```

This executes the build steps `clean`, `compile` and `deploy` in one go. You can
also run the steps individually.

To clean up build-time files (`dist` directory) and remove the MIDI Remote
Script from Ableton Live:

```
npm run clean
```

To compile the Python source code files to the `dist` directory:

```
npm run compile
```

To copy the compiled Python files over to the MIDI Remote Scripts directory of
Ableton Live:

```
npm run deploy
```
