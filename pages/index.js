import React from 'react';
import Head from 'next/head';
import Layout from '../components/layout.js';
import MainButton from '../components/mainbutton.js';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      generatedPassword: "",
      length: 8,
      symbols: false,
      numbers: true,
      lowercase: true,
      uppercase: true,
    }

    this.generatePassword = this.generatePassword.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  generatePassword() {
    var password = "";
    var chars = "";

    // Symbols
    var symbols = "!#$%&()*+/\\<>?@";

    // Numbers
    var num = "0123456789";
    var numRegex = new RegExp('^(?=.*[0-9]).*$');

    // Lowercase
    var low = "abcdefghijklmnopqrstuvwxyz";
    var lowRegex = new RegExp('^(?=.*[a-z]).*$');

    // Uppercase
    var up = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var upRegex = new RegExp('^(?=.*[A-Z]).*$');

    // List of available chars - add symbols
    if (this.state.symbols) {
      chars += symbols;
    }

    // List of available chars - add numbers
    if (this.state.numbers) {
      chars += num;
    }

    // List of available chars - add lowercase
    if (this.state.lowercase) {
      chars += low;
    }

    // List of available chars - add uppercase
    if (this.state.uppercase) {
      chars += up;
    }

    // Check error
    if (chars.length == 0) {
      this.setState(state => ({
        generatedPassword: "Please select one option"
      }));
    // If no error, generate password
    } else {
      do {
        let charPos = Math.floor(Math.random() * password.length) + 0;
        let newChar = chars.charAt(Math.floor(Math.random() * chars.length));
        password = password.slice(0, charPos) + newChar + password.slice(charPos, password.length);
      } while (password.length < this.state.length);

      // Return password
      this.setState(state => ({
        generatedPassword: password
      }));
    }
  }

  render() {
    return (
      <Layout>
        <Head>
          <title>Strong password generator</title>
        </Head>
        <h1>Strong Password Generator</h1>
        <label>Lenght : </label>
        <input name="length" type="number" min="1" value={this.state.length} onChange={this.handleInputChange} />
        <br />
        <label>Symbols : </label>
        <input name="symbols" type="checkbox" checked={this.state.symbols} onChange={this.handleInputChange} />
        <br />
        <label>Numbers : </label>
        <input name="numbers" type="checkbox" checked={this.state.numbers} onChange={this.handleInputChange} />
        <br />
        <label>Lowercase : </label>
        <input name="lowercase" type="checkbox" checked={this.state.lowercase} onChange={this.handleInputChange} />
        <br />
        <label>Uppercase : </label>
        <input name="uppercase" type="checkbox" checked={this.state.uppercase} onChange={this.handleInputChange} />
        <br />
        <MainButton onClick={this.generatePassword} content="Generate a strong password"/>
        <p>{this.state.generatedPassword}</p>
      </Layout>
    )
  }
}
