const fs = require("fs");

const data = fs.readFileSync("./problem1input").toString().split("\r\n");

const directories = {};
const fileSystemSize = 70000000;
const updateRequiredSize = 30000000;

class Directory {
  constructor(name, childDirectories = [], files = [], parent = null) {
    this.name = name;
    this.childDirectories = childDirectories;
    this.files = files;
    this.parent = parent;
    this.filesSize = files.reduce((sum, file) => sum + file.size, 0);
  }

  addFile(file) {
    this.files.push(file);
    this.filesSize += file.size;
  }

  totalSize() {
    return this.filesSize + this.childDirectories.reduce((sum, directory) => sum + directory.totalSize(), 0);
  }

  childDirectoryNames() {
    return this.childDirectories.map((directory) => directory.name);
  }

  fileNames() {
    return this.files.map((file) => file.name);
  }

  addDirectory(directory) {
    this.childDirectories.push(directory);
  }
}

class File {
  constructor(name, size) {
    this.name = name;
    this.size = size;
  }
}

const populateDirectories = () => {
  let currentDirectory = null;
  let currentWorkingPath = "";

  for (const outputString of data) {
    const outputArray = outputString.split(" ");
    if (outputArray[0] === "$" && outputArray[1] === "ls") continue;
    if (outputArray[0] === "$" && outputArray[1] === "cd") {
      let nextDirectory;
      if (outputArray[2] === ".." && currentDirectory.parent) {
        nextDirectory = currentDirectory.parent;
        currentWorkingPath = currentWorkingPath.substring(0, currentWorkingPath.lastIndexOf("/"));
      } else {
        if (outputArray[2] === "/") currentWorkingPath = "/";
        else currentWorkingPath = currentWorkingPath + (currentWorkingPath === "/" ? "" : "/") + outputArray[2];
        if (!directories[currentWorkingPath]) {
          nextDirectory = new Directory(currentWorkingPath, [], [], currentDirectory);
          directories[currentWorkingPath] = nextDirectory;
        } else nextDirectory = directories[currentWorkingPath];
      }
      currentDirectory = nextDirectory;
      continue;
    }

    if (outputArray[0] === "dir") {
      const path = currentWorkingPath + (currentWorkingPath === "/" ? "" : "/") + outputArray[1];
      const directory = new Directory(path, [], [], currentDirectory);
      if (!directories[path]) directories[path] = directory;
      if (currentDirectory.childDirectoryNames().indexOf(path) === -1) {
        currentDirectory.addDirectory(directory);
        directories[currentDirectory.name] = currentDirectory;
      }
      continue;
    }

    if (currentDirectory.fileNames().indexOf(outputArray[1]) !== -1) continue;
    const file = new File(outputArray[1], parseInt(outputArray[0]));
    currentDirectory.addFile(file);
  }
};

populateDirectories();

const currentSize = directories["/"].totalSize();
const fileSystemFreeSpace = fileSystemSize - currentSize;
const freedSpaceRequired = updateRequiredSize - fileSystemFreeSpace;
let closestDirectory = null;
let closestSize = currentSize;

for (const directory of Object.values(directories)) {
  const size = directory.totalSize();
  if (size > freedSpaceRequired && size < closestSize) {
    closestSize = size;
    closestDirectory = directory;
  }
}

console.log(closestDirectory, closestSize);
