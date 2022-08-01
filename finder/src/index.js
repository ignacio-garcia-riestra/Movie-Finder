import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";
import { Provider } from 'react-redux'
import store from './store/store'

ReactDOM.render(
  <ChakraProvider>
    <BrowserRouter>
      <Provider 
      store={store}
      >
        <App />
      </Provider>
    </BrowserRouter>
  </ChakraProvider>,
  document.getElementById('root')
);