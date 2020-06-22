import React, { PureComponent } from 'react';
import { Treebeard, decorators } from 'react-treebeard';
import { includes } from 'lodash'
import { Header, Div } from './Header'
import FileTree from './Utilities/FileTree';

const remote = window.require('electron').remote;
const { dialog } = remote;

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: { id: 1,
      children: []},
      fileTree: null
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
    this.setState(() => ({cursor: node, data: Object.assign({}, data)}));
  }

  handleOpenFolder = () => {
    const directory = dialog.showOpenDialog({ properties: ['openDirectory']});
    if (directory && directory[0]){
      const fileTree = new FileTree(directory[0]);
      fileTree.build();
      this.state.data.toggled = false;
      this.state.data.name = fileTree.path;
      this.state.data.children = fileTree.children;
      this.setState({fileTree});
      //console.log(this.state.data.children.sort((a, b) => a.name > b.name ? 1 : -1));
    }
  };

  render()  {
    const { data, fileTree } = this.state;
    const fileData = fileTree ? <></> : null;
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
