import React from 'react';
import Head from 'next/head';
import Layout from '../components/layout.js';
import MainButton from '../components/mainbutton.js';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      generatedPassword: ""
    }

    this.generatePassword = this.generatePassword.bind(this);
  }

  generatePassword() {
    var password = "";

    // Uppercase
    var up = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var upRegex = new RegExp('^(?=.*[A-Z]).*$');

    // Lowercase
    var low = "abcdefghijklmnopqrstuvwxyz";
    var lowRegex = new RegExp('^(?=.*[a-z]).*$');

    // Number
    var num = "0123456789";
    var numRegex = new RegExp('^(?=.*[0-9]).*$');

    // Random Characters
    var random = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789&é()!?=+)-";

    // Generation
    do {
      let newChar;
      let charPos = Math.floor(Math.random() * password.length) + 0;

      // If doesn't contain uppercase, add it
      if (!upRegex.test(password)) {
        newChar = up.charAt(Math.floor(Math.random() * up.length));
        password = password.slice(0, charPos) + newChar + password.slice(charPos, password.length);

      // If doesn't contain lowercase, add it
      } else if (!lowRegex.test(password)) {
        newChar = low.charAt(Math.floor(Math.random() * low.length));
        password = password.slice(0, charPos) + newChar + password.slice(charPos, password.length);

      // If doesn't contain number, add it
      } else if (!numRegex.test(password)) {
        newChar = num.charAt(Math.floor(Math.random() * num.length));
        password = password.slice(0, charPos) + newChar + password.slice(charPos, password.length);

      // Else add random char
      } else {
        newChar = random.charAt(Math.floor(Math.random() * random.length));
        password = password.slice(0, charPos) + newChar + password.slice(charPos, password.length);
      }
    } while (password.length < 8);

    // Return password
    this.setState(state => ({
      generatedPassword: password
    }));
  }

  render() {
    return (
      <Layout>
        <Head>
          <title>Strong password generator</title>
        </Head>
        <h1>Strong Password Generator</h1>
        <MainButton onClick={this.generatePassword} content="Generate a strong password"/>
        <p>{this.state.generatedPassword}</p>
      </Layout>
    )
  }
}
