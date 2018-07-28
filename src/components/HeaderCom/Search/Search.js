import React , {Component} from 'react';
import {withRouter, Redirect} from 'react-router-dom';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';
import dataCode from '../../../dataCode';
import './Search.css';
// Imagine you have a list of languages that you'd like to autosuggest.
let searchSug = [];

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : searchSug.filter(lang =>
        lang.name.toLowerCase().slice(0, inputLength) === inputValue
    );
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.name;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
    <div>
        {suggestion.name}
    </div>
);

class Search extends Component {

    state  = {
        searchKey: '',
        redirect: false,
        category: 'all',
        value: '',
        suggestions: []
    }

    searchHandler = () => {
       // this.setState({redirect: true});
        const url = '/search/'+this.state.category+'/'+this.state.searchKey;
        if(this.props.history.location.pathname.includes('search')) {
            this.props.history.push(url);
            window.location.reload();
        } else {
            this.props.history.push(url);
        }

        // this.props.history.replace(url);

    }


    onChange = (e) => {
        // if(e.target.value.length > 3) {

        // }
        this.setState({[e.target.name]: e.target.value});
    }


    onChangeTest = (event, { newValue }) => {
        if(newValue.length > 3) {
            console.log(newValue);
            let url = 'http://localhost:80/ariaelec/public/api/search-part?keyword='+newValue;
            axios.get(url)
                .then(response => {
                    console.log(response.data[1]);
                    if(response.data[0] == dataCode.partSearch) {
                        searchSug = [];
                        response.data[1].map((item) => {
                            searchSug.push({name: item.manufacturer_part_number});
                        });
                        console.log(searchSug);
                    }
                })
                .catch(err => {

                });
        }
        this.setState({
            searchKey: newValue
        });
    };

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: getSuggestions(value)
        });
    };

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    render() {
        // const url = '/search/'+this.state.category+'/'+this.state.searchKey;
        // let redirect ;
        // if (this.state.redirect) {
        //     redirect =  <Redirect to={url} />;
        // }

        const { searchKey, suggestions } = this.state;

        // Autosuggest will pass through all these props to the input.
        const inputProps = {
            placeholder: 'جست وجو ...',
            value: searchKey,
            onChange: this.onChangeTest
        };
        return(
            <div className="flex-row justify-content-center searchForm flex-item-6">
                <select value={this.state.category} onChange={this.onChange} name="category">
                    <option value="all">همه</option>
                    <option value="ic">IC</option>
                    <option value="res">مقاومت ها</option>
                </select>
              <Autosuggest
                  suggestions={suggestions}
                  onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                  onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                  getSuggestionValue={getSuggestionValue}
                  renderSuggestion={renderSuggestion}
                  inputProps={inputProps}
              />
              <button onClick={this.searchHandler} className="btn"><i className="fa fa-search"></i></button>
            </div>

        )
    }
}

export default withRouter(Search);

{/*<input name="searchKey" value={this.state.searchKey} onChange={this.onChange} placeholder="نام قطعه را وارد کنید"/>*/}
