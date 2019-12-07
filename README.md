# newsalbum :newspaper:

---

newsalbum is an app designed for millenials to have a quick glance at the top ten latest articles of popular news sources in the STEM industry including National Geographic, The New Scientist, and Google News.

Users are able to:

- Easily browse a variety of news sources in an Instagram-like, photo-forward approach
- Favorite their chosen articles (which persist on re-load)
- Read the full article from the original website with the `'READ'` button
- Copy the URL to send to a friend with the `'COPY'` button

---

### :white_check_mark: Installation & Set Up

Clone this repo:

- `git clone https://github.com/whitneyburton/news-album.git`

Install dependencies:

- `npm install`

News API set up:

- Go to [newsapi.org](https://newsapi.org/) and click `Get API key`
- Sign up for an account. Then add an `.env` file to the root (`src/.env`), and within it, paste the following:
  `REACT_APP_NEWS_API_KEY=[YOUR API KEY HERE]`

Start local host:

- `npm start`

To run testing suite and check coverage:

- Test: `npm test` Coverage: `npm test -- --coverage`

---

### :computer: Technologies

- React
- Redux
- Redux Thunk middleware
- React Router
- SCSS
- Jest/Enzyme

---

### :eyes: Preview

![2019-02-27 00 11 56](https://user-images.githubusercontent.com/33883645/53472268-6a68d680-3a24-11e9-9192-97aa76f6b93c.gif)

---

### :pencil2: Wireframing

[Figma](https://www.figma.com/file/SdMhd9WENKmqU0srR8GfsyBp/newsalbum?node-id=0%3A1)

---

#### :clipboard: Original Assignment

[Binary Challenge](http://frontend.turing.io/projects/binary-challenge.html) from Turing School of Software & Design.
_(Unfortunately, no longer available)_

---

#### :no_entry_sign: Issues

RIP [Waffle.io](https://waffle.io/whitneyburton/news-album) :sob:

---

#### :information_desk_person: Contributors

[Whitney Burton](https://github.com/whitneyburton)

---

#### :raised_hands: Attribution

Powered By [News API](https://newsapi.org/)

---

_This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app)._
