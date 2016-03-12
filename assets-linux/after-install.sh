#!/bin/bash

# Link to the binary
ln -sf /opt/fcqueue/FatCatQueue /usr/local/bin/fcqueue

# Launcher icon
desktop-file-install /opt/fcqueue/fcqueue.desktop
