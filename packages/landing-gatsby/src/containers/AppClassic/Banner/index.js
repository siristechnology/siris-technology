import React from 'react'
import Fade from 'react-reveal/Fade'
import Text from 'reusecore/src/elements/Text'
import Image from 'reusecore/src/elements/Image'
import Link from 'reusecore/src/elements/Link'
import Heading from 'reusecore/src/elements/Heading'
import Container from 'common/src/components/UI/Container'
import BannerWrapper, { BannerContent, BannerImage, ButtonGroup, RatingInfo } from './banner.style'
import Rating from 'common/src/components/Rating'

import bannerImg from 'common/src/assets/image/appClassic/bannerImg.webp'
import googlePlayBadge from 'common/src/assets/image/appClassic/google-play-badge.png'
import google from 'common/src/assets/image/appClassic/google.svg'

const Banner = () => {
	return (
		<BannerWrapper id="home">
			<Container>
				<BannerContent>
					<Fade up>
						<RatingInfo>
							<Rating rating={4} />
							4.8 of 5 on <img src={google} alt="Google" height="20" />
						</RatingInfo>
					</Fade>
					<Fade up delay={100}>
						<Heading as="h1" content="NepalToday App is now available in Android Store" />
					</Fade>
					<Fade up delay={200}>
						<Text content="A news aggregation app that delivers relevant trending news from Nepal" />
					</Fade>
					<Fade up delay={300}>
						<ButtonGroup>
							<Link
								href="https://play.google.com/store/apps/details?id=com.siristechnology.nepaltodayapp"
								target="_blank"
							>
								<Image src={googlePlayBadge} alt="Banner" style={{ height: 80 }} />
							</Link>
						</ButtonGroup>
					</Fade>
				</BannerContent>
				<BannerImage>
					<Fade up delay={100}>
						<Image src={bannerImg} alt="Banner" />
					</Fade>
				</BannerImage>
			</Container>
		</BannerWrapper>
	)
}

export default Banner
