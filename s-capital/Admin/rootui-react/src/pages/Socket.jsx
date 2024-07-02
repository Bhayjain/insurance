/**
 * External Dependencies
 */
 import React, { Component } from 'react';
 import { io } from "socket.io-client";


 var api_url = "http://192.168.29.31:4090/"
 // var api_url = "http://173.249.5.10:3005/"
//  var api_url = "https://api.bookyourinsurance.com:4092/"
//  var api_url = "https://demoapi.bookyourinsurance.com:4050/"



  const socket =  io(api_url, {transport : ['WebSocket']})

 export default socket;
