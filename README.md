# lap-2-code-challenge
## Description
- At the moment all the posts are visible below the form and when you submit a new post it is appended above the other posts.
- Now we realise that the jwt token needs to be added so that only the person who subbitted the post can have access to it, so we'll add this.
- Sorry if it's a bit confusing/messy, thanks for the review :)
## Istallation and Usage
### Installation
1. Fork and/or clone this repo.
2. In the current directory run `bash _scripts/teardown.sh` to ensure no containers or volumes are already being used on your system.
3. As an additional optional step you can `cd api` to get into the api directory and then run `npm install` to install the npm packages seperately. This will happen everytime you run the `startDev.sh` script, but doing it seperately may help solve some initial errors that appear when running these scripts for the first time.
### Usage
- In the initial directory run `bash _scripts/startDev.sh` to start the api.
- Right click on `index.html` and select open live server to view in browser.
- The api can be viewed on `localhost:3000`
