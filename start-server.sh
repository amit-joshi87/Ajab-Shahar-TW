#!/bin/sh
pgrep -f platform-1.0-SNAPSHOT.jar | xargs kill -9
nohup java -jar platform-1.0-SNAPSHOT.jar server $1 > server.log &
