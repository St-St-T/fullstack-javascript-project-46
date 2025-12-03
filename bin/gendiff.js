#!/usr/bin/env node
import { program } from 'commander'
import fs from 'fs'


program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format <type>', 'output format')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((path1, path2) => {

    var files;

    if (!fs.existsSync(path1) && !fs.existsSync(path2)){
      files = 0;
    }
    else if (!fs.existsSync(path1)){
      files = 1;
    }
    else if (!fs.existsSync(path2)){
      files = 2;
    }
    else{
      files = 3;
    }

    switch (files){
      case 0:
        console.log("Files not found");
        break;
      case 1:
        console.log("File 1 was not found");
        break;
      case 2:
        console.log("File 2 was not found");
        break;
      case 3:
        const data1 = JSON.parse(fs.readFileSync(path1));
        const data2 = JSON.parse(fs.readFileSync(path2));
        console.log(data1);
        console.log(data2);
        break;
    }

  });
program.parse()
