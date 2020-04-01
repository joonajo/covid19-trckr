import React from 'react'
import { Provider } from 'react-redux'

import App from 'next/app'
import './global.css'
import store from '../store/store'

class MyApp extends App {
  // Only uncomment this method if you have blocking data requirements for
  // every single page in your application. This disables the ability to
  // perform automatic static optimization, causing every page in your app to
  // be server-side rendered.
  //
  // static async getInitialProps(appContext) {
  //   // calls page's `getInitialProps` and fills `appProps.pageProps`
  //   const appProps = await App.getInitialProps(appContext);
  //
  //   return { ...appProps }
  // }

  componentDidMount() {
    // if ('serviceWorker' in navigator) {
    //   navigator.serviceWorker
    //     .register('/service-worker.js')
    //     .then(registration => {
    //       console.log('service worker registration successful')
    //     })
    //     .catch(err => {
    //       console.warn('service worker registration failed', err.message)
    //     })
    // }
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    )
  }
}

export default MyApp