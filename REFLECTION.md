# Reflection
First off, I'd like to say that this is the "correct" level of takehome assignment. I've seen some that are far too complex, and some that are way too easy, so good job finding the right balance :)

## Language/stack selection
Upon seeing that the assignment involved a bunch of API requests and JSON, I immediately thought NodeJS. I haven't written Node in about 4 years, so I was a little rusty, but I brushed up on it pretty quick.

I installed the latest node/npm on my computer (Linux/Ubuntu 18.04). I started a simple node/express project, with ESLint as a linter to catch various errors.

See SETUP.md for further details on setting up the project.

## Requirements - thought process
The requirements were pretty straight-forward except for one subtle (but important) ambiguity: Can the data returned be "stale" or does it have to be fetched in real-time?

My initial solution returned whatever response was cached from the *previous request*. This had the nice advantage of returning a response immediately, since it just returned data that was already loaded in memory.

However after reading the words "All of them. **Right now**.", I decided that the request would have to be synchronous - i.e. it would have to go out and fetch all 3 APIs, then wait for all of them to complete before returning a response.

This forced me to learn Javascript Promises real quick - something that I have heard of plenty of times, but never really coded myself. It was a tad confusing at first but I got the hang of it. I know that I could've solved it with async/await as well (just syntatic sugar for Promises), but I decided to leave that for another day.

## Testing

### curlHelper.sh
For development-iteration testing, I created a very simple testing script: curlHelper.sh - it sits in a loop forever and simply performs a curl request to my server, and outputs pretty-printed JSON as the result. This allowed me to quickly iterate as I developed.

curlHelper.sh can also double as a (weak) integration-test suite. It's weak because it does not validate the response automatically - a human is needed to visually verfiy the results.

### Mocha
Since the project was so small, I decided there's no need for unit-tests: all the functions can be tested sufficiently using a proper integration test.

For proper integration testing, I researched online and found the combination of Mocha/Chai to be the best for this use case, and added a simple test file.

### Notes
- Should the need arise to add unit-tests, then Mocha can accommodate that quite well.
- I didn't test as many scenarios as would have been prudent: for example, checking the "API Error" in the return when an error is returned from the API, etc.