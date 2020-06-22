import React from 'react';

const remote = window.require('electron').remote;
const electronFs = remote.require('fs');

export default class FileTree {
  constructor(path, name = null){
    this.path = path;
    this.name = name;
    this.children = [];
  }

  build = () => {
    this.children = FileTree.readDir(this.path);
  };

  static readDir(path) {
    let fileArray = [];

    electronFs.readdir(path, (err, items) => {
      try {
        items.forEach((file) => {
          const fileInfo = new FileTree(`${path}\\${file}`, file);

          const stat = electronFs.statSync(fileInfo.path);
          if (stat.isDirectory()) {
            fileInfo.children = FileTree.readDir(fileInfo.path);
            //fileArray.unshift(fileInfo);
            const {name, children, path} = fileInfo;
            fileArray.push({name, children, path});
          } else if (/\.scs$/ig.test(fileInfo.name) || /\.gwf$/ig.test(fileInfo.name)) {
            const {name, path} = fileInfo;
            //delete fileInfo.children
            fileArray.push({name, path});
          }
        })
      } catch (err) {
        console.log(err)
      }
    });
    fileArray.filter(a => console.log(a))
    console.log(fileArray)
    return fileArray;
  }
}




