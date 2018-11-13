import React from 'react';

class TableWatchers extends React.Component {
    componentDidMount() {
        var entriesObj = Object.entries(this.props.watcherCount);
        var keysObj = Object.keys(this.props.watcherCount);
        var valsObj = Object.values(this.props.watcherCount).map(items => items.length);
    }

    render () {
    
        var entriesObj = Object.entries(this.props.watcherCount);
        console.log(entriesObj);
        var sortable = [];
        
        //Gdy jakas property nie zawsze istnieje (w tym przypadku watchCount), to nalezy odniesc sie do ostatniego istniejacego property (tu listingInfo)
        //i przypisac wartosc warunkowo

        for (var value in entriesObj){
            
                var listing = entriesObj[value][1][0].listingInfo[0]; 
                var watches = (listing.watchCount && listing.watchCount[0]) || [];
                sortable.push([watches, entriesObj[value][1][0].title[0],entriesObj[value][0]]);
            
        }

        sortable.sort(function(a, b) {
            return b[0] - a[0];
         });

       //console.log(sortable);

        return (
            <table className="sellersTable">
                <thead className="sellersTH">
                    TOP 20 OBSERWUJĄCYCH
                </thead>
                <tbody>
                    <tr>
                        <td>1.</td>
                        <td>{(typeof sortable[0]) === 'undefined'? "-" : sortable[0][1]}</td>
                        <td>{(typeof sortable[0]) === 'undefined'? "-" : sortable[0][0]}</td>
                        <td><a href={(typeof sortable[0]) === 'undefined'? "#" :"https://www.ebay.de/sch/i.html?_from=R40&_sacat=0&LH_Complete=1&_nkw=" + sortable[0][2]} target="_blank"><i className="fas fa-external-link-alt"></i></a></td>
                    </tr>
                    <tr>
                        <td>2.</td>
                        <td>{(typeof sortable[1]) === 'undefined'? "-" : sortable[1][1]}</td>
                        <td>{(typeof sortable[1]) === 'undefined'? "-" : sortable[1][0]}</td>
                        <td><a href={(typeof sortable[1]) === 'undefined'? "#" :"https://www.ebay.de/sch/i.html?_from=R40&_sacat=0&LH_Complete=1&_nkw=" + sortable[1][2]} target="_blank"><i className="fas fa-external-link-alt"></i></a></td>
                    </tr>
                    <tr>
                        <td>3.</td>
                        <td>{(typeof sortable[2]) === 'undefined'? "-" : sortable[2][1]}</td>
                        <td>{(typeof sortable[2]) === 'undefined'? "-" : sortable[2][0]}</td>
                        <td><a href={(typeof sortable[2]) === 'undefined'? "#" :"https://www.ebay.de/sch/i.html?_from=R40&_sacat=0&LH_Complete=1&_nkw=" + sortable[2][2]} target="_blank"><i className="fas fa-external-link-alt"></i></a></td>
                    </tr>
                    <tr>
                        <td>4.</td>
                        <td>{(typeof sortable[3]) === 'undefined'? "-" : sortable[3][1]}</td>
                        <td>{(typeof sortable[3]) === 'undefined'? "-" : sortable[3][0]}</td>
                        <td><a href={(typeof sortable[3]) === 'undefined'? "#" :"https://www.ebay.de/sch/i.html?_from=R40&_sacat=0&LH_Complete=1&_nkw=" + sortable[3][2]} target="_blank"><i className="fas fa-external-link-alt"></i></a></td>
                    </tr>
                    <tr>
                        <td>5.</td>
                        <td>{(typeof sortable[4]) === 'undefined'? "-" : sortable[4][1]}</td>
                        <td>{(typeof sortable[4]) === 'undefined'? "-" : sortable[4][0]}</td>
                        <td><a href={(typeof sortable[4]) === 'undefined'? "#" :"https://www.ebay.de/sch/i.html?_from=R40&_sacat=0&LH_Complete=1&_nkw=" + sortable[4][2]} target="_blank"><i className="fas fa-external-link-alt"></i></a></td>
                    </tr>
                    <tr>
                        <td>6.</td>
                        <td>{(typeof sortable[5]) === 'undefined'? "-" : sortable[5][1]}</td>
                        <td>{(typeof sortable[5]) === 'undefined'? "-" : sortable[5][0]}</td>
                        <td><a href={(typeof sortable[5]) === 'undefined'? "#" :"https://www.ebay.de/sch/i.html?_from=R40&_sacat=0&LH_Complete=1&_nkw=" + sortable[5][2]} target="_blank"><i className="fas fa-external-link-alt"></i></a></td>
                    </tr>
                    <tr>
                        <td>7.</td>
                        <td>{(typeof sortable[6]) === 'undefined'? "-" : sortable[6][1]}</td>
                        <td>{(typeof sortable[6]) === 'undefined'? "-" : sortable[6][0]}</td>
                        <td><a href={(typeof sortable[6]) === 'undefined'? "#" :"https://www.ebay.de/sch/i.html?_from=R40&_sacat=0&LH_Complete=1&_nkw=" + sortable[6][2]} target="_blank"><i className="fas fa-external-link-alt"></i></a></td>
                    </tr>
                    <tr>
                        <td>8.</td>
                        <td>{(typeof sortable[7]) === 'undefined'? "-" : sortable[7][1]}</td>
                        <td>{(typeof sortable[7]) === 'undefined'? "-" : sortable[7][0]}</td>
                        <td><a href={(typeof sortable[7]) === 'undefined'? "#" :"https://www.ebay.de/sch/i.html?_from=R40&_sacat=0&LH_Complete=1&_nkw=" + sortable[7][2]} target="_blank"><i className="fas fa-external-link-alt"></i></a></td>
                    </tr>
                    <tr>
                        <td>9.</td>
                        <td>{(typeof sortable[8]) === 'undefined'? "-" : sortable[8][1]}</td>
                        <td>{(typeof sortable[8]) === 'undefined'? "-" : sortable[8][0]}</td>
                        <td><a href={(typeof sortable[8]) === 'undefined'? "#" :"https://www.ebay.de/sch/i.html?_from=R40&_sacat=0&LH_Complete=1&_nkw=" + sortable[8][2]} target="_blank"><i className="fas fa-external-link-alt"></i></a></td>
                    </tr>
                    <tr>
                        <td>10.</td>
                        <td>{(typeof sortable[9]) === 'undefined'? "-" : sortable[9][1]}</td>
                        <td>{(typeof sortable[9]) === 'undefined'? "-" : sortable[9][0]}</td>
                        <td><a href={(typeof sortable[9]) === 'undefined'? "#" :"https://www.ebay.de/sch/i.html?_from=R40&_sacat=0&LH_Complete=1&_nkw=" + sortable[9][2]} target="_blank"><i className="fas fa-external-link-alt"></i></a></td>
                    </tr>
                    <tr>
                        <td>11.</td>
                        <td>{(typeof sortable[9]) === 'undefined'? "-" : sortable[10][1]}</td>
                        <td>{(typeof sortable[9]) === 'undefined'? "-" : sortable[10][0]}</td>
                        <td><a href={(typeof sortable[9]) === 'undefined'? "#" :"https://www.ebay.de/sch/i.html?_from=R40&_sacat=0&LH_Complete=1&_nkw=" + sortable[10][2]} target="_blank"><i className="fas fa-external-link-alt"></i></a></td>
                    </tr>
                    <tr>
                        <td>12.</td>
                        <td>{(typeof sortable[9]) === 'undefined'? "-" : sortable[11][1]}</td>
                        <td>{(typeof sortable[9]) === 'undefined'? "-" : sortable[11][0]}</td>
                        <td><a href={(typeof sortable[9]) === 'undefined'? "#" :"https://www.ebay.de/sch/i.html?_from=R40&_sacat=0&LH_Complete=1&_nkw=" + sortable[11][2]} target="_blank"><i className="fas fa-external-link-alt"></i></a></td>
                    </tr>
                    <tr>
                        <td>13.</td>
                        <td>{(typeof sortable[9]) === 'undefined'? "-" : sortable[12][1]}</td>
                        <td>{(typeof sortable[9]) === 'undefined'? "-" : sortable[12][0]}</td>
                        <td><a href={(typeof sortable[9]) === 'undefined'? "#" :"https://www.ebay.de/sch/i.html?_from=R40&_sacat=0&LH_Complete=1&_nkw=" + sortable[12][2]} target="_blank"><i className="fas fa-external-link-alt"></i></a></td>
                    </tr>
                    <tr>
                        <td>14.</td>
                        <td>{(typeof sortable[9]) === 'undefined'? "-" : sortable[13][1]}</td>
                        <td>{(typeof sortable[9]) === 'undefined'? "-" : sortable[13][0]}</td>
                        <td><a href={(typeof sortable[9]) === 'undefined'? "#" :"https://www.ebay.de/sch/i.html?_from=R40&_sacat=0&LH_Complete=1&_nkw=" + sortable[13][2]} target="_blank"><i className="fas fa-external-link-alt"></i></a></td>
                    </tr>
                    <tr>
                        <td>15.</td>
                        <td>{(typeof sortable[9]) === 'undefined'? "-" : sortable[14][1]}</td>
                        <td>{(typeof sortable[9]) === 'undefined'? "-" : sortable[14][0]}</td>
                        <td><a href={(typeof sortable[9]) === 'undefined'? "#" :"https://www.ebay.de/sch/i.html?_from=R40&_sacat=0&LH_Complete=1&_nkw=" + sortable[14][2]} target="_blank"><i className="fas fa-external-link-alt"></i></a></td>
                    </tr>
                    <tr>
                        <td>16.</td>
                        <td>{(typeof sortable[9]) === 'undefined'? "-" : sortable[15][1]}</td>
                        <td>{(typeof sortable[9]) === 'undefined'? "-" : sortable[15][0]}</td>
                        <td><a href={(typeof sortable[9]) === 'undefined'? "#" :"https://www.ebay.de/sch/i.html?_from=R40&_sacat=0&LH_Complete=1&_nkw=" + sortable[15][2]} target="_blank"><i className="fas fa-external-link-alt"></i></a></td>
                    </tr>
                    <tr>
                        <td>17.</td>
                        <td>{(typeof sortable[9]) === 'undefined'? "-" : sortable[16][1]}</td>
                        <td>{(typeof sortable[9]) === 'undefined'? "-" : sortable[16][0]}</td>
                        <td><a href={(typeof sortable[9]) === 'undefined'? "#" :"https://www.ebay.de/sch/i.html?_from=R40&_sacat=0&LH_Complete=1&_nkw=" + sortable[16][2]} target="_blank"><i className="fas fa-external-link-alt"></i></a></td>
                    </tr>
                    <tr>
                        <td>18.</td>
                        <td>{(typeof sortable[9]) === 'undefined'? "-" : sortable[17][1]}</td>
                        <td>{(typeof sortable[9]) === 'undefined'? "-" : sortable[17][0]}</td>
                        <td><a href={(typeof sortable[9]) === 'undefined'? "#" :"https://www.ebay.de/sch/i.html?_from=R40&_sacat=0&LH_Complete=1&_nkw=" + sortable[17][2]} target="_blank"><i className="fas fa-external-link-alt"></i></a></td>
                    </tr>
                    <tr>
                        <td>19.</td>
                        <td>{(typeof sortable[9]) === 'undefined'? "-" : sortable[18][1]}</td>
                        <td>{(typeof sortable[9]) === 'undefined'? "-" : sortable[18][0]}</td>
                        <td><a href={(typeof sortable[9]) === 'undefined'? "#" :"https://www.ebay.de/sch/i.html?_from=R40&_sacat=0&LH_Complete=1&_nkw=" + sortable[18][2]} target="_blank"><i className="fas fa-external-link-alt"></i></a></td>
                    </tr>
                    <tr>
                        <td>20.</td>
                        <td>{(typeof sortable[9]) === 'undefined'? "-" : sortable[19][1]}</td>
                        <td>{(typeof sortable[9]) === 'undefined'? "-" : sortable[19][0]}</td>
                        <td><a href={(typeof sortable[9]) === 'undefined'? "#" :"https://www.ebay.de/sch/i.html?_from=R40&_sacat=0&LH_Complete=1&_nkw=" + sortable[19][2]} target="_blank"><i className="fas fa-external-link-alt"></i></a></td>
                    </tr>
                </tbody>
            </table>
        )
    }
}


export default TableWatchers;