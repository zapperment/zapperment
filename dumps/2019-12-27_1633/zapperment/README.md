# Zapperment Dump 27<sup>th</sup> Dec 2019 16:33

* Contains 96 loops, created on “Hamburg in Autumn”
* Zapperment version 0.2.0-beta.0, branch “Grievous”.
* Used to implement normalization algorithms for neural network training.

## How to Restore

1. Change to the `dumps` directory
1. Delete existing data:<br>`mongo zapperment --eval "db.dropDatabase()"`
1. Import dump:<br>`mongorestore 2019-12-27_1633`
