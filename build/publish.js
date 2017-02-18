var fs = require('fs');
var path = require('path');
var { execSync } = require('child_process');
var spawn = require('./lib/spawn');
var os = require('os');
var ora = require('ora');
var chalk = require('chalk');
var logger = require('./lib/logger.js');

var cwd = path.join(__dirname, '../');
var verbose = true;
let dirpath = path.join(__dirname, '../dist');

function getSize(code) {
	return (code.length / 1024).toFixed(2) + 'kb';
};

var exec = function(command) {
    let args = command.split(/\s+/);
    let proc = args.shift();
    return spawn(proc, args, {
            cwd,
            verbose
        });
}

function git(command) {
    let args = command.split(/\s+/);
    if (args.shift() !== 'git') {
        let err = 'You must input the git command';
        console.error(err);
        return Promise.reject(err);
    } else {
        console.log('Ready to execute: ' + command);
        return spawn('git', args, {
            cwd,
            verbose
        });
    }
}

function write(dest, code) {
	return new Promise(function (resolve, reject) {
		let spinner = ora(`Writing file to ${dest} ...`).start();
		fs.writeFile(dest, code, function (err) {
			if (err) return reject(err);
			spinner.stop();
			logger.success(`Write file to ${chalk.blue.bold(dest)} succeed, file size: ${chalk.blue.bold(getSize(code))}.`);
			resolve(code);
		});
	});
};

let _exeSync = execSync;
execSync = function (cmd) {
	console.log(cmd);
	return _exeSync(cmd);
}


var args = {
	name: 'goumang2010',
	email: 'goumang2010@live.com',
	repo: {
		url: 'origin',
		branch: 'gh-pages'
	}
};

function setGit() {
    if (process.env.GH_REF) {
        var myrepo = 'https://' + process.env.GH_TOKEN + '@' + process.env.GH_REF;
        return Promise.all([git('git config user.name ' + args.name),
        git('git config user.email ' + args.email),
        git('git remote add myrepo ' + myrepo)]).then(() => {
            args.repo.url = 'myrepo';
            return git('git fetch myrepo');
        })
    } else {
        return Promise.resolve();
    }
}


function makeSubtree() {
	var spinner = ora(`Doing some preparation work ...`).start();
	console.log('...');
	var cleanSubtree = function() {
		if (fs.existsSync(dirpath)) {
			if (fs.readdirSync(dirpath).length > 1) {
				execSync(os.platform() === 'win32' ? `rd /q/s ${dirpath}` : `rm -rf ${dirpath}`);
				execSync(`git add -A && git commit -m "clean workspace for add subtree"`);
			} else {
				//empty folder
				fs.rmdirSync(dirpath);
			}
		}
	}
	try {
		cleanSubtree();
        spinner.stop();
		return git('git subtree add -P dist ' + args.repo.url + '/' + args.repo.branch);
	} catch (err) {
        spinner.stop();
		console.error('error happened: ' + err.message);
		if (err.message.indexOf('does not refer to a commit') !== -1) {
			execSync(`git subtree add -P dist HEAD --squash`);
			cleanSubtree();
		} else {
            return Promise.reject('Can not establish suntree');
		}
	}
	
}

function buildWeb() {
    return exec('npm run build')
    .then(() => Promise.all([write(path.join(dirpath, './CNAME'), "sql.chuune.cn"),
    write(path.join(dirpath, './TIMESTAMP'), Date.now())]))
}

function pushToGhPage() {
    return git('git add --all -f dist')
    .then(() => git('git commit -m build-gitpage'))
    .then(() => git('git subtree push -P builds/web ' + args.repo.url + ' ' + args.repo.branch))
}


setGit().then(() => makeSubtree()).then(() => buildWeb()).then(() => pushToGhPage())