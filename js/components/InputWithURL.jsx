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

    handleSellerInputChange = (e) => {
        if (typeof this.props.searchSeller === "function") {
            this.props.searchSeller(e.target.value);
        } 
    }


    handleClick = () => {
        if (typeof this.props.fetchItems === "function") {
            this.props.fetchItems();
        } 
    }

    handleClickImg = (clickValue) => {
        if (typeof this.props.clickImg === "function") {
            this.props.clickImg(clickValue);
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

    handleCheckboxCategoryChange = (categoryValue) => {
        if (typeof this.props.changeCategory === "function") {
            this.props.changeCategory(categoryValue);
        } 
    }

    render () {
        return (
            <div className="firstContainer">
                <input className="inputStyle" type="text" value={this.props.filterItem} placeholder={this.props.placeholderField} id="filterItem" onChange={e => this.handleInputChange(e)}/>
                <input className="inputStyle" type="text" value={this.props.sellerThree} placeholder={this.props.placeholderSellerField} id="sellerThree" list="sellerList" onChange={e => this.handleSellerInputChange(e)}/>
                    <datalist id="sellerList">
                        <option>buddyandselly</option>
                        <option>familiare-store</option>
                        <option>ubup</option>
                    </datalist>
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
                    <div className="categoryParam">
                        <label>
                            <input type="radio" checked={this.props.categoryId===""} onChange={e => this.handleCheckboxCategoryChange("")}/>
                            <span></span>ALL
                        </label>
                        <label>
                            <input type="radio" checked={this.props.categoryId==="&categoryId=15724"} onChange={e => this.handleCheckboxCategoryChange("&categoryId=15724")}/>
                            <span></span>DAMEN
                        </label>
                        <label>
                            <input type="radio" checked={this.props.categoryId==="&categoryId=1059"} onChange={e => this.handleCheckboxCategoryChange("&categoryId=1059")}/>
                            <span></span>HERREN
                        </label>
                        <label>
                            <input type="radio" checked={this.props.categoryId==="&categoryId=171146"} onChange={e => this.handleCheckboxCategoryChange("&categoryId=171146")}/>
                            <span></span>KINDER
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
                    <input type="button" value= { this.props.show ? "HIDE IMG" : "SHOW IMG" } id="imgButton" className="btn-img" onClick={e => this.handleClickImg("{{backgroundImage: `url(${item.galleryURL})`}}")}></input>
                </div>
            </div>
        );
    };
};

export default InputWithURL;