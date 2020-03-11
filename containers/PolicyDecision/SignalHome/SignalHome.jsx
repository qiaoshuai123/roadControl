import React, { Component } from 'react';
import Header from '../components/header/header'

import styles from './Signahome.scss'

export class SignalHome extends Component {
    render() {
        return (
            <div className={styles.signalHomeBox}>
                <Header/>
                <div className="signaContainer">
                    <div className="signaContainer_left">

                    </div>
                    <div className="signaContainer_center">
                        
                    </div>
                    <div className="signaContainer_right">

                    </div>
                </div>
            </div>
        );
    }
}

export default SignalHome;
