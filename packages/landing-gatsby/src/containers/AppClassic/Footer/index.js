import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Logo from 'reusecore/src/elements/UI/Logo'
import Container from 'common/src/components/UI/Container'
import FooterArea, { WidgetArea, MenuArea, Menu, MenuItem, CopyrightText } from './footer.style'

const Footer = () => {
	const data = useStaticQuery(graphql`
		query {
			appClassicJson {
				footer {
					logo {
						publicURL
					}
				}
			}
		}
	`)
	const { logo } = data.appClassicJson.footer

	const date = new Date()
	const year = date.getFullYear()

	return (
		<FooterArea>
			<Container>
				<MenuArea>
					<Logo className="logo" href="/" logoSrc={logo.publicURL} title="" />
					<CopyrightText>info@siristechnology.com</CopyrightText>
					<CopyrightText>Copyright ({year}) by Siris Technology</CopyrightText>
				</MenuArea>
			</Container>
		</FooterArea>
	)
}

export default Footer
