import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Fade from 'react-reveal/Fade'
import Text from 'reusecore/src/elements/Text'
import Heading from 'reusecore/src/elements/Heading'
import Container from 'common/src/components/UI/Container'
import SectionWrapper, { PricingArea, InnerWrapper, PricingCard } from './team.style'
import { SectionHeader } from '../appClassic.style'

const PricingPolicy = () => {
	const data = useStaticQuery(graphql`
		query {
			appClassicJson {
				team {
					members {
						id
						name
						icon
						features {
							id
							text
						}
					}
				}
			}
		}
	`)
	const { members } = data.appClassicJson.team

	return (
		<SectionWrapper id="team">
			<Container>
				<SectionHeader>
					<Fade up>
						<Heading as="h5" content={'Team'} />
					</Fade>
				</SectionHeader>
				<PricingArea>
					<InnerWrapper>
						{members.map((item) => (
							<PricingCard key={`card--key${item.id}`}>
								<div className="card-header">
									<Heading as="h3" content={item.name} />
									<Text content={item.description} />
								</div>
								<div className="card-body">
									<ul className="feature-list">
										{item.features.map((item) => (
											<li key={`feature--${item.id}`}>{item.text}</li>
										))}
									</ul>
								</div>
								<div className="card-footer"></div>
							</PricingCard>
						))}
					</InnerWrapper>
				</PricingArea>
			</Container>
		</SectionWrapper>
	)
}

export default PricingPolicy
