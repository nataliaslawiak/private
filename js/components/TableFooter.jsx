import React from 'react';

class TableFooter extends React.Component {
    render () {
        return (
            <tfoot>
                <tr>
                    <td> - </td>
                    <td> - </td>
                    <td> - </td>
                    <td> - </td>
                    <td> - </td>
                    <td>{this.props.sum}</td>
                    <td> - </td>
                    <td>{this.props.sumWithShipping}</td>
                    <td> - </td>
                    <td> - </td>
                    <td> - </td>
                    <td> - </td>
                </tr>
            </tfoot>
        )
    };
};

export default TableFooter;