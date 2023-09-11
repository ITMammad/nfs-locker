#!/usr/bin/env node
const { Command } = require('commander');
const fs = require("node:fs");
const funcs = require('./funcs');

const program = new Command();
program.version('0.0.1');

program
	.command('enc <input> <output> <password>')
	.description('Encrypts A File With A Password.')
	.action((input, output, password) => {
		if (fs.existsSync(input)) {
			if (!fs.existsSync(output)) {
				funcs.encrypt(input, output, password);
			} else {
				console.log("Output Path That You Provided Is In Use...");
			}
		} else {
			console.log("Input File That You Provided Does Not Exists...");
		}
	});

program
	.command('dec <input> <output> <password>')
	.description('Decrypt A File With A Password.')
	.action((input, output, password) => {
		if (fs.existsSync(input)) {
			if (!fs.existsSync(output)) {
				funcs.decrypt(input, output, password);
			} else {
				console.log("Output Path That You Provided Is In Use...");
			}
		} else {
			console.log("Input File That You Provided Does Not Exists...");
		}
	});

program.parse(process.argv);