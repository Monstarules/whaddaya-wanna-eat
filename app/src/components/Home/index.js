import React, {useState} from 'react';
import banner from '../../banner.png';
import swift from '../../swift.png';
import rightArrow from '../../rightArrow.png';
import leftArrow from '../../leftArrow.png';
import carouselPics from './carouselPics.js';
import './index.css';

const Home = ({slides}) => {
	const [current, setCurrent] = useState(0);
	const length = slides.length;

	if(!Array.isArray(slides) || slides.length <= 0){
		return null
	}

	const nextSlide = () => {
		setCurrent(current == length-1 ? 0 : current+1);
	};

	const prevSlide = () => {
		setCurrent(current == 0 ? length-1 : current-1);
	};

    return (
		<div>
        	<div className="Banner">
				<header className="App-header">
					<img src={banner} className="App-banner" alt="banner"/>
				</header>
			</div>
			<div className="paragraph">
				<h1>Hungry? Let us pick the place</h1>
				<p class="text">Have you ever had those moments where you're ready to get a bit of food, but can't decide where you want to eat? Maybe it's even caused a big delay in getting the food because you can never settle on an option? Well we're here to help.</p>
				<p class="text">Introducing <b className="whaddaya">Whaddaya Wanna Eat</b>, a mobile app that is here to resolve your food dilemma. Our app takes your restaurant picks, as well as the picks of anyone eating with you, randomizes them, and picks a place to eat for you. No more indecisiveness or spending ages deciding on what to eat, because <b className="whaddaya">Whaddaya Wanna Eat</b> will decide in moments. All that you have to do is enjoy your food.</p>
				<p class="text">So, how does the app work? Well just click through the steps below to learn how to operate our app.</p>
			</div>
			<div className='slider'>
				<img src={leftArrow} className='left-arrow' onClick={prevSlide}/>
				<img src={rightArrow} className='right-arrow' onClick={nextSlide}/>
				{carouselPics.map((slide,index) => {
					return (
					<div className={index === current ? "slide active" : "slide"} key={index}>
						{index === current && (< img src={slide.image} className="step" alt="steps"/>)}
					</div>
					)
				})}
			</div>
			<div>
				<p class="text">Easy, right? That's because our goal with this app is to give you an easy route directly to the restaurant, and eliminate any hassle in getting to your meal. Interested in trying it for yourself? Click the link below to download it for your mobile device today, so we can help you decide, <br /><b className="whaddaya">Whaddaya Wanna Eat?</b></p>
			</div>
			<div>
				<img class="App-swift" src={swift} width="300" height="90" className="App-swift" alt="swift"/>
			</div>
		</div>
    )
}

export default Home;
