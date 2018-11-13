import React from 'react';

class TableHeader extends React.Component {

    render () {
        var itemList = this.props.list;
      
        
        return (
            <thead>
                <tr>
                    <th>Lp.</th>
                    <th>Foto</th>
                    <th>Tytuł</th>
                    <th>Kategoria</th>
                    <th>Kategoria eBay</th>
                    <th>Obserwujących</th>
                    <th>Cena</th>
                    <th>Wysyłka</th>
                    <th>Suma</th>
                    <th>Status</th>
                    <th>Typ</th>
                    <th>Data</th>
                    <th>Sprzedawca</th>
                    <th>Link</th>
                </tr>
            </thead>
        );
    };
};

export default TableHeader;