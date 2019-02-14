import React from 'react';
import ReactDOM from 'react-dom';
import DatePicker from 'react-datepicker';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import ReactToExcel from 'react-html-table-to-excel';
import ReactToExcelSeller from 'react-html-table-to-excel';
import { renderToStaticMarkup } from 'react-dom/server'
import $  from 'jquery';
import PropTypes from 'prop-types';
//import BootstrapTable from 'react-bootstrap-table-next';
//import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
//const { ExportCSVButton } = CSVExport;
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
import TableSeller from './components/TableSeller.jsx';
import TableWatchers from './components/TableWatchers.jsx';
import TablePrices from './components/TablePrices.jsx';



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
    &SECURITY-APPNAME=
    &GLOBAL-ID=EBAY-DE
    &RESPONSE-DATA-FORMAT=JSON
    &callback=_cb_findCompletedItems
    &REST-PAYLOAD
    ${params.categoryId}
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
    ${params.sellerOne}
    ${params.sellerTwo}
    ${params.sellerThree}
    &paginationInput.entriesPerPage=100
    &paginationInput.pageNumber=${params.pageNumber}
    &outputSelector(0)=SellerInfo`.replace(/ /g,'');       
}

const propTypes = {
    table: PropTypes.string.isRequired,
    filename: PropTypes.string.isRequired,
    sheet: PropTypes.string.isRequired,
    id: PropTypes.string,
    className: PropTypes.string,
    buttonText: PropTypes.string,
  };
  
  const defaultProps = {
    id: 'button-download-as-xls',
    className: 'button-download',
    buttonText: 'Download',
  };


  class ReactHTMLTableToExcel extends React.Component {
    constructor(props) {
      super(props);
      this.handleDownload = this.handleDownload.bind(this);
    }
  
    static base64(s) {
      return window.btoa(unescape(encodeURIComponent(s)));
    }
  
    static format(s, c) {
      return s.replace(/{(\w+)}/g, (m, p) => c[p]);
    }
  
    handleDownload() {
      if (!document) {
        if (process.env.NODE_ENV !== 'production') {
          console.error('Failed to access document object');
        }
  
        return null;
      }
  
      if (document.getElementById(this.props.table).nodeType !== 1 || document.getElementById(this.props.table).nodeName !== 'TABLE') {
        if (process.env.NODE_ENV !== 'production') {
          console.error('Provided table property is not html table element');
        }
  
        return null;
      }
  
      const table = document.getElementById(this.props.table).outerHTML;
      const sheet = String(this.props.sheet);
      const filename = `${String(this.props.filename)}.xls`;
  
      const uri = 'data:application/vnd.ms-excel;base64,';
      const template =
        '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-mic' +
        'rosoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta cha' +
        'rset="UTF-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:Exce' +
        'lWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/>' +
        '</x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></' +
        'xml><![endif]--></head><body>{table}</body></html>';
  
      const context = {
        worksheet: sheet || 'Worksheet',
        table,
      };
  
      // If IE11
      if (window.navigator.msSaveOrOpenBlob) {
        const fileData = [
          `${'<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-mic' + 'rosoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta cha' + 'rset="UTF-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:Exce' + 'lWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/>' + '</x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></' + 'xml><![endif]--></head><body>'}${table}</body></html>`,
        ];
        const blobObject = new Blob(fileData);
        document.getElementById('react-html-table-to-excel').click()(() => {
          window.navigator.msSaveOrOpenBlob(blobObject, filename);
        });
  
        return true;
      }
  
      const element = window.document.createElement('a');
      element.href =
        uri +
        ReactHTMLTableToExcel.base64(
          ReactHTMLTableToExcel.format(template, context),
        );
      element.download = filename;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
  
      return true;
    }
  
    render() {
      return (
        <button
          id={this.props.id}
          className={this.props.className}
          type="button"
          onLoad={this.handleDownload}
        >
          {this.props.buttonText}
        </button>
      );
    }
  }
  
  ReactHTMLTableToExcel.propTypes = propTypes;
  ReactHTMLTableToExcel.defaultProps = defaultProps;



class EbayApi extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            show: false,
            timeout: null,
            isClickable: false,
            itemList: [],
            categoryList: [],
            queryParams: {
                placeholderField: "Search items...",
                placeholderSellerField: "Search seller...",
                pageNumber: 1,
                totalPages: 100,
                filterItem: "fred perry",
                conditionId: "3000",
                categoryId: "",
                startDate: moment("2018-12-01").format("YYYY-MM-DD"),
                endDate: moment("2018-12-01").format("YYYY-MM-DD"),
                sellerOne:"",
                sellerTwo:"",
                sellerThree:"",

            },
        };
    }

    /*
        startDate: moment().add(-2, "days").format("YYYY-MM-DD"),
        endDate: moment().add(-1, "days").format("YYYY-MM-DD"),
    */ 
   
    // Metody dla komponentu InputWithURL
    searchItem = (filterItem) => {
        this.setState({
            queryParams: {
                ...this.state.queryParams,
                filterItem,
            }
        }); 
    }

    searchSeller = (sellerThree) => {
        this.setState({
            queryParams: {
                ...this.state.queryParams,
                sellerOne:"&itemFilter(5).name=Seller",
                sellerTwo:"&itemFilter(5).value=",
                sellerThree:sellerThree,
            }
        }); 
    }

    resetSearch = () => {
        const {timeout} = this.state;
        clearTimeout(timeout);
        console.log("reset");
        this.setState({
            loading: false,
            itemList: [],
            show: false,
            timeout: setTimeout(() => {this.tasker()}, 3000),
            isClickable: false,
            queryParams: {
                ...this.state.queryParams,
                placeholderField: "Search items...",
                placeholderSellerField: "Search seller...",
                pageNumber: 1,
                totalPages: 100,
                filterItem: "fred perry",
                conditionId: "3000",
                categoryId: "",
                startDate: moment(this.state.queryParams.startDate).add(1, 'days').format("YYYY-MM-DD"),
                endDate: moment(this.state.queryParams.endDate).add(1, 'days').format("YYYY-MM-DD"),
                sellerOne:"",
                sellerTwo:"",
                sellerThree:"",
            },
        });
    }


    /*
    startDate: moment().add(-2, "days").format("YYYY-MM-DD"),
    endDate: moment().add(-1, "days").format("YYYY-MM-DD"),
    */ 

    changeCondition = (conditionValue) => {
        this.setState({
            queryParams: {
                ...this.state.queryParams,
                conditionId: conditionValue,
            }
        }); 
    }

    changeCategory = (categoryValue) => {
        this.setState({
            queryParams: {
                ...this.state.queryParams,
                categoryId: categoryValue,
            }
        }); 
    }

    startDataChange = (date) => {
        this.setState({
          queryParams: {
            ...this.state.queryParams,
            startDate: moment("2018-12-01").format("YYYY-MM-DD"),
          }  
        });
    }

    //startDate: date.format("YYYY-MM-DD"),

    endDataChange = (date) => {
        this.setState({
          queryParams: {
            ...this.state.queryParams,
            endDate: moment("2018-12-01").format("YYYY-MM-DD"),
          }  
        });
    }

    //endDate: date.format("YYYY-MM-DD"),

/////TASKER

    taskerClick() {
        this.tasker();
    }

    tasker = () => {
        let interval;
        const {timeout} = this.state;
        clearTimeout(timeout);
        this.setState(({
            timeout: interval = setTimeout(() => {this.taskExport()}, 20000),
            queryParams: {
                ...this.state.queryParams,
                startDate: this.state.queryParams.startDate,
                endDate: this.state.queryParams.endDate,
            }
        }));
        if((moment(this.state.queryParams.endDate).isAfter("2018-12-31", "day"))){
            clearTimeout(interval);
            console.log("konczymy!");
        }else{
            this.fetchItemsTask();
        }
        
        console.log("tasker");
        console.log(moment(this.state.queryParams.startDate).format("YYYY-MM-DD"));
        
        
    }
    //(moment(this.state.queryParams.endDate).isSame("2018-10-31", "day"))

    taskExport = (e) => {
        console.log("export");
        const {timeout} = this.state;
        clearTimeout(timeout);
        this.setState(({
            timeout: setTimeout(() => {this.resetSearch()}, 10000),
            queryParams: {
                ...this.state.queryParams,
            }
        }));
        this.refs.child.handleDownload(); 
    }




  ////////  

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
                // Dane artykulow w items, dane do kategorii w categories, dane do paginacji w totalPages
                const items = data.searchResult[0].item;
                //const categories = data.categoryHistogramContainer[0].categoryHistogram;
                const totalPages = Number(data.paginationOutput[0].totalPages[0]);
                console.log(moment(this.state.queryParams.startDate._d).format("YYYY-DD-MM"));
                console.log("pierwszy fetch");
                if (this.state.queryParams.pageNumber<totalPages) {
                    this.setState({
                        itemList: [...this.state.itemList, ...items],
                        //categoryList: [...this.state.categoryList, ...categories],
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
                        //categoryList: [...this.state.categoryList, ...categories],
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

    //Tasker Fetch

    fetchItemsTask = () => {
        this.setState({
            loading: true,
        });
        fetch(prepareUrl(this.state.queryParams))
            .then(resp => resp.text())
            // Response w formacie text, przygotowanie pod JSON.parse
            .then(data => JSON.parse(data.slice(57).slice(0, -2))[0])
            .then(data => {
                // Dane artykulow w items, dane do kategorii w categories, dane do paginacji w totalPages
                const items = data.searchResult[0].item;
                const totalPages = Number(data.paginationOutput[0].totalPages[0]);
                console.log("drugi fetch");
                if (this.state.queryParams.pageNumber<totalPages) {
                    this.setState({
                        itemList: [...this.state.itemList, ...items],
                        queryParams: {
                            ...this.state.queryParams,
                            pageNumber: this.state.queryParams.pageNumber + 1,
                            totalPages: totalPages,
                        },
                    }, () => this.fetchItemsTask());
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

    clickImg = (clickValue) => {
        this.setState({
           show: !this.state.show
        });
    }

    //Metody do tworzenia TableItems
    createTableItems = () => {
        const {loading, itemList, queryParams, categoryList} = this.state;
        let keyword = this.state.queryParams.filterItem;
                
        return(
            itemList.map((item, index) => {
            
                //wartosc pola Kategoria
                let categoryItems;
                if (this.state.queryParams.categoryId === "&categoryId=15724"){
                    categoryItems = "Damen";
                }
                else if (this.state.queryParams.categoryId === "&categoryId=1059"){
                    categoryItems = "Herren";
                }
                else if (this.state.queryParams.categoryId === "&categoryId=171146"){
                    categoryItems = "Kinder";
                } else {
                    categoryItems = "Alle";
                }
    
                //wartosc pola Kategoria ebay
                const damenCategoryArray = [185080,185079,185082,155226,185083,185084,63862,63861,11554,63866,3009,169001,11555,63864,63865,63867,53159,63863,11522,45909,63853,11521,63854,63855,11530,11532,163586,15746,163593,4844];
                const herrenCategoryArray = [185075,185702,185076,155183,185708,57988,11483,11484,11510,57990,57991,185101,15687,15689,11511,3001,15690,57989,11507];
                const kinderCategoryArray = [51933,57916,77475,51946,84544,156790,15615,153564,51959,99754,51919,51920,152487,51960,51973,28016,15620,51580,51581,152554,77411,51582,175528,152719,99735,156801,15648,51583,153797,51584,51567,51568,175768,51585,51586,28017,15652];
                
                let ebayCategoryItems;
                if (damenCategoryArray.indexOf(Number(item.primaryCategory[0].categoryId[0])) > -1) {
                    ebayCategoryItems = "Damen";
                }
                else if(herrenCategoryArray.indexOf(Number(item.primaryCategory[0].categoryId[0])) > -1){
                    ebayCategoryItems = "Herren";
                }
                else if(kinderCategoryArray.indexOf(Number(item.primaryCategory[0].categoryId[0])) > -1){
                    ebayCategoryItems = "Kinder";
                } else {
                    ebayCategoryItems = "Irrelevant";
                }

                
    
            
                return (
                    <tr key={index+1}>
                            
                            <td className="textToLeft">{item.title}</td>
                            <td>{keyword}</td>
                            <td>{categoryItems}</td>
                            <td>{ebayCategoryItems}</td>
                            <td>{(Number(item.listingInfo[0].watchCount).toFixed(0)) >= 0 ? (Number(item.listingInfo[0].watchCount)) : 0}</td>
                            <td>{(Number(item.sellingStatus[0].currentPrice[0].__value__)).toFixed(2)}</td>
                            <td>{item.shippingInfo[0].shippingType[0]!=="NotSpecified" ? (Number(item.shippingInfo[0].shippingServiceCost[0].__value__).toFixed(2)) : 0.01}</td>
                            <td>{item.shippingInfo[0].shippingType[0]!=="NotSpecified" ? (Number(item.shippingInfo[0].shippingServiceCost[0].__value__) + Number(item.sellingStatus[0].currentPrice[0].__value__)).toFixed(2) : (Number(item.sellingStatus[0].currentPrice[0].__value__)).toFixed(2)}</td>
                            <td>{item.sellingStatus[0].sellingState=="EndedWithSales" ? "Sold" : "Not"}</td>
                            <td>{item.listingInfo[0].listingType=="FixedPrice" ? "Fixed" : "Bid"}</td>
                            <td>{moment(item.listingInfo[0].endTime, moment.ISO_8601).format("MM-DD-YYYY")}</td>
                            <td>{item.sellerInfo[0].sellerUserName}</td>
                            <td>{item.itemId}</td>
                            <td className="hide"><a href={"https://www.ebay.de/sch/i.html?_from=R40&_sacat=0&LH_Complete=1&_nkw=" + item.itemId} target="_blank"><i className="fas fa-external-link-alt"></i></a></td>
                    </tr>
                    )}
                )
            );
        
         }
        
  

    
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
            .map(item => item.shippingInfo[0].shippingType[0]!=="NotSpecified" ? (Number(item.shippingInfo[0].shippingServiceCost[0].__value__) + Number(item.sellingStatus[0].currentPrice[0].__value__)) : (Number(item.sellingStatus[0].currentPrice[0].__value__)))
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
            this.state.itemList.map(item => item.shippingInfo[0].shippingType[0]!=="NotSpecified" ? (Number(item.shippingInfo[0].shippingServiceCost[0].__value__) + Number(item.sellingStatus[0].currentPrice[0].__value__)) : (Number(item.sellingStatus[0].currentPrice[0].__value__)))
        );
    }

    //Watches

    sumAllWatches = () => {
        return (
            this.state.itemList
            .map(item => Number(item.listingInfo[0].watchCount) >= 0 ? (Number(item.listingInfo[0].watchCount)) : 0)
            .reduce(function (accumulator, currentValue) {
                return accumulator + currentValue;
            }, 0)
        );  
    };
    
    meanWatches = () => {
        return sm.mean(this.createArrayWithWatches());
    }

    medianWatches = () => {
        return sm.median(this.createArrayWithWatches());
    }
    
    createArrayWithWatches = () => {
        return (
            this.state.itemList.map(item => Number(item.listingInfo[0].watchCount) >= 0 ? (Number(item.listingInfo[0].watchCount)) : 0)
        );
    }

    //Charts

    createArrayWithRevenue = () => {
        return (
            Object.values(this.createItemsPerDay()).map(items => items.reduce(function (accumulator, item) {
                let result = accumulator + parseFloat(item.shippingInfo[0].shippingType[0]!=="NotSpecified" ? (Number(item.shippingInfo[0].shippingServiceCost[0].__value__) + Number(item.sellingStatus[0].currentPrice[0].__value__)) : (Number(item.sellingStatus[0].currentPrice[0].__value__)));
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
                /*console.log(accObject);*/
                
                return accObject;
            },{})
        );
    }

    sellerCount = () => {
        return (
            this.state.itemList.reduce((sellerObject,item) => {
                const sellerKey = item.sellerInfo[0].sellerUserName;
                    if (!sellerObject[sellerKey]) {
                        sellerObject[sellerKey] = [item];
                    } else {
                        sellerObject[sellerKey].push(item);
                    }
                    //console.log(sellerObject);
                return sellerObject;
            },{})
            
        );
    }

    watcherCount = () => {
       return (
            this.state.itemList.reduce((watcherObject,item) => {
                const watcherKey = item.itemId;
                    if (!watcherObject[watcherKey]) {
                        watcherObject[watcherKey] = [item];
                    } else {
                        watcherObject[watcherKey].push(item);
                        
                    }
                    //console.log(watcherObject);
                return watcherObject;
            },{})
            
        );
    }

  
    render () {
           
        const {loading} = this.state;     
        return (
                <div className="mainContainer">
                    <div className="firstContainerWrapper">
                    <InputWithURL 
                        placeholderField={this.state.queryParams.placeholderField}
                        placeholderSellerField={this.state.queryParams.placeholderSellerField}
                        filterItem={this.state.queryParams.filterItem}
                        sellerOne={this.state.queryParams.sellerOne}
                        sellerTwo={this.state.queryParams.sellerTwo} 
                        sellerThree={this.state.queryParams.sellerThree}
                        searchSeller={this.searchSeller}
                        searchItem={this.searchItem} 
                        fetchItems={this.fetchItems}
                        resetSearch={this.resetSearch}
                        conditionId={this.state.queryParams.conditionId}
                        categoryId={this.state.queryParams.categoryId}
                        changeCondition={this.changeCondition}
                        changeCategory={this.changeCategory}
                        startDate = {this.state.queryParams.startDate}
                        endDate = {this.state.queryParams.endDate}
                        startDataChange = {this.startDataChange}
                        endDataChange = {this.endDataChange}
                        clickImg = {this.clickImg}
                        show = {this.state.show}
                        isClickable = {this.state.isClickable}
                        taskerClick = {this.tasker}
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
                            meanWatch={this.meanWatches().toFixed(2)}
                            medianWatch={this.medianWatches().toFixed(2)}
                        />
                        <ChartItemsPerDay itemsPerDay={this.createItemsPerDay()} />
                        <ChartRevenuePerDay 
                            itemsPerDay={this.createItemsPerDay()} 
                            arrayWithRevenue={this.createArrayWithRevenue()} 
                        />
                        
                        <TableSeller sellerCount={this.sellerCount()}/>
                        <TableWatchers watcherCount={this.watcherCount()}/>
                        <TablePrices watcherCount={this.watcherCount()}/>
                        <table className="tableStyle" id="table-to-xls" >
                            <TableItems list={this.createTableItems()} id="items-to-xls"/>   
                        </table>
                        <ReactHTMLTableToExcel
                                className="btn-export"
                                table="table-to-xls"
                                filename="ebayFetchFile"
                                sheet="sheet 1"
                                buttonText="EXPORT"
                                ref="child"
                        />
                        <ReactToExcelSeller
                            className="btn-export-seller"
                            table="seller-to-xls"
                            filename="ebayTopSellers"
                            sheet="sheet 2"
                            buttonText="EXPORT SELLER"
                        />
                        
                    </div>}
            </div>
        )
    } 
 
};
//ReactHTMLTableToExcel
/*class Jquery extends React.Component{
    constructor(props) {
        super(props);
    }
        componentDidMount = () => {
        console.log("komponent mount dziala");
         $('#to-csv').click(function(e) {
            //alert("tekst");
            console.log("klik dziala");
            let tableXsl = $('#table-to-xls').html();
            console.log(tableXsl);
            let file = new Blob([tableXsl], {type:'text/csv'});

            let url = URL.createObjectURL(file);

            window.location = url;

            let a = $("<a />", {
                href: url,
                download: "ebayStat.csv"
            })
            .appendTo("body")
            .get(0)
            .click();
                e.preventDefault();
       });    
    }
    
      
    render () {
        console.log("render dziala");
        return (
            <div>
                <input type="button" id="to-csv" value="to excel" />
            </div>    
        )
    }
}
// usuniete rzeczy dla sql

<td className="hide">{index+1}</td>
<td className="imgURL hide" style={{ backgroundImage: this.state.show ? `url(${item.galleryURL})` : "none"}}></td>

<TableHeader list={this.createTableItems()} className="hide" />

<TableFooter 
    sum={this.sumAllPrices().toFixed(2)}
    sumWithShipping={this.sumAllPricesWithShipping().toFixed(2)}
    className="hide"
/>


<ReactToExcel
                                className="btn-export"
                                table="table-to-xls"
                                filename="ebayFetchFile"
                                sheet="sheet 1"
                                buttonText="EXPORT"
                                ref={this.simulateClick}
                        />
*/



const App = () => (
    <EbayApi />
);

document.addEventListener('DOMContentLoaded', function(){
    ReactDOM.render(
        <App/>,
        document.getElementById('app')
    );
});