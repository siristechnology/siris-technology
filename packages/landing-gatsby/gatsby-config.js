const path = require('path')

module.exports = {
	siteMetadata: {
		title: 'A technology company',
		description: `A technology company`,
		author: `@SirisTechnology`
	},
	plugins: [
		`gatsby-plugin-sharp`,
		`gatsby-transformer-sharp`,
		{
			resolve: 'gatsby-plugin-alias-imports',
			options: {
				alias: {
					common: path.resolve(__dirname, '../common'),
					reusecore: path.resolve(__dirname, '../reusecore')
				}
			}
		},
		{
			resolve: `gatsby-plugin-styled-components`,
			options: {
				minify: false // Breaks styles if not set to false
			}
		},
		`gatsby-plugin-react-helmet`,
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `images`,
				path: `${__dirname}/src/images`
			}
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `common`,
				path: `../common/src/assets/`
			}
		},
		`gatsby-transformer-json`,
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `data`,
				path: `../common/src/data/`
			}
		},
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `gatsby-starter-default`,
				short_name: `starter`,
				start_url: `/`,
				background_color: `#663399`,
				theme_color: `#663399`,
				display: `minimal-ui`,
				icon: `src/images/favicon.png` // This path is relative to the root of the site.
			}
		},
		{
			resolve: `gatsby-plugin-google-fonts`,
			options: {
				fonts: [
					`Roboto\:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i`,
					`Poppins\:300,400,500,600,700`,
					`Lato\:300,400,700`,
					`Open Sans\:300,400,600,700,800`,
					`Raleway\:500,600`,
					`Heebo\:300,400,500,600,700,800`
				]
			}
		}
		// this (optional) plugin enables Progressive Web App + Offline functionality
		// To learn more, visit: https://gatsby.app/offline
		// 'gatsby-plugin-offline',
	]
}
