<p align="center">
  <a href="" rel="noopener">
 <img width=75px height=75px src="https://user-images.githubusercontent.com/40510223/180670733-9357d0b7-771e-4802-92f7-1d824c215543.png" alt="Project logo"></a>
</p>

<h1 align="center">Peri</h1>

<div align="center">

  [![Last Commit](https://img.shields.io/github/last-commit/asecco/peri)](https://github.com/asecco/peri)
  [![GitHub stars](https://img.shields.io/github/stars/asecco/peri)](https://github.com/asecco/peri/stargazers)
  [![GitHub Issues](https://img.shields.io/github/issues/asecco/peri.svg)](https://github.com/asecco/peri/issues)
  [![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

<p align="center">
  <a href="#about">About</a> •
  <a href="#features">Features</a> •
  <a href="#frequently-asked-questions">FAQ</a> •
  <a href="#contributing">Contributing</a> •
  <a href="#setup">Setup</a> •
  <a href="#built-with">Built With</a> •
  <a href="#screenshots">Screenshots</a> •
  <a href="#license">License</a>
</p>

---

<p align="center"> Browse your favorite movies/tv and find the perfect watch for the night, personalized with recommendations based on what you’ve enjoyed.
  <br> 
</p>

![demo](https://github.com/asecco/peri/assets/40510223/bd177949-df1b-4ffb-85e8-0625cf52a8db)

<p align="center">Like what you see? Please consider giving Peri a GitHub Star ⭐, it will help a lot!</p>

## About
Peri was originally designed to be similar to a modern streaming media service with the UI being inspired by platforms such as [Plex](https://www.plex.tv) and [Hulu](https://www.hulu.com). Peri includes no streaming functionality and serves as an extensive database of films and tv series, allowing you to browse and garner information on whichever type of media you desire.

## Features
- Personalized recommendations
- Modern UI and fully mobile responsive
- Direct links to legal streaming options(Netflix, Prime Video, Apple TV, etc.)
- Embedded trailers
- Comment section for reviewing/discussing with the community
- Local storage for saving favorites
- Lazy loading
- Server-side rendering via Next.js

## Frequently Asked Questions
### What is the purpose of Peri, and why should I use it?
- I've always wanted Peri to be a great resource for avid movie/tv fans like myself to browse different content and find what they desire.
- If you're debating why you should start using Peri over any alternatives, I think that a strength of Peri is that it's not overly complex and includes a lot of unique features as listed above.
- I'm also consistently updating the site and always looking for ways to improve the overall feel and functionality.

### My favorites disappeared, what happened to them?
- Instead of opting for a more traditional account creation process, I use your browser's local storage to store the favorites. I find this is better for simplicity's sake and overall convenience for users.
- If you recently lost your favorites, you likely switched your browser/device or cleared your browser's cache. Unfortunately, there is not currently a way of retrieving the lost data.

### Can I contribute to this project?
- Yes! Head down to the [contributing](#contributing) section to learn more about how you can help!

## Contributing
I would love to expand upon this project over time with continuous updates to ensure it remains up-to-date and a great resource for movie fans.

Pull requests are welcome! Head over to the [issues](https://github.com/asecco/peri/issues) section to see if there is anything currently open, and head down to the [setup](#setup) section to get your development environment configured.

![upates2](https://user-images.githubusercontent.com/40510223/184010219-96e98fde-8f7e-4383-8fac-f25b2f914d0f.gif)
![updates](https://user-images.githubusercontent.com/40510223/184007866-240f831c-6d52-43b5-8414-b5c1f93f0aa0.gif)

## Setup
1. Clone the repo
```sh
git clone https://github.com/asecco/peri.git
```
```sh
cd peri
```

2. Install the dependencies
```sh
yarn install
```

3. Create a file for the environment variables in the root directory called `.env.local` in the following format
```js
NEXT_PUBLIC_API_KEY = key
NEXT_PUBLIC_WATCHMODE_API_KEY = key
NEXT_PUBLIC_YOUTUBE_API_KEY = key
```

4. Replace "key" with your API keys after registering on [TMDB](https://www.themoviedb.org/documentation/api), [Watchmode](https://api.watchmode.com), and [YouTube](https://developers.google.com/youtube/v3/getting-started). All API keys are free to obtain.

5. Start the development server
```sh
yarn run dev
```

## Built With
- [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org)
- [![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org)
- [![Tailwind CSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)

## Screenshots
![2](https://user-images.githubusercontent.com/40510223/183317859-df3c7836-9205-4c9f-9958-193198b2b748.png)
![3](https://user-images.githubusercontent.com/40510223/184006853-ee9cca16-1640-4af2-a6e6-1734f4de1cc5.png)
![4](https://user-images.githubusercontent.com/40510223/183317876-81a41ca4-ca5d-485d-b38c-7082de656660.png)
![5](https://user-images.githubusercontent.com/40510223/184006885-829e79eb-c51e-436d-b368-e3e85741e42e.png)
![6](https://user-images.githubusercontent.com/40510223/229385353-342014fc-fbce-4788-ba5e-f96d05a227cc.png)
![7](https://user-images.githubusercontent.com/40510223/183317881-c23ebeba-65e8-4a34-b3b8-ab3739f5d15c.png)
![8](https://user-images.githubusercontent.com/40510223/183317882-ecf9766e-fe4b-4a36-959f-a686177f69f2.png)

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
