import React, { Fragment } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Text from 'reusecore/src/elements/Text'
import Image from 'reusecore/src/elements/Image'
import Heading from 'reusecore/src/elements/Heading'
import Container from 'common/src/components/UI/Container'
import FeatureBlock from 'common/src/components/FeatureBlock'
import GlideCarousel from 'common/src/components/GlideCarousel'
import GlideSlide from 'common/src/components/GlideCarousel/glideSlide'
import SectionWrapper, { CarouseWrapper, TextWrapper } from './appSlider.style'

const AppSlider = () => {
	const data = useStaticQuery(graphql`
		query {
			appClassicJson {
				appSlider {
					title
					description
					features {
						id
						icon
						title
						description
					}
					carousel {
						id
						title
						image {
							publicURL
						}
					}
				}
			}
		}
	`)
	const { title, description, features, carousel } = data.appClassicJson.appSlider

	const glideOptions = {
		type: 'carousel',
		gap: 0,
		autoplay: 5000,
		perView: 1,
		animationDuration: 700
	}

	return (
		<SectionWrapper>
			<Container>
				<CarouseWrapper>
					<GlideCarousel
						bullets={true}
						controls={false}
						numberOfBullets={5}
						options={glideOptions}
						carouselSelector="appFeatureSlider"
					>
						<Fragment>
							{carousel.map((item) => (
								<GlideSlide key={`feature-side--key${item.id}`}>
									<Image src={item.image.publicURL} alt={item.title} />
								</GlideSlide>
							))}
						</Fragment>
					</GlideCarousel>
				</CarouseWrapper>
				<TextWrapper>
					<Heading content={title} />
					<Text content={description} />
					{features.map((item) => (
						<FeatureBlock
							key={`app-feature--key${item.id}`}
							iconPosition="left"
							icon={<i className={item.icon}></i>}
							title={<Heading as="h3" content={item.title} />}
							description={<Text content={item.description} />}
						/>
					))}
				</TextWrapper>
			</Container>
		</SectionWrapper>
	)
}

export default AppSlider
