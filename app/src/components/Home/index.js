import React from 'react';
import logo from '../../logo.png';
import swift from '../../swift.png';

const Home = () => {
    return (
        <div className="Logo">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo"/>
			</header>
			<img src={swift} width="300" height="90" className="App-swift" alt="swift"/>
		</div>
    )
}

export default Home;