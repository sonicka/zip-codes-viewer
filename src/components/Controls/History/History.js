import React from 'react';
import classes from './History.css'

const history = (props) => {

    let size = props.size;
    let searchedRows = [];

    if (props.searched) {
        searchedRows = props.searched.map((item, index) => {
            return <tr key={index}>
                <td className={classes.centerRows} onClick={() => props.searchAgain(item)}>{item}</td>
            </tr>
        });
    }

    return (
        <div className={classes.history + " " + classes[size]}>
            <div className={classes.tableContainer + " " + classes[size]}>
                <table className={classes.tableWrapperHead  + " " + classes[size]}>
                    <thead>
                    <tr>
                        <th className={classes.centerHeader}>History of the last searches:</th>
                    </tr>
                    </thead>
                </table>
                <table className={classes.tableWrapperBody  + " " + classes[size]}>
                    <tbody>
                        {searchedRows}
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default history;
