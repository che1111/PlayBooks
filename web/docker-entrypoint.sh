#!/bin/sh
set -e

# Start OpenResty (Nginx with Lua)
exec openresty -g 'daemon off;'