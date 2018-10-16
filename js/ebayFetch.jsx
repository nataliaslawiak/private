import React from 'react';
import ReactDOM from 'react-dom';
import DatePicker from 'react-datepicker';
//import moment from 'moment';
//import 'react-datepicker/dist/react-datepicker.css';

//Komponenty
import InputWithURL from './components/InputWithURL.jsx';
import AllStats from './components/AllStats.jsx';
import ChartItemsPerDay from './components/ChartItemsPerDay.jsx';
import ChartRevenuePerDay from './components/ChartRevenuePerDay.jsx';
import TableHeader from './components/TableHeader.jsx';
import TableItems from './components/TableItems.jsx';
import TableFooter from './components/TableFooter.jsx';


//Dodatkowe moduly (Statystyka, Chart)
var sm = require('statistical-methods');
import Chart from 'chart.js';
var moment = require('moment');

//&itemFilter.name=EndTimeSoonest
//&itemFilter.value=true
//&itemFilter.name=HideDuplicateItems
//&itemFilter.value=true
//&itemFilter.name=SoldItemsOnly
//&itemFilter.value=true
//&itemFilter.name=ListingType
//&itemFilter.value=FixedPrice
//&itemFilter.name=EndTimeTo
//&itemFilter.value=2018-04-20T08:39:31.000Z

// URL Wejsciowe
//&itemFilter(5).name=Seller
//&itemFilter(5).value=buddyandselly
function prepareUrl(params) {
    return `http://svcs.ebay.com/services/search/FindingService/v1
    ?OPERATION-NAME=findCompletedItems
    &SERVICE-VERSION=1.0.0
    &SECURITY-APPNAME=MichalKr-Test-PRD-e5d80d3bd-41bbd681
    &GLOBAL-ID=EBAY-DE
    &RESPONSE-DATA-FORMAT=JSON
    &callback=_cb_findCompletedItems
    &REST-PAYLOAD
    &keywords=${params.filterItem.split(" ").join("+")}
    &itemFilter(0).name=Condition
    &itemFilter(0).value=${params.conditionId}
    &itemFilter(1).name=EndTimeFrom
    &itemFilter(1).value=${params.startDate}T00:01:01.000Z
    &itemFilter(2).name=EndTimeTo
    &itemFilter(2).value=${params.endDate}T23:59:01.000Z
    &itemFilter(3).name=SoldItemsOnly
    &itemFilter(3).value=true
    &itemFilter(4).name=LocatedIn
    &itemFilter(4).value=DE
    &paginationInput.entriesPerPage=100
    &paginationInput.pageNumber=${params.pageNumber}
    &outputSelector(0)=CategoryHistogram
    &outputSelector(1)=SellerInfo`.replace(/ /g,'');       
}

