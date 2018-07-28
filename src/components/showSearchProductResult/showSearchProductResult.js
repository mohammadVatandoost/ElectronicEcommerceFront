import React , {Component} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import dataCode from '../../dataCode';
import Select from 'react-select';
import { ClipLoader } from 'react-spinners';
import buildUrl from 'build-url';
import './showSearchProductResult.css';

class showSearchProductResult extends Component {

    state  = {
        searchKey: '',
        data: '',
        dataParts: [],
        dataCode: '',
        dataFilters: [],
        tableHeaderS: '',
        filters: {},
        loading: true
    }

    componentDidMount() {
        let url = 'http://localhost:80/ariaelec/public/api/search-part-comp?category='+this.props.match.params.category+'&keyword='+this.props.match.params.keyword;
        let temp = window.location.href;
        temp = temp.replace('http://localhost:3000/search/'+this.props.match.params.category+'/'+this.props.match.params.keyword,'');
        temp = temp.replace('/','');
        console.log('temp');console.log(temp);
        if(temp != '') { url = url + '&filters='+temp; }
        this.setState({searchKey: this.props.match.params.keyword});
        axios.get(url)
            .then(response => {
                console.log(response);
                if(response.data[0] == dataCode.partSearch) {
                    this.setState({dataCode: response.data[0],dataParts: response.data[2],dataFilters: response.data[3],tableHeaderS: response.data[5]});
                }
                this.setState({loading: false});
            })
            .catch(err => {
                console.log(err);
            });
    }

    sort = (property,kind) => {
        console.log("sort");
        console.log(property);
        console.log(kind);
    }

    filterComponent = () => {
         let temp = {} ;
         Object.keys(this.state.filters).map((property) => {
             let temp2;
             Object.keys(this.state.tableHeaderS).map((property2) => {
                if(this.state.tableHeaderS[property2] == property) { temp2 = property2; }
             });
            let buffer = this.state.filters[property].split(",");
            temp[temp2] = buffer;
        });
         let url = buildUrl('/search/'+this.state.dataParts[0].slug+'/'+this.props.match.params.keyword+'/', {
             queryParams: {
                 'filters': JSON.stringify(temp)
             }
         });
         url = url.replace('?filters=','/');
        this.props.history.push(url);
        window.location.reload();
    }

    render() {
        let dataParts;
        let tableHeads ;
        let dataFilters ;
        let filterButton;
        if(this.state.dataCode == dataCode.partSearch) {
            // dataTables
             tableHeads = Object.keys(this.state.dataParts[0]).map((property) => {
                 let temp = null;
                 Object.keys(this.state.tableHeaderS).map((property2,i) => {
                    if(this.state.tableHeaderS[property2] == property) {
                        temp = <th style={{minWidth: '110px'  }} key={property+'1'}><p>{property}</p><button className="btn btnHoverGreen" style={{margin: '2px' }} onClick={() => {this.sort(property,'increase')}}><i class="fa fa-arrow-up" aria-hidden="true"></i></button><button className="btn btnHoverRed" onClick={() => {this.sort(property,'increase')}}><i class="fa fa-arrow-down" aria-hidden="true"></i></button></th> ;
                    }
                 });
                 if(temp == null) {
                     if( !((property == "slug") || (property == "name") || (property == "type") || (property == "original") || (property == "part_status") || (property == "persian_name"))) {
                         return (   <th key={property + '2'} style={{paddingBottom: '52px'}}><p>{property}</p></th> );
                     }
                 } else {  return temp; }
             });
             dataParts = this.state.dataParts.map((item, i) => {
                let entry = Object.keys(item).map((property, j) => {
                    if(property == "hd_image") {
                        return ( <td key={property}><img alt={this.state.searchKey} src={item[property]} /></td> )
                    } else if(property == "ld_image") {
                        return ( <td key={property}><a href={item[property]}><i className="fa fa-file-text" aria-hidden="true"></i></a></td> )
                    } else if( !((property == "slug") || (property == "name") || (property == "type") || (property == "original") || (property == "part_status") || (property == "persian_name"))) {
                        return ( <td key={property}>{item[property]}</td> )
                    }

                });
                return (
                    <tr key={i}>{entry}</tr>
                );
            });
             // data Filters
            let dataFiltersTemp = this.state.dataFilters;
            dataFilters = Object.keys(dataFiltersTemp).map((property,i) => {
                let options =[];
                dataFiltersTemp[property].map((item) => {options.push({label: item,value: item})});
                    return (
                        <div className="col-md-2 col-sm-3 colScrollable" key={i}>
                            <p style={{textAlign: 'center'}}>{property.split('_').join(' ')}</p>
                            <Select
                                closeOnSelect
                                disabled={false}
                                multi
                                onChange={(selectedOption) => {let temp = this.state.filters;temp[property] = selectedOption;this.setState({filters: temp});console.log(temp);}}
                                options={options}
                                placeholder=""
                                removeSelected
                                simpleValue
                                value={this.state.filters[property]}
                            />
                        </div>
                    );
            });

            if(Object.keys(dataFiltersTemp).length > 1) {  filterButton = <button onClick={this.filterComponent} hidden={this.state.loading} className="btn btn-primary buttonFilter">فیلتر</button> }
        }
        let display = "block";
        return(
            <div className="container table-responsive text-center searchResultContainer">
               <div>
                <ClipLoader size="200" color={'#123abc'} loading={this.state.loading} />
               </div>
                <div className="row text-center rowScrollable">{dataFilters}</div>
                <br/>
                {filterButton}
                <br/>
                <table className="table table-striped">
                    <thead>
                      <tr>{tableHeads}</tr>
                    </thead>
                      <tbody>{dataParts}</tbody>
                </table>
            </div>
        )
    }
}

export default withRouter(showSearchProductResult);