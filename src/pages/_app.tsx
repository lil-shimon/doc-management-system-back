import React,{useEffect} from 'react'
import {  AppProps } from 'next/app'
import { Provider } from 'react-redux'

import { MuiPickersUtilsProvider } from '@material-ui/pickers'

import DateFnsUtils from '@date-io/date-fns';
import Layout from '../components/layout';
import Authenication from '../components/Authenication';

import createStore from "../redux/store";

const store = createStore();

const MyApp = ({ Component, pageProps }: AppProps) => {

    useEffect(() => {
        const jssStyles = document.querySelector("#jss-server-side");
        if (jssStyles) {
            jssStyles.parentElement?.removeChild(jssStyles);
        }
    }, []);

    const useLayout = pageProps.layout;

    return useLayout ? (
        <Provider store={store}>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <Authenication mode={pageProps.authMode}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </Authenication>  
</MuiPickersUtilsProvider>

        </Provider>
    ) : (
        <Provider store={store}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Authenication mode={pageProps.authMode}>
                <Component { ...pageProps } />
            </Authenication>
</MuiPickersUtilsProvider>
        </Provider>
    )
}


export default MyApp
