# lotify-proefopdracht

Made with Vite + Vue3 boilerplate (`npm create vue@latest`)

Comes with simple Storybook integration to help develop standalone components (`npx sb@latest`).

## Provided acceptance criteria

- Data (excluding images & links) served from graphQL endpoint
- Cards fade in (0 -> 1 opacity)
- Card loading state -> rgba(0,0,0 .2)
- Progress bar visible after reaching € 500 donation amount
- Hover over card slides up CTA button, CTA button always visible on mobile devices
- Framework Nuxt 3 / Vue 3

[Figma design](https://www.figma.com/file/e8JqQpcKRNHIbsxeNsyr8p/Proefopdracht-Lotify----2024?type=design&node-id=12-1268&mode=design&t=AwJZJ6FkqUROhbds-0)

## Installation

### Requirements

Application was built & ran using the following versions:

- NPM V9.5.0
- NodeJS V18.15.0

### How to run

- Create `.env` file in root dir
- Add `VITE_APP_API_URL` To .env (`https://api.venki.nl/graphql`)
- Run `npm i`
- Run `npm run dev`

### Notes

Most likely CORS issues will pop up due to requesting from a http/local environment to a https endpoint. There are some ways to get around this using chrome by  using the `--disable-web-security` flag and running chrome. In practice either a local development api, a proxy or a dev api endpoint is used.

## Storybook

Since the `VITE_APP_API_URL` expects a url that references an actual api that serves the data in the expected format, the component in question (`FeaturedProductItem`) can also be inspected locally in the Storybook UI.

This also allows for the component to be tested with different state data (donation amount,  goal, ticket price, mobile layouts etc.).

#### How to run

- Run `npm run storybook`