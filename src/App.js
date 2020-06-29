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
      data: {
        name: 'empty',
        toggled: false,
        children: [],
      }
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
      const fileTree = new FileTree(directory[0]);
      fileTree.readDir(directory[0]);
      this.setState(() => ({ data: {children: fileTree.children, name: fileTree.path} }));
    }
  };

  render()  {
    const { data } = this.state;
    console.log(!!data.children.length);
    return (
      <div>
        <div>
          <Div id="element" className='file-tree popup'>
            <Treebeard
              data={data}
              onToggle={this.onToggle}
              decorators={{...decorators, Header}}
            />
          </Div>
          <div>
            <button className='btn btn-outline-secondary open-directory' onClick={this.handleOpenFolder}>Open Directory</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
