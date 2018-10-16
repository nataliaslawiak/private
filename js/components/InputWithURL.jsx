import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
//import 'react-datepicker/dist/react-datepicker.css';

class InputWithURL extends React.Component {
    // Istotne jest przekazanie kontekstu, wszystko jako Fat Arrow, rowniez fetchItems()
    handleInputChange = (e) => {
        if (typeof this.props.searchItem === "function") {
            this.props.searchItem(e.target.value);
        } 
    }

    handleClick = () => {
        if (typeof this.props.fetchItems === "function") {
            this.props.fetchItems();
        } 
    }

    handleClickReset = () => {
        if (typeof this.props.resetSearch === "function") {
            this.props.resetSearch();
        } 
    }

    handleCheckboxChange = (conditionValue) => {
        if (typeof this.props.changeCondition === "function") {
            this.props.changeCondition(conditionValue);
        } 
    }

    render () {
        return (
            <div className="firstContainer">
                <input className="inputStyle" type="text" value={this.props.filterItem} placeholder={this.props.placeholderField} id="filterItem" onChange={e => this.handleInputChange(e)}/>
                <button className="buttonStyle" onClick={e => this.handleClick(e)}><i className="fas fa-search"></i></button>
                <button className="resetButton" onClick={e => this.handleClickReset(e)}><i className="fas fa-undo"></i></button>
                <div className="extraParam">
                    <div className="conditionParam">
                        <label>
                            <input type="radio" checked={this.props.conditionId==="1000"} onChange={e => this.handleCheckboxChange("1000")}/>
                            <span></span>NEW
                        </label>
                        <label>
                            <input type="radio" checked={this.props.conditionId==="3000"} onChange={e => this.handleCheckboxChange("3000")}/>
                            <span></span>USED
                        </label>
                    </div>
                    <div className="dateParam">
                        <p className="startEndDates">from:</p>
                        <DatePicker
                            selected={moment(this.props.startDate, "YYYY-MM-DD")}
                            onChange={this.props.startDataChange}
                        />
                        <p className="startEndDates">to:</p>
                        <DatePicker
                            selected={moment(this.props.endDate, "YYYY-MM-DD")}
                            onChange={this.props.endDataChange}
                        />
                    </div>
                </div>
            </div>
        );
    };
};

export default InputWithURL;