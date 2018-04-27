import React from 'react';
import classes from './Controls.css'
import Aux from '../../hoc/Auxx/Auxx';
import Search from './Search/Search'
import Places from './Places/Places'
import History from './History/History'

const controls = (props) => {

    let size = props.size;

    return (
        <Aux>
            <div className={classes.topContent + " " + classes[size]}>
                <Search handleInput={props.handleInput}
                        handleSearch={props.handleSearch}
                        handleSelect={props.handleSelect}
                        size={props.size}/>
                <Places list={props.list} size={props.size} f={props.f}/>
                <History searched={props.searched} size={props.size} searchAgain={props.searchAgain}/>
            </div>
        </Aux>
    )
};

export default controls;