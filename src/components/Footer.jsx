import React, { Component } from 'react'

export default class Footer extends Component {

  render() {
    return (
      <div>
        <footer className="footer mt-10">
          <div>Exchange rates provided by <a href="https://exchangeratesapi.io">Madis Väin's Exchange API.</a>
          </div>
          <small>App created by Maureen <img src="./images/smiley.svg" />
            <div className="container">
              <a href="https://www.linkedin.com/in/mau11/">
                <img className="icons" alt="linkedin profile" src="./images/linkedin.svg" />
              </a>
              <a href="https://github.com/mau11/currency-exchange">
                <img className="icons" alt="github source code" src="./images/github.png" />
              </a>
            </div>
          </small>
        </footer>
      </div>
    )
  }
}
