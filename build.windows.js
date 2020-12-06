var Q = require('q');
var childProcess = require('child_process');
var asar = require('asar');
var jetpack = require('fs-jetpack');
var projectDir;
var buildDir;
var setupDir;
var manifest;
var appDir;

function init() {
    // Project directory is the root of the application
    projectDir = jetpack;
    // Build directory is our destination where the final build will be placed 
    buildDir = projectDir.dir('./dist/windows', {
        empty: true
    });
    // angular application directory 
    appDir = projectDir.dir('./build');
    setupDir = projectDir.dir('./dist');
    // angular application's package.json file 
    manifest = appDir.read('./package.json', 'json');
    console.log("Starting distribution setup of " + manifest.name + " in " + buildDir.path())
    return Q();
}

function copyElectron() {
    console.log('- Copying electron: ' + projectDir.path())
    return projectDir.copyAsync('./node_modules/electron-prebuilt/dist', buildDir.path(), {
        overwrite: true
    });
}

function cleanupRuntime() {
    return buildDir.removeAsync('resources/default_app.asar');
}

function createAsar() {
    console.log("- Creating asar");
    var deferred = Q.defer();
    asar.createPackage(appDir.path(), buildDir.path('resources/app.asar'), function () {
        deferred.resolve();
    });
    return deferred.promise;
}

function updateResources() {
    var deferred = Q.defer();

    console.log("- Update resources");
    projectDir.copy(appDir.path(), buildDir.path("resources"), { matching: '**/*.*', overwrite: true });
    // Copy your icon from resource folder into build folder.
    projectDir.copy('resources/windows/icon.ico', buildDir.path('icon.ico'));
    projectDir.copy('resources/windows/banner.bmp', buildDir.path('banner.bmp'));

    console.log("- Update exe");
    // Replace Electron icon for your own.
    var rcedit = require('rcedit');
    rcedit(buildDir.path('electron.exe'), {
        // 'icon': projectDir.path('resources/windows/icon.ico'),
        'icon': buildDir.path('icon.ico'),
        'version-string': {
            'ProductName': manifest.name,
            'FileDescription': manifest.description,
        }
    }, function (err) {
        if (undefined != err){
            console.log("- Update resources rcedit err: " + err);
        }
        if (!err) {
            deferred.resolve();
        }
    });
    return deferred.promise;
}

//Rename the electron exe 
function rename() {
    console.log("- Rename exe");
    return buildDir.renameAsync('electron.exe', manifest.name + '.exe');
}

function createInstaller() {
    var deferred = Q.defer();

    console.log("- Creating " + manifest.name + "-win32-setup.exe installer in " + setupDir.path())
    function replace(str, patterns) {
        Object.keys(patterns).forEach(function (pattern) {
            console.log("  * " + pattern + ": " + patterns[pattern])
            var matcher = new RegExp('{{' + pattern + '}}', 'g');
            str = str.replace(matcher, patterns[pattern]);
        });
        return str;
    }

    var installScript = projectDir.read('resources/windows/installer.nsi');

    installScript = replace(installScript, {
        name: manifest.name,
        productName: manifest.name,
        version: manifest.version,
        src: buildDir.path(),
        dest: setupDir.path(manifest.name + "-win32-setup.exe"),
        icon: buildDir.path('icon.ico'),
        setupIcon: buildDir.path('icon.ico'),
        banner: buildDir.path('banner.bmp'),
    });
    buildDir.write('installer.nsi', installScript);

    var nsis = childProcess.spawn('c:\\Program Files (x86)\\NSIS\\makensis.exe', [buildDir.path('installer.nsi')], {
        stdio: 'inherit'
    });

    nsis.on('error', function (err) {
        if (err.message === 'spawn makensis ENOENT') {
            throw "Can't find NSIS. Are you sure you've installed it and"
            + " added to PATH environment variable?";
        } else {
            throw err;
        }
    });

    nsis.on('close', function () {
        deferred.resolve();
    });

    return deferred.promise;
}

function build() {
    return init()
        .then(copyElectron)
        .then(cleanupRuntime)
        .then(createAsar)
        .then(updateResources)
        .then(rename);
}

module.exports = {
    build: build,
    createInstaller: createInstaller
};
