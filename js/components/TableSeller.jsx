import React from 'react';

class TableSeller extends React.Component {
    componentDidMount() {
        var entriesObj = Object.entries(this.props.sellerCount);
        var keysObj = Object.keys(this.props.sellerCount);
        var valsObj = Object.values(this.props.sellerCount).map(items => items.length);
    }

    render () {
        var entriesObj = Object.entries(this.props.sellerCount);
        var sortable = [];
        for (var value in entriesObj) {
            sortable.push([entriesObj[value][0], [entriesObj[value][1].length][0]]);
        }

        sortable.sort(function(a, b) {
           return b[1] - a[1];
        });
        
        //console.log(entriesObj);
        //console.log(sortable);

        return (
            <table className="sellersTable" id="seller-to-xls">
                <thead className="sellersTH">
                    TOP 10 SPRZEDAWCÓW
                </thead>
                <tbody>
                    <tr>
                        <td>1.</td>
                        <td>{(typeof sortable[0]) === 'undefined'? "-" : sortable[0][0]}</td>
                        <td>{(typeof sortable[0]) === 'undefined'? "-" : sortable[0][1]}</td>
                        <td><a href={(typeof sortable[0]) === 'undefined'? "#" :"https://www.ebay.de/sch/m.html?_nkw=&amp=&_ssn=" + sortable[0][0] + "&_sop=12&_ipg=200&rt=nc"} target="_blank"><i className="fas fa-external-link-alt"></i></a></td>
                    </tr>
                    <tr>
                        <td>2.</td>
                        <td>{(typeof sortable[1]) === 'undefined'? "-" : sortable[1][0]}</td>
                        <td>{(typeof sortable[1]) === 'undefined'? "-" : sortable[1][1]}</td>
                        <td><a href={(typeof sortable[1]) === 'undefined'? "#" :"https://www.ebay.de/sch/m.html?_nkw=&amp=&_ssn=" + sortable[1][0] + "&_sop=12&_ipg=200&rt=nc"} target="_blank"><i className="fas fa-external-link-alt"></i></a></td>
                    </tr>
                    <tr>
                        <td>3.</td>
                        <td>{(typeof sortable[2]) === 'undefined'? "-" : sortable[2][0]}</td>
                        <td>{(typeof sortable[2]) === 'undefined'? "-" : sortable[2][1]}</td>
                        <td><a href={(typeof sortable[2]) === 'undefined'? "#" :"https://www.ebay.de/sch/m.html?_nkw=&amp=&_ssn=" + sortable[2][0] + "&_sop=12&_ipg=200&rt=nc"} target="_blank"><i className="fas fa-external-link-alt"></i></a></td>
                    </tr>
                    <tr>
                        <td>4.</td>
                        <td>{(typeof sortable[3]) === 'undefined'? "-" : sortable[3][0]}</td>
                        <td>{(typeof sortable[3]) === 'undefined'? "-" : sortable[3][1]}</td>
                        <td><a href={(typeof sortable[3]) === 'undefined'? "#" :"https://www.ebay.de/sch/m.html?_nkw=&amp=&_ssn=" + sortable[3][0] + "&_sop=12&_ipg=200&rt=nc"} target="_blank"><i className="fas fa-external-link-alt"></i></a></td>
                    </tr>
                    <tr>
                        <td>5.</td>
                        <td>{(typeof sortable[4]) === 'undefined'? "-" : sortable[4][0]}</td>
                        <td>{(typeof sortable[4]) === 'undefined'? "-" : sortable[4][1]}</td>
                        <td><a href={(typeof sortable[4]) === 'undefined'? "#" :"https://www.ebay.de/sch/m.html?_nkw=&amp=&_ssn=" + sortable[4][0] + "&_sop=12&_ipg=200&rt=nc"} target="_blank"><i className="fas fa-external-link-alt"></i></a></td>
                    </tr>
                    <tr>
                        <td>6.</td>
                        <td>{(typeof sortable[5]) === 'undefined'? "-" : sortable[5][0]}</td>
                        <td>{(typeof sortable[5]) === 'undefined'? "-" : sortable[5][1]}</td>
                        <td><a href={(typeof sortable[5]) === 'undefined'? "#" :"https://www.ebay.de/sch/m.html?_nkw=&amp=&_ssn=" + sortable[5][0] + "&_sop=12&_ipg=200&rt=nc"} target="_blank"><i className="fas fa-external-link-alt"></i></a></td>
                    </tr>
                    <tr>
                        <td>7.</td>
                        <td>{(typeof sortable[6]) === 'undefined'? "-" : sortable[6][0]}</td>
                        <td>{(typeof sortable[6]) === 'undefined'? "-" : sortable[6][1]}</td>
                        <td><a href={(typeof sortable[6]) === 'undefined'? "#" :"https://www.ebay.de/sch/m.html?_nkw=&amp=&_ssn=" + sortable[6][0] + "&_sop=12&_ipg=200&rt=nc"} target="_blank"><i className="fas fa-external-link-alt"></i></a></td>
                    </tr>
                    <tr>
                        <td>8.</td>
                        <td>{(typeof sortable[7]) === 'undefined'? "-" : sortable[7][0]}</td>
                        <td>{(typeof sortable[7]) === 'undefined'? "-" : sortable[7][1]}</td>
                        <td><a href={(typeof sortable[7]) === 'undefined'? "#" :"https://www.ebay.de/sch/m.html?_nkw=&amp=&_ssn=" + sortable[7][0] + "&_sop=12&_ipg=200&rt=nc"} target="_blank"><i className="fas fa-external-link-alt"></i></a></td>
                    </tr>
                    <tr>
                        <td>9.</td>
                        <td>{(typeof sortable[8]) === 'undefined'? "-" : sortable[8][0]}</td>
                        <td>{(typeof sortable[8]) === 'undefined'? "-" : sortable[8][1]}</td>
                        <td><a href={(typeof sortable[8]) === 'undefined'? "#" :"https://www.ebay.de/sch/m.html?_nkw=&amp=&_ssn=" + sortable[8][0] + "&_sop=12&_ipg=200&rt=nc"} target="_blank"><i className="fas fa-external-link-alt"></i></a></td>
                    </tr>
                    <tr>
                        <td>10.</td>
                        <td>{(typeof sortable[9]) === 'undefined'? "-" : sortable[9][0]}</td>
                        <td>{(typeof sortable[9]) === 'undefined'? "-" : sortable[9][1]}</td>
                        <td><a href={(typeof sortable[9]) === 'undefined'? "#" :"https://www.ebay.de/sch/m.html?_nkw=&amp=&_ssn=" + sortable[9][0] + "&_sop=12&_ipg=200&rt=nc"} target="_blank"><i className="fas fa-external-link-alt"></i></a></td>
                    </tr>
                </tbody>
            </table>
        )
    };
}

export default TableSeller;