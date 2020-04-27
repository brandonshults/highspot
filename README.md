# A Highspot Coding Exercise Submission
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Installation
### Node and Yarn
This project has been developed with the latest LTS version of node (12.16.2) and yarn 1.13.0.  Node downloads can be found at https://nodejs.org/en/ and yarn v1 installation instructions can be found at https://classic.yarnpkg.com/en/docs/getting-started 

### Install Dependencies
Once the project has been cloned and node and yarn are available the dependencies required to run this project can be installed by issuing the command: ```yarn install``` from the project's root directory.

### Run in Development Mode
To run the project for development enter the command: ```yarn start```  This should launch a browser and navigate to the page.  If a browser doesn't automatically open, the project can be found by manually visiting http://localhost:3000/

### Run In Production Mode
To run the project in production mode enter the command ```yarn run start:production``` When the project is available to view, a message will be displayed listing the URL that it will be served from.
 
## Available Scripts
In addition to the standard run scripts, there are a number of scripts available to help with the development process

### Test
```yarn run test``` will run all tests included and start a watcher to re-run any necessary tests as development occurs

### Test With Coverage
```yarn run test:coverage``` will run all tests and provide a coverage report.  It does not start a watcher.

### Lint
```yarn run lint``` will check the project to make sure that all files meet a certain threshold of quality.  In particular it will check that style guidelines are followed, that prop-types are present, and provide a small level of accessibility auditing.

### Lint Autofix
```yarn run lint:fix``` will run the linter, but also attempt to fix any errors automatically.  It won't necessarily fix all errors.

## Attributions
- The images and data used to display the cards come from https://api.elderscrollslegends.io/.  From the docs at https://docs.elderscrollslegends.io/ they provide the following disclaimer: "The Elder Scrolls, The Elder Scrolls: Legends, ZeniMax, Bethesda, Bethesda Softworks and related logos are registered trademarks or trademarks of ZeniMax Media Inc. This website is not produced, endorsed, supported, or affiliated with ZeniMax Media Inc."
- The card video and its fallback image come from https://twitter.com/TheSmaxx/status/1189910703894872064
- http://colorsafe.co/ was used to generate a high-contrast color palette
- The loading spinner comes from https://loading.io/
- The stone background, header background, and favicon came from https://legends.bethesda.net/en/news

## TODO:
- Add more filters, status about the filters, and information explaining how the filters work.
- Improve accessibility.  I've used a high-contrast color scheme and verified accessibility with WAVE and the jsx-a11y eslint plugin, but that is a pretty low bar.
- Add more tests.  Coverage is pretty light, luckily most of the uncovered code are simple presentation components.
- Improve performance?  Certainly re-renders could potentially be avoided by separating the context into two separate contexts, in particular state should be in its own context.
- Re-examine supported browsers.
  - The create-react-app defaults of any browser with more than 0.2% seem reasonable, but maybe bundle sizes can be decreased and performance increased if fewer browsers are supported.
  - The api calls rely on fetch, which isn't polyfilled by babel like other features.  This will have to be changed if support for older browsers is desired.
- Improve handling of different statuses, the API docs provide a nice set of status codes and explanations.  For now though, when receiving a non-ok status, just throw an error and lump it in with errors thrown by fetch.
- Re-evaluate linting rules, especially where they have been disabled
- Add caching for the api responses, at least for local development, but also, possibly for offline browsing.