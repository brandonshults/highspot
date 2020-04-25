This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Developed with the latest LTS version of node (12.16.2) and its bundled npm (6.14.4).  Tested to work with versions as early as node 10.3.0 and npm 6.1.0

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Attributions
- The images and data used to display the cards come from https://api.elderscrollslegends.io/.  From the docs at https://docs.elderscrollslegends.io/ they provide the following disclaimer: "The Elder Scrolls, The Elder Scrolls: Legends, ZeniMax, Bethesda, Bethesda Softworks and related logos are registered trademarks or trademarks of ZeniMax Media Inc. This website is not produced, endorsed, supported, or affiliated with ZeniMax Media Inc."
- The card video and its fallback image come from https://twitter.com/TheSmaxx/status/1189910703894872064
- http://colorsafe.co/ was used to generate a high-contrast color palette
- The loading spinner comes from https://loading.io/
- The stone background, header background, and favicon came from https://legends.bethesda.net/en/news

## TODO:
- Improve accessibility.  I've used a high-contrast color scheme and verified accessibility with WAVE and the jsx-a11y eslint plugin, but that is a pretty low bar.
- Add more tests.
- Re-examine supported browsers.
  - The create-react-app defaults of any browser with more than 0.2% seem reasonable, but maybe bundle sizes can be decreased and performance increased if fewer browsers are supported.
  - The api calls rely on fetch, which isn't polyfilled by babel like other features.  This will have to be changed if support for older browsers is desired.
- Improve handling of different statuses, the API docs provide a nice set of status codes and explanations.  For now though, when receiving a non-ok status, just throw an error and lump it in with errors thrown by fetch.
- Deal with unknown actions in the reducer better than just throwing an error.
- Re-evaluate linting rules, especially where they have been disabled
- Add caching for the api responses, at least for local development, but also, possibly for offline browsing.