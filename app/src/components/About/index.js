import React from 'react';
import selfie from '../../selfie.png';
import banner from '../../banner.png';
import divisor from '../../divisor.png';
import './index.css';

const About = () => {
    return (
        <div>
            <div className="Banner">
				<header className="App-header">
					<img src={banner} className="App-banner" alt="banner"/>
				</header>
			</div>
            <h1 className="storyTitle">Our Story</h1>
            <div>
                <p className='story'>Our app, like many, has a story. Our story started with our lead developer, Orion. He was scrolling through the internet one day when he came across a meme, where someone decribed a tinder for restaurants. From this lone meme, Orion created our concept, Whaddaya Wanna Eat, to help you choose a restaurant with no hassle. After we all agreed to create our restaurant tinder, Sophie made our iconic logo. From this logo, Allexis created our adorable app mascot, whom was based on the loveable center of our team, Lezette. Allexis also spread the logo's color scheme across the mascot and website, while Sophie spread it across the app itself. With the aid of the Backend Boys, Dylan, Andre and Brandon, under the lead of Orion, our restaurant tinder took shape, and Whadddaya Wanna Eat was formed.</p>
            </div>
            {/* <div ><img src={divisor} className="divisor"/></div> */}
            <div><h1 className="heading">Whaddaya Wanna Eat's Development Chefs</h1></div>
            <div>
            <div className="card-body">
                <img src={selfie} className="selfie"/>
                <div>
                    <div className="selfieDesc">
                        <b className="selfieTitle">Orion Schyberg</b>
                        <br />
                        Master Onion. Lord Onion did the thing that made us do the thing, thus Sir Onion has made the thing happen. All hail Onion. Give prayer to Onion.
                        Onion power. Onion Powder. 
                    </div>
                </div>
            </div>
            <div className="card-body">
                <img src={selfie} className="selfie"/>
                <div>
                    <div className="selfieDesc">
                    <b className="selfieTitle">Lezette Leuterio</b>
                    <br />
                    Best Mascot. Glues the whole team together. Nuff said
                    </div>
                </div>
            </div>
            <div className="card-body">
                <img src={selfie} className="selfie"/>
                <div>
                    <div className="selfieDesc">
                    <b className="selfieTitle">Sophie Guelfi</b>
                    <br />
                    Swift Expert, IOS victim
                    </div>
                </div>
            </div>
            <div className="card-body">
                <img src={selfie} className="selfie"/>
                <div>
                    <div className="selfieDesc">
                    <b className="selfieTitle">Brandon Rubio</b>
                    <br />
                    Backend boys member, Onion approved
                    </div>
                </div>
            </div>
            <div className="card-body">
                <img src={selfie} className="selfie"/>
                <div>
                    <div className="selfieDesc">
                    <b className="selfieTitle">Andre Rodriguez</b>
                    <br />
                    Backend Boys member, database skillz
                    </div>
                </div>
            </div>
            <div className="card-body">
                <img src={selfie} className="selfie"/>
                <div>
                    <div className="selfieDesc">
                    <b className="selfieTitle">Dylan Reuter</b>
                    <br />
                    Backend Boys member, jack of all coding
                    </div>
                </div>
            </div>
            <div className="card-body">
                <img src={selfie} className="selfie"/>
                <div>
                    <div className="selfieDesc">
                    <b className="selfieTitle">Allexis Knight</b>
                    <br />
                    Massive nerd, artsy fartsy web design person
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default About;