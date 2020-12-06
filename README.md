# README #

## What is this repository for ##

* This is the **Atrium SDK demo and documentation** to connect to the **Atrium SDK server** hosted on the Atrium hardware platform (A22). It consists in a series of *AngularJS* files that could be embedded into a web client application or packaged as a stand-alone installer using *Electron*.
* Version 1.0.0
* Link to the [SDK Documentation and Demo](https://mrdltd.atlassian.net/wiki/display/PUB/SDK+Documentation+and+Demo)

### How do I get set up ###

#### Dependencies ####

* [Visual code](https://code.visualstudio.com/download)
* [node.js](https://nodejs.org/en/)
* NSIS: executable included in this repo under [resources/tools/nsis-3.01-setup.exe](./resources/tools/nsis-3.01-setup.exe)

#### Setup ####

* Clone the repository from [bitbucket.org:team_mrd/d004_atrium_sdk_web](https://bitbucket.org/team_mrd/d004_atrium_sdk_web/)

* From the visual code terminal

> `cd /path/to/this/repo/`
>
> `npm install npm@latest -g`
>
> `npm install`
>
> `npm install gulp -g`

#### How to run tests ####

 Express

> * In VS Code, open `File` -> `Preferences` -> `Settings` (this should open `settings.json`). In the file, search for `Express configuration` -> `"express.portNumber"`. Edit the port value by clicking on the pen icon at the left of the port setting. This will open your personal `User settings` file. Change the `"express.portNumber"` to "49506".
>
> * Press `F1` then type `Express: Host Current Workspace`.
>
> * Press `F5` to start *Visual code* debugging along with *Chrome* web browser.

 Electron

> * Type `gulp run` (or `CTRL+SHIFT+B`) to start debugging the app with *Electron*.
>
> * Type `gulp run-build` to start *Electron* in the build folder and validate build package (pre-distribution).
>
> * Type `gulp run-dist` to start *Electron* in the dist folder and validate distribution package.
>
> * Type `CTRL+ALT+I` to toggle *Electron* console mode. Same as `F12` in *Chrome*.
>
> * Uncomment this line from main.js to always start *Electron* in debug mode.
> ```javascript
> // mainWindow.webContents.openDevTools()
> ```
> ***Don't forget to comment it back before distribution.***

#### Deployment instructions ####

From the visual code terminal

> `gulp build-installer` to build the distribution and the windows installer. The installer is located in [./dist](./dist)
>
> `gulp build-electron` to build the distribution only without the installer. The distribution files are located in [./dist/windows](./dist/windows)

#### Other available GULP tasks ####

> `gulp uglify` to build and uglify the app files. The files are located in [./build](./build)
>
> `gulp build` to build the app files. The files are located in [./build](./build)
>
> `gulp clean` to delete the content of the [./build](./build) folder.
>
> `gulp clean-dist` to delete the content of the [./dist/windows](./dist/windows) folder.

### Contribution guidelines ###

#### Directory structure guidelines ####

>       app/
>       - assets/
>       --- img/      // Images and icons for your app
>       --- css/      // All styles and style related files (SCSS or LESS files)
>       --- js/       // JavaScript files written for your app that are not for angular
>       --- libs/     // Third-party libraries such as jQuery, Moment, Underscore, etc.
>       - shared/   // acts as reusable components or partials of our site
>       --- sidebar/
>       ----- sidebarDirective.js
>       --- article/
>       ----- articleDirective.js
>       ----- sidebarView.html
>       ----- articleView.html
>       - components/   // each component is treated as a mini Angular app
>       --- home/
>       ----- homeController.js
>       ----- homeService.js
>       ----- homeView.html
>       --- blog/
>       ----- blogController.js
>       ----- blogService.js
>       ----- blogView.html
>       - app.js
>       - app.routes.js
>       - index.html
>       - main.js
>       - package.json
>       build/
>       node_modules/
>       dist/
>       - windows/
>       - installer-win32.exe
>       resources/
>       - tools/
>       - windows/
>       gulpfile.js
>       build.windows.js
>       package.json

#### File inclusion guidelines ####

> `<ng-include>` path should always start from the index.html position and should not include the app folder name.
>
> i.e.: `<ng-include src="'./components/sdk/objdef/objdef.html'"></ng-include>`

* Writing tests

* Code review

* Other guidelines

### Who do I talk to ###

* Repo owner or admin: [benoit@mrdltd.ca](mailto: benoit@mrdltd.ca)
* Other community or team contact: mrdltd

### FAQ ###

#### Error: rcedit.exe failed with exit code 1. Fatal error: Unable to commit changes ####

* `rcedit` cannot change the icon of the exe file if a **windows explorer** is currently displaying it. To allow the execution of `rcedit`, move your **windows explorer** to another folder location or simply shut it down.

#### Where to learn markdown ####

* [Learn Markdown](https://bitbucket.org/tutorials/markdowndemo)