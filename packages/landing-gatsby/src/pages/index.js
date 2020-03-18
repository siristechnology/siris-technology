import React from 'react'
import { ThemeProvider } from 'styled-components'
import { theme } from 'common/src/theme/appclassic'
import { ResetCSS } from 'common/src/assets/css/style'
import Sticky from 'react-stickynode'
import Navbar from '../containers/AppClassic/Navbar'
import Banner from '../containers/AppClassic/Banner'
import KeyFeatures from '../containers/AppClassic/KeyFeatures'
import AppSlider from '../containers/AppClassic/AppSlider'
import Features from '../containers/AppClassic/Features'
import Team from '../containers/AppClassic/Team'
import Footer from '../containers/AppClassic/Footer'
import GlobalStyle, { AppWrapper, ContentWrapper } from '../containers/AppClassic/appClassic.style'

import SEO from '../components/seo'

export default function() {
	return (
		<ThemeProvider theme={theme}>
			<>
				<SEO title="Siris Technology" />
				<ResetCSS />
				<GlobalStyle />

				<AppWrapper>
					<Sticky top={0} innerZ={9999} activeClass="sticky-active">
						<Navbar />
					</Sticky>
					<ContentWrapper>
						<Banner />
						<AppSlider />
						<KeyFeatures />
						<Features />
						<Team />
					</ContentWrapper>
					<Footer />
				</AppWrapper>
			</>
		</ThemeProvider>
	)
}
