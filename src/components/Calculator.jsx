import React, { Component } from 'react'

export default class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      api_url: 'https://api.exchangeratesapi.io/latest?base=',
      rates: '',
      amount: 0,
      baseCurrency: '',
      base: [],
      secondaryCurrency: '',
      secondary: [],
      warning: true,
      iso_codes: [
        '','AUD','BGN','BRL','CAD','CHF','CNY','CZK','DKK','EUR','GBP','HKD','HUF','IDR','ILS','INR','ISK','JPY','KRW','MXN','MYR','NOK','NZD','PHP','PLN','RON','RUB','SEK','SGD','THB','TRY','USD'
      ]
    }
    this.handleBase = this.handleBase.bind(this)
    this.handleSecondary = this.handleSecondary.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  getRates(type) {
    if (this.state.baseCurrency !== '' && this.state.secondaryCurrency !== '') {
      this.setState({warning: false})
    }
    let base = this.state.baseCurrency
    if (base.length) {
      return fetch(this.state.api_url+base)
      .then(res => res.json())
      .then(results => {
        this.setState({[type]: results})
      })
      .catch(err => {console.log('ERROR', err)})
    }
  }

  handleBase(e) {
    if (e.target.value.length) {
      this.setState({baseCurrency: e.target.value}, () => {
        this.getRates('base')
      })
    }
  }

  handleSecondary(e) {
    if (e.target.value.length) {
      this.setState({secondaryCurrency: e.target.value}, () => {
        this.getRates('secondary')
      })
    }
  }

  handleSubmit(e){
    e.preventDefault()
    const data = new FormData(e.target)
    let amount = data.get('amount')
    let result = amount * this.state.base.rates[this.state.secondaryCurrency]
    this.setState({amount: amount, result: result})
  }

  render() {
    return (
      <div className="container col-6 col-offset-6">
        <form className="" onSubmit={this.handleSubmit}>
          <div className="form-group row m-3">
            <input className="form-control col-6" id="amount" name="amount" placeholder="Enter amount"/>
            <select className="form-control col-6" onChange={this.handleBase}>
              {this.state.iso_codes.map((code, i) => (
                <option id={'iso-'+i} key={i}>
                {code}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group row m-3">
            <input className="form-control col-6" readOnly id="secondary-currency" placeholder={this.state.result}/>
            <select className="form-control col-6" onChange={this.handleSecondary}>
              {this.state.iso_codes.map((code, i) => (
              <option id={'iso-'+i} key={i}>
              {code}
              </option>
            ))}
            </select>
          </div>
          {this.state.warning ?
          <small className="warning">Please select both exchange currencies.</small>
          :
          <div className="col-12">
            <button className="btn btn-secondary">Get Rates
            </button>
          </div>
           }
        </form>
      </div>
    )
  }
}
