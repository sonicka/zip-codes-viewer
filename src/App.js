import React, {Component} from 'react';
import ZipCodesViewer from './containers/ZipCodesViewer/ZipCodesViewer'
import classes from './App.css';

class App extends Component {
    render() {
        return (
            <div className={classes.App}>
                <ZipCodesViewer/>
            </div>
        );
    }
}

export default App;
