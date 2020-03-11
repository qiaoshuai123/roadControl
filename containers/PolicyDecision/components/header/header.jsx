import React, { Component } from 'react';
import styles from './header.scss'
export class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
        this.headerLeft = [
            { name: '全局监控' },
            { name: '特勤任务' },
            { name: '协调监控' },
        ]
        this.headerRight = [
            { name: '统计分析' },
            { name: '综合管理' },
            { name: '系统维护' },
        ]
    }
    componentDidMount = () => {

    }
    render() {
        return (
            <div className={styles.signalHomeBox_header}>
                <header className={styles.headers}>
                    <div className={styles.header_left}>
                        <div className={styles.header_left_top}>
                            <span>2018年9月20日</span>
                            <span>周四</span>
                            <span>10点</span>
                            <span>农历八月二十一</span>
                        </div>
                        <div className={styles.header_left_bom}>
                            {
                                this.headerLeft.map((item, index) => <div key={index}>
                                    {item.name}
                                    <span></span>
                                    <span></span>
                                    </div>)
                            }
                        </div>
                    </div>
                    <div className={styles.header_center}>
                        只能交通信号优化系统
                    </div>
                    <div className={styles.header_right}>
                        <div className={styles.header_right_top}>
                            <input type="text" />
                            <span>返回首页</span>
                        </div>
                        <div className={styles.header_right_bom}>
                            {
                                this.headerLeft.map((item, index) => <div key={index}>{item.name}</div>)
                            }
                        </div>

                    </div>
                </header>
            </div>
        );
    }
}

export default Header;
