import React from 'react';
import classes from './Search.css'

const search = (props) => {

    let size = props.size;
    return (
        <div className={[classes.search, classes[size]].join(' ')}>
            <select className={classes.select + " " + classes[size]} onChange={props.handleSelect} defaultValue="">
                <option value="" disabled>Select country</option>
                <option value="at">Austria</option>
                <option value="be">Belgium</option>
                <option value="bg">Bulgaria</option>
                <option value="cz">Czech Republic</option>
                <option value="hr">Croatia</option>
                <option value="dk">Denmark</option>
                <option value="de">Germany</option>
                <option value="hu">Hungary</option>
                <option value="is">Iceland</option>
                <option value="it">Italy</option>
                <option value="fi">Finland</option>
                <option value="fr">France</option>
                <option value="gb">Great Britain</option>
                <option value="gl">Greenland</option>
                <option value="nl">Holland</option>
                <option value="li">Liechtenstein</option>
                <option value="lt">Lithuania</option>
                <option value="lu">Luxembourg</option>
                <option value="mk">Macedonia</option>
                <option value="md">Moldavia</option>
                <option value="mc">Monaco</option>
                <option value="no">Norway</option>
                <option value="pl">Poland</option>
                <option value="pt">Portugal</option>
                <option value="sm">San Marino</option>
                <option value="sk">Slovak Republic</option>
                <option value="si">Slovenia</option>
                <option value="es">Spain</option>
                <option value="se">Sweden</option>
                <option value="ch">Switzerland</option>
                <option value="va">Vatican</option>
            </select>
            <input className={classes.input + " " + classes[size]} type="text" name="zip-code" placeholder="Enter zip-code"
                   onChange={props.handleInput}/>
            <button className={classes.button + " " + classes[size]} type="button" onClick={props.handleSearch}>Search</button>
        </div>
    )
};

export default search;
