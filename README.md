# Adult Cam Sites

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Thirdweb as the IPFS Storage and Web3 Wallet

Here ThirdWeb is used as IPFS storage and also as a Web3 wallet, you are free to use anything else for IPFS storage or Web3 wallet [thirdweb-dev](https://portal.thirdweb.com/react/v4/getting-started).

### `Fitures`

- Web3 wallet for user can connect and get to their saved videos
- Saved videos, user can save videos to their list
- PWA supported, and overlay PWA on footer make it easy to spot and install by button
- Light and dark mode
- Download button (for live video it trigger for got to room at their platform, other that it trigger for download videos)
- Shortener url, that will trigger with download button, this will shorten the url and go to shortnener url site before go to main url
- Comment form, user can post a comment

### `Replace with yours`

- Create and input your API in .env file or on environment platform dashboard

  ### ThirdWeb client id
  `REACT_APP_TEMPLATE_CLIENT_ID`

  ### Database endpoint for saved videos and user comment
  `REACT_APP_SAVED_VIDEOS_ENDPOINT`
  `REACT_APP_COMMENT_LIST_ENDPOINT`
  `REACT_APP_POST_COMMENT_ENDPOINT`

  ### Shortener API url from thirdparty site
  `REACT_APP_SHORTENER_URL_ENDPOINT`

  ### Your backend API endpoint for fetch videos from external sites that error on CORS
  `REACT_APP_BACKEND_VIDEO_ENDPOINT`

  ### Your API with webmaster id
  `REACT_APP_CHATURBATE_VIDEO_ENDPOINT`

  Apart from that, for other API video URLs you can use the ones that already exist on each platform page.
- npm install
- npm build
- npx thirdweb@latest upload build -k `<secret key>`

### `Sample site`

- Sample site with Web3 domain `0xtubevideos.crypto`
