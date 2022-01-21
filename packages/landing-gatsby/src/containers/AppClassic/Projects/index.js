import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Fade from 'react-reveal/Fade'
import { Icon } from 'react-icons-kit'
import { mediaRecordOutline } from 'react-icons-kit/typicons/mediaRecordOutline'
import { plus } from 'react-icons-kit/typicons/plus'
import { starOutline } from 'react-icons-kit/typicons/starOutline'
import Text from 'reusecore/src/elements/Text'
import Heading from 'reusecore/src/elements/Heading'
import Container from 'common/src/components/UI/Container'
import FeatureBlock from 'common/src/components/FeatureBlock'
import { SectionHeader } from '../appClassic.style'
import SectionWrapper, { FeatureWrapper, ImageWithCircleBackground } from './projects.style'

const Projects = () => {
	const data = useStaticQuery(graphql`
		query {
			appClassicJson {
				projects {
					slogan
					title
					features {
						id
						link
						bgColor
						icon {
							publicURL
						}
						title
						description
					}
				}
			}
		}
	`)
	const { slogan, title, features } = data.appClassicJson.projects

	return (
		<SectionWrapper id="projects">
			<Container>
				<SectionHeader>
					<Fade up>
						<Heading as="h5" content={slogan} />
						<Heading content={title} />
					</Fade>
				</SectionHeader>
				<FeatureWrapper>
					{features.map((item) => (
						<Fade up delay={100 * item.id} key={`key-feature--key${item.id}`}>
							<FeatureBlock
								style={{ '--color': `${item.color}` }}
								icon={
									<a href={item.link} target="_blank">
										<Icon className="plus" icon={plus} />
										<Icon className="circle" icon={mediaRecordOutline} />
										<ImageWithCircleBackground
											src={item.icon.publicURL}
											alt={item.title}
											bgColor={item.bgColor}
										/>
										<Icon className="star" icon={starOutline} />
									</a>
								}
								title={
									<a href={item.link} target="_blank">
										<Heading as="h3" content={item.title} />
									</a>
								}
								description={<Text content={item.description} />}
							/>
						</Fade>
					))}
				</FeatureWrapper>
			</Container>
		</SectionWrapper>
	)
}

export default Projects
