import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {
    renderContent() {
        switch(this.props.auth) {
            case null:
                return 'Still deciding';
            case false:
                return (
                    <li><a href="/auth/google">Login with Google</a></li>
                );
            default:
                return [
                    <li key="1"><Payments /></li>,
                    <li key="3" style={{margin:'0 10px'}}>
                        Credits: {this.props.auth.credits}
                    </li>,
                    <li key="2"><a href='/api/logout'>Logout</a></li>
                ];
        }
    }

    render() {
        console.log(this.props);
        return(
            <nav>
                <div className = "nav-wrapper">
                    <Link 
                    to={this.props.auth ? '/survey' : '/'} // auth 오브젝트가 있으면 서베이로. 아님 루트로.. 리액트 라우터 돔..
                    className="left brand-logo"
                >
                    Emily
                    </Link>
                    <ul className="right">
                        {this.renderContent()}
                    </ul>
                </div>
            </nav>
        );
    }
}

// auth 는 리듀서에 정의되어 있다.
function mapStateToProps( { auth }) {
    return { auth };
    //return { auth };
}

export default connect(mapStateToProps)(Header);