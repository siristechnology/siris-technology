# SirisTechnology

## Running the application

* `yarn dev`: To run dev version
* `yarn build`: To build the application
* `yarn serve`: To run the built version locally


GatsbyJs server will start in `localhost:8000`


## Folder Structure

```
/packages
	/common [All common components and resource]
		/Assets
		/components
		/contexts
		/data
		/theme
	/functions
	/landing-gatsby [Gatsby version of the project]
```

# Stack We Have Used

1. Lerna (A tool for managing JavaScript projects with multiple packages. https://lerna.js.org/)
2. Yarn Workspace
3. React Js
4. Gatsby Js
5. Styled System and Styled Components
6. Netlify Deployment.


# Explaining Containers

In the `containers` directory you will get folder for our every template. If you want to use App template. Then in the `App` directory you will get folders containing different section of the template like `Banner`, `Footer`, `Testimonial`, `Navbar` etc.

All of these containers contains regular reactjs code.

