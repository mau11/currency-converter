import React, { Component } from 'react'

export default class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      api_url: 'https://api.exchangeratesapi.io/latest?base=',
      rates: '',
      amount: 0,
      base: [],
      secondary: [],
      iso_codes: [
        'AUD','BGN','BRL','CAD','CHF','CNY','CZK','DKK','EUR','GBP','HKD','HUF','IDR','ILS','INR','ISK','JPY','KRW','MXN','MYR','NOK','NZD','PHP','PLN','RON','RUB','SEK','SGD','THB','TRY','USD'
      ]
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  getRates(iso, secondary, amount) {
    fetch(this.state.api_url+iso)
    .then(res => res.json())
    .then(results => {
      let result = (amount * results.rates[secondary]).toFixed(2)
      this.setState({result: result})
    })
    .catch(err => {console.log('ERROR', err)})
  }

  handleSubmit(e){
    e.preventDefault()
    const data = new FormData(e.target)
    let amount = data.get('amount')
    let baseIso = data.get('base')
    let secondaryIso = data.get('secondary')
    this.getRates(baseIso, secondaryIso, amount)
  }

  render() {
    return (
      <div className="container col-6 col-offset-6">
        <form className="" onSubmit={this.handleSubmit}>
          <div className="form-group row m-3">
            <input className="form-control col-6" id="amount" name="amount" placeholder="Enter amount" required/>
            <select className="form-control col-6" defaultValue="USD" name="base">
              {this.state.iso_codes.map((code, i) => (
                <option id={'iso-'+i} key={i}>{code}</option>
              ))}
            </select>
          </div>
          <div className="form-group row m-3">
            <div className="form-control col-6" readOnly id="secondary-currency" placeholder="">{this.state.result}
            </div>
            <select className="form-control col-6" defaultValue="EUR" name="secondary">
              {this.state.iso_codes.map((code, i) => (
              <option id={'iso-'+i} key={i}>{code}</option>
            ))}
            </select>
          </div>
          <div className="col-12">
            <button className="btn btn-secondary">Get Rates
            </button>
          </div>
        </form>
      </div>
    )
  }
}
