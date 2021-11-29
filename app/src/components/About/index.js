import React from 'react';
import cheemo from '../../cheemo.jpg';
import banner from '../../banner2.jpg';
import divisor from '../../divisor.png';
import orion_selfie from '../../orion_selfie.png';
import dylan_selfie from '../../dylan_selfie.jpg';
import orlandobloo from '../../orlandobloo.jpg';
import sophie_selfie from '../../sophie_selfie.jpg';
import redVelvet from '../../red_velvet_ritual.png';
import andre_selfie from '../../andre_selfie.jpg';
import './index.css';

const About = () => {
    return (
        <div>
             <div className="Banner">
				<header className="App-header">
					<img src={banner} className="App-banner" alt="banner"/>
				</header>
			</div>
            <h1>Our Story</h1>
            <div>
                <p className='story'>Our app, like many, has a story. Our story started with our lead developer, Orion. He was scrolling through the internet one day when he came across a meme, where someone decribed a tinder for restaurants. From this lone meme, Orion created our concept, Whaddaya Wanna Eat, to help you choose a restaurant with no hassle. After we all agreed to create our restaurant tinder, Sophie made our iconic logo. From this logo, Allexis created our adorable app mascot, whom was based on the loveable center of our team, Lezette. Allexis also spread the logo's color scheme across the mascot and website, while Sophie spread it across the app itself. With the aid of the Backend Boys, Dylan, Andre and Brandon, under the lead of Orion, our restaurant tinder took shape, and Whaddaya Wanna Eat was formed.</p>
            </div>
            <div ><img src={divisor} className="divisor"/></div>
             
            <div><h1 className="heading">Whaddaya Wanna Eat's Development Chefs</h1></div>

            <div className="wrapper">
                
                <div className="card">
                    <div className="card_body">
                        <img src={orion_selfie} className="card_image"></img>
                        <h2 className="card_title">Orion Schyberg</h2>
                        <p className="card_description">The project manager for our group, and an effective one at that. Capable of taking the lead and helping everyone with their duties when they need it, Orion is very reliable and highly skilled.
                        <br /><br />
                        "I'll pick any restaurant except Olive Garden. I freaking hate Olive garden"
                        </p> 
                    </div>
                </div>

                <div className="card">
                    <div className="card_body">
                        <img src={cheemo} className="card_image"></img>
                        <h2 className="card_title">Lezette Leuterio</h2>
                        <p className="card_description">Assistant project manager and frontend developer, she fulfills the roles that others might not have the time to. A kinda person that helps glue the whole team together.
                        <br /><br />
                        "I may have organized the group and set up the front end, but it feels like I haven't done enough"
                        </p> 
                    </div>
                </div>

                <div className="card">
                    <div className="card_body">
                        <img src={sophie_selfie} className="card_image"></img>
                        <h2 className="card_title">Sophie Guelfi</h2>
                        <p className="card_description">Mobile and backend developer, she handles IOS like a pro. Ready to handle a MacBook, she does her best to get around its more difficult exploits and Swiftly creates apps for our team.
                        <br /><br />
                        "I'd usually have it working by now, but I'm stuck on a MacBook"
                        </p> 
                    </div>
                </div>

                <div className="card">
                    <div className="card_body">
                        <img src={orlandobloo} className="card_image"></img>
                        <h2 className="card_title">Brandon Rubio</h2>
                        <p className="card_description">Backend developer, he's very reliable and helps many of us to link up everything. If something goes wrong with the app, he gets on it right away to fix it. It's easy to see why Orion wanted to have him on the team.
                        <br /><br />
                        "What do you mean the app won't deploy?! Fine, I'll do it myself"
                        </p> 
                    </div>
                </div>

                <div className="card">
                    <div className="card_body">
                        <img src={andre_selfie} className="card_image"></img>
                        <h2 className="card_title">Andre Rodriguez</h2>
                        <p className="card_description">Backend developer and database handler, he can set up a database easy and keep the whole team up to date on it. He's got a handle on API development as well, getting the backend up and running and sporting a cool hat along the way.
                        <br /><br />
                        "Database? More like Data-ace"
                        </p> 
                    </div>
                </div>

                <div className="card">
                    <div className="card_body">
                        <img src={dylan_selfie} className="card_image"></img>
                        <h2 className="card_title">Dylan Reuter</h2>
                        <p className="card_description">Backend developer, his enthusiasm for learning all aspects of the process is unparalleled. He's ready to jump in and learn any role in a project. An all-around handyman using his multi-purpose development toolbox.
                        <br /><br />
                        "Yeah bro, frontend, backend, middle-end, whatever it is I'm down dude"
                        </p> 
                    </div>
                </div>

                <div className="card">
                    <div className="card_body">
                        <img src={redVelvet} className="card_image"></img>
                        <h2 className="card_title">Allexis Knight</h2>
                        <p className="card_description">Frontend developer and web designer. She loves visual aesthetics so does her best to apply her artistic skills to the website layout. While also struggling to maintain accessibility and not flood the website with colors.
                        <br /><br />
                        "I totally suggested the mascot on purpose, I totally wasn't looking for an excuse to draw or anything..."
                        </p> 
                    </div>
                </div>
            </div>
        </div>
    )
}


export default About;