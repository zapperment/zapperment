# SAMPLE: FLAC streaming on Windows & Mac
# Input device on Windows
# you should find DShow device name by:
#   ffmpeg.exe -list_devices true -f dshow -i dummy
#input="dshow"
#device="audio=@device_cm_{33D9A762-90C8-11D0-BD43-00A0C911CE86}\wave_{D50ABAB1-D542-4F19-BB77-D12FADCAB889}"
# Input device on macOS
# setup a default device at System Preferences > Sound > Input
input="avfoundation"
device="none:default"

hostname="localhost"
password=Tz48%kv91
port=8000

# Latency: about 45 seconds
ffmpeg -f $input \
       -i $device \
       -c:a libopus \
       -vbr on \
       -b:a 22k \
       -content_type 'audio/ogg' \
       -vn \
       icecast://source:$password@$hostname:$port/stream.ogg

#channels=2
#samplerate=44100
## above 12 are not recommended
## if you have a slow hardware, set lower value.
#level=1
#stream_name="stream.aac"
#ffmpeg -f $input \
#       -i $device \
#       -ar $samplerate \
#       -ac $channels \
#       -c:a flac -compression_level $level \
#       -f ogg \
#       -content_type 'application/ogg' \
#       icecast://source:$password@$hostname:$port/$stream_name

#channels=2
#samplerate=44100
#stream_name="stream.aac"
#ffmpeg -f $input \
#       -i $device \
#       -ar $samplerate \
#       -ac $channels \
#       -c:a libfdk_aac -profile:a aac_he -vbr 2 \
#       -content_type 'audio/aac' \
#       -vn -f adts icecast://source:$password@$hostname:$port/$stream_name

