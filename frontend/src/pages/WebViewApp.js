
import React, { Component } from 'react';
import '../App.css';
// var userAgent = ["Mozilla/5.0 (Linux; Android 8.0.0; Pixel 2 XL Build/OPD1.170816.004) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Mobile Safari/537.36"];
// var webView = null

class WebViewApp extends Component {
    async componentDidMount() {


    }




    render() {
        console.log("HII - IFRAME")
        let url ="https://www.paisplus.co.il/category/41346681-3CF9-456B-84D3-1E9862B54301/" 
        return (

            <webview id="jobswebview" className="webview web" style={{width:"850px"}} src={url}></webview>
        )
    }

}
export default WebViewApp