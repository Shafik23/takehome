# Reflection
First off, I'd like to say that this is the "correct" level of takehome assignment. I've seen some that are far too complex, and some that are way too easy, so good job finding the right balance :)

## Language/stack selection
Upon seeing that the assignment involved a bunch of API requests and JSON, I immediately thought NodeJS. I haven't written Node in about 4 years, so I was a little rusty, but I brushed up on it pretty quick.

I installed the latest node/npm on my computer (Linux/Ubuntu 18.04). I started a simple node/express project, with ESLint as a linter to catch various errors.

## Requirements - thought process
The requirements were pretty straight-forward except for one subtle (but important) ambiguity: Can the data returned be "stale" or does it have to be fetched in real-time?

## Testing
For development-testing, I created a very simple testing script: curlHelper.sh - it sits in a loop forever and simply performs a curl request to my server, and outputs pretty-printed JSON as the result. This allowed me to quickly iterate as I developed.