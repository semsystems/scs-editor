import React, { PureComponent } from 'react';
import { Treebeard, decorators } from 'react-treebeard';
import { includes } from 'lodash'
import { Header, Div } from './Header'
import FileInfo from './Utilities/FileInfo';

const remote = window.require('electron').remote;
const { dialog } = remote;

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        name: 'root',
        toggled: false,
        children: [],
      },
      fileInfo: null
    };
    this.onToggle = this.onToggle.bind(this);
    this.handleOpenFolder = this.handleOpenFolder.bind(this);
  }

  onToggle(node, toggled) {
    const {cursor, data} = this.state;
    if (cursor) {
      if (!includes(cursor.children, node)) cursor.active = false
    }
    node.active = true;

    if (node.children) {
      node.toggled = toggled;
      node.active = false;
    }
    this.setState(() => ({ cursor: node, data: Object.assign({}, data) }));
  }

  handleOpenFolder = () => {
    const directory = dialog.showOpenDialog({ properties: ['openDirectory']});
    if (directory && directory[0]){
      const fileInfo = new FileInfo(directory[0]);
      fileInfo.readDir(directory[0]);
      this.setState(() => ({ fileInfo, data: {children: fileInfo.children, name: fileInfo.path} }));
    }
  };

  render()  {
    const { data, fileInfo } = this.state;
    const fileData = fileInfo ? <></> : null;
    return (
      <div>
        {fileData ? (
          <div>
          <Div className='file-tree'>
            <Treebeard
              data={data}
              onToggle={this.onToggle}
              decorators={{...decorators, Header}}
            />
          </Div>
            <div id="filetree" className='code-space'>
              <button className='btn btn-outline-secondary' onClick={this.handleOpenFolder}>Open Folder</button>
            </div>
          </div>
        ) : (
          <div className='open-path'>
            <button className='btn btn-outline-secondary' onClick={this.handleOpenFolder}>Open Folder</button>
          </div>
          )}
      </div>
    );
  }
}

export default App;
