const remote = window.require('electron').remote;
const electronFs = remote.require('fs');

export default class FileInfo {
  constructor(path, name = null) {
    this.path = path;
    this.name = name;
    this.children = [];
  }
  
  readDir(path) {
    const fileArray = [];

    electronFs.readdir(path, (err, items) => {
      try {
        items.forEach((file) => {
          const fileData = new FileInfo(`${path}\\${file}`, file);
          const stat = electronFs.statSync(fileData.path);
          if (stat.isDirectory()) {
            fileData.children = this.readDir(fileData.path);
            fileArray.push({name: file, children: fileData.children, path});
          } else if (stat.isFile() && (/\.scs$/ig.test(file) || /\.gwf$/ig.test(file))) {
            fileArray.push({name: file, path});
          }
        })
      } catch (err) {
        console.log(err)
      }
    });
    setTimeout(_ => fileArray.sort(a => a.children ? -1 : 1));
    return this.children = fileArray;
  }
}