class EbayApi extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            itemList: [],
            queryParams: {
                placeholderField: "Search items...",
                pageNumber: 1,
                totalPages: 100,
                filterItem: "",
                conditionId: "3000",
                startDate: moment().add(-10, "days").format("YYYY-MM-DD"),
                endDate: moment().add(-1, "days").format("YYYY-MM-DD"),
            },
        };
    }
   
    // Metody dla komponentu InputWithURL
    searchItem = (filterItem) => {
        this.setState({
            queryParams: {
                ...this.state.queryParams,
                filterItem,
            }
        }); 
    }

    resetSearch = () => {
        this.setState({
            loading: false,
            itemList: [],
            queryParams: {
                placeholderField: "Search items...",
                pageNumber: 1,
                totalPages: 100,
                filterItem: "",
                conditionId: "3000",
                startDate: moment().add(-30, "days").format("YYYY-MM-DD"),
                endDate: moment().add(-1, "days").format("YYYY-MM-DD"),
            },
        }); 
    }

    changeCondition = (conditionValue) => {
        this.setState({
            queryParams: {
                ...this.state.queryParams,
                conditionId: conditionValue,
            }
        }); 
    }

    startDataChange = (date) => {
        this.setState({
          queryParams: {
            ...this.state.queryParams,
            startDate: date.format("YYYY-MM-DD"),
          }  
        });
    }

    endDataChange = (date) => {
        this.setState({
          queryParams: {
            ...this.state.queryParams,
            endDate: date.format("YYYY-MM-DD"),
          }  
        });
    }

    // Main Fetch
    fetchItems = () => {
        this.setState({
            loading: true,
        });
        fetch(prepareUrl(this.state.queryParams))
            .then(resp => resp.text())
            // Response w formacie text, przygotowanie pod JSON.parse
            .then(data => JSON.parse(data.slice(57).slice(0, -2))[0])
            .then(data => {
                // Dane artykulow w items, dane do paginacji w totalPages
                const items = data.searchResult[0].item;
                const totalPages = Number(data.paginationOutput[0].totalPages[0]);
                console.log(moment(this.state.queryParams.startDate._d).format("YYYY-DD-MM"));
                if (this.state.queryParams.pageNumber<totalPages) {
                    this.setState({
                        itemList: [...this.state.itemList, ...items],
                        queryParams: {
                            ...this.state.queryParams,
                            pageNumber: this.state.queryParams.pageNumber + 1,
                            totalPages: totalPages,
                        },
                    }, () => this.fetchItems());
                } else {
                    this.setState({
                        loading: false,
                        itemList: [...this.state.itemList, ...items],
                        //pageNumber: 1,
                    });
                };
            })
            .catch(() => {
                this.setState({
                    loading: false,
                    title: "Error"
                });
            });
    };

    //Metody do tworzenia TableItems
    createTableItems = () => {
        const {loading, itemList, queryParams} = this.state;
        return (
            itemList.map((item, index) => {
                return (
                    <tr key={index+1}>
                            <td>{index+1}</td>
                            <td className="textToLeft">{item.title}</td>
                            <td>{(Number(item.sellingStatus[0].currentPrice[0].__value__)).toFixed(2)}</td>
                            <td>{(Number(item.shippingInfo[0].shippingServiceCost[0].__value__)).toFixed(2)}</td>
                            <td>{((Number(item.shippingInfo[0].shippingServiceCost[0].__value__)) + (Number(item.sellingStatus[0].currentPrice[0].__value__))).toFixed(2)}</td>
                            <td>{item.sellingStatus[0].sellingState=="EndedWithSales" ? "Sold" : "Not"}</td>
                            <td>{item.listingInfo[0].listingType=="FixedPrice" ? "Fixed" : "Bid"}</td>
                            <td>{moment(item.listingInfo[0].endTime, moment.ISO_8601).format("MM-DD-YYYY")}</td>
                            <td>{item.sellerInfo[0].sellerUserName}</td>
                            <td><a href={"https://www.ebay.de/sch/i.html?_from=R40&_sacat=0&LH_Complete=1&_nkw=" + item.itemId} target="_blank"><i className="fas fa-external-link-alt"></i></a></td>
                    </tr>
                )}
            )
        );
    };

    //Metody do tworzenia AllStats
    sumAllPrices = () => {
        return (
            this.state.itemList
            .map(item => Number(item.sellingStatus[0].currentPrice[0].__value__))
            .reduce(function (accumulator, currentValue) {
                return accumulator + currentValue;
            }, 0)
        );  
    };

    sumAllPricesWithShipping = () => {
        return (
            this.state.itemList
            .map(item => Number(item.shippingInfo[0].shippingServiceCost[0].__value__) + Number(item.sellingStatus[0].currentPrice[0].__value__))
            .reduce(function (accumulator, currentValue) {
                return accumulator + currentValue;
            }, 0)
        );  
    };

    meanAll = () => {
        return sm.mean(this.createArrayWithPrices());
    }

    medianAll = () => {
        return sm.median(this.createArrayWithPrices());
    }

    rangeAll = () => {
        return sm.range(this.createArrayWithPrices());
    }

    stddevAll = () => {
        return (sm.stddev(this.createArrayWithPrices())/this.meanAll())*100
    }


    createArrayWithPrices = () => {
        return (
            this.state.itemList.map(item => Number(item.shippingInfo[0].shippingServiceCost[0].__value__) + Number(item.sellingStatus[0].currentPrice[0].__value__))
        );
    }

    createArrayWithRevenue = () => {
        return (
            Object.values(this.createItemsPerDay()).map(items => items.reduce(function (accumulator, item) {
                let result = accumulator + parseFloat(Number(item.shippingInfo[0].shippingServiceCost[0].__value__) + Number(item.sellingStatus[0].currentPrice[0].__value__));
                return result;
            }, 0).toFixed(2)
            )
        );
    }

    createItemsPerDay = () => {
        return (
            this.state.itemList.reduce((accObject,item) => {
                const day = moment(item.listingInfo[0].endTime, moment.ISO_8601).format("DD-MM-YYYY");
                    if (!accObject[day]) {
                        accObject[day] = [item];
                    } else {
                        accObject[day].push(item);
                    }
                return accObject;
            },{})
        );
    }


    render () {
           
        const {loading} = this.state;       
        return (
                <div className="mainContainer">
                    <div className="firstContainer">
                    <InputWithURL 
                        placeholderField={this.state.queryParams.placeholderField}
                        filterItem={this.state.queryParams.filterItem} 
                        searchItem={this.searchItem} 
                        fetchItems={this.fetchItems}
                        resetSearch={this.resetSearch}
                        conditionId={this.state.queryParams.conditionId}
                        changeCondition={this.changeCondition}
                        startDate = {this.state.queryParams.startDate}
                        endDate = {this.state.queryParams.endDate}
                        startDataChange = {this.startDataChange}
                        endDataChange = {this.endDataChange}
                    />
                </div>
                {(!loading && this.state.itemList.length===0) && 
                <p className="loadingParagraph">dawaj dane!</p>
                }
                {loading  && 
                    <div>
                        <div className="loading">
                            <div className="loading-bar"></div>
                            <div className="loading-bar"></div>
                            <div className="loading-bar"></div>
                            <div className="loading-bar"></div>
                        </div>
                        <p className="loadingParagraph">{((this.state.queryParams.pageNumber-1)*100/this.state.queryParams.totalPages).toFixed(2)} %</p>
                    </div>}
                {(!loading && this.state.itemList.length!==0) &&
                    <div>
                        <AllStats 
                            totalItems={this.createArrayWithPrices().length} 
                            totalItemsMean={(this.createArrayWithPrices().length/Object.values(this.createItemsPerDay()).length).toFixed(2)} 
                            mean={this.meanAll().toFixed(2)} 
                            median={this.medianAll().toFixed(2)} 
                            range={this.rangeAll().toFixed(2)} 
                            stddev={this.stddevAll().toFixed(2)}
                        />
                        <ChartItemsPerDay itemsPerDay={this.createItemsPerDay()} />
                        <ChartRevenuePerDay 
                            itemsPerDay={this.createItemsPerDay()} 
                            arrayWithRevenue={this.createArrayWithRevenue()} 
                        />
                        <table className="tableStyle">
                            <TableHeader />
                            <TableItems list={this.createTableItems()}/>
                            <TableFooter 
                            sum={this.sumAllPrices().toFixed(2)}
                            sumWithShipping={this.sumAllPricesWithShipping().toFixed(2)}
                            />
                        </table>
                    </div>}
            </div>
        )
    } 
 
};


const App = () => (
    <EbayApi />
);

document.addEventListener('DOMContentLoaded', function(){
    ReactDOM.render(
        <App/>,
        document.getElementById('app')
    );
});