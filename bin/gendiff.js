#!/usr/bin/env node
import { program } from 'commander'
import fs from 'fs'
import * as _ from 'lodash-es';


program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format <type>', 'output format')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((path1, path2) => {

    console.log(genDiff(path1, path2));
    
  });
program.parse();


function genDiff(filepath1, filepath2){
  
    var files;

    if (!fs.existsSync(filepath1) && !fs.existsSync(filepath2)){
      files = 0;
    }
    else if (!fs.existsSync(filepath1)){
      files = 1;
    }
    else if (!fs.existsSync(filepath2)){
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

        const data1 = JSON.parse(fs.readFileSync(filepath1));
        const data2 = JSON.parse(fs.readFileSync(filepath2));
        const difference = _.keys(data1).filter(x => !_.keys(data2).includes(x)) .concat(_.keys(data2).filter(x => !_.keys(data1).includes(x)));

        var f = "{\n";

        for (const key1 in data1) {
          for (const key2 in data2) {
            if (key1 == key2){
              if (data1[key1] == data2[key2]){
                f += "  " + key1 + ': ' + data1[key1] + "\n"
                // console.log(key1 + ':', data1[key1]);
              }else{
                f += "- " + key1 + ': ' + data1[key1] + "\n"
                f += "+ " + key2 + ': ' + data2[key2] + "\n"
                // console.log("- " + key1 + ':', data1[key1]);
                // console.log("+ " + key2 + ':', data2[key2]);
              }
            }
        }
        }

        for (const key1 in data1) {
          if (difference[key1] == data2[key1]){
          f += "- " + key1 + ': ' + data1[key1] + "\n"
          // console.log("- " + key1 + ':', data1[key1]);
        }
          }

          for (const key2 in data2) {
          if (difference[key2] == data1[key2]){
          f += "+ " + key2 + ': ' + data2[key2] + "\n"
          // console.log("+ " + key2 + ':', data2[key2]);
        }
          }

        break;
    }
    f += "}";

    return f;

  }