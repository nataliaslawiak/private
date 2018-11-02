import React from 'react';
import TableSeller from './TableSeller.jsx';

class TableSellerWrapper extends React.Component {
    render () {
        return (
            <tbody>
                <TableSeller sellerCount={this.props.sellerCount}/>
            </tbody>

        )
    };
};

export default TableSellerWrapper;