import React from 'react';
import classes from './Places.css'

const places = (props) => {

    let size = props.size;
    let transformedList = [];

    if (props.list) {
        transformedList = props.list.map((item, index) => {
            return (
                <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.lng}</td>
                    <td>{item.lat}</td>
                </tr>
            )
        });
    }

    return (
        <div className={classes.places + " " + classes[size]}>
            <div className={classes.tableContainer + " " + classes[size]}>
                <table className={classes.tableWrapperHead  + " " + classes[size]}>
                    <thead>
                    <tr>
                        <td>Place name</td>
                        <td>Longitude</td>
                        <td>Latitude</td>
                    </tr>
                    </thead>
                </table>
                <table className={classes.tableWrapperBody  + " " + classes[size]}>
                    <tbody>
                    {transformedList}
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default places;
