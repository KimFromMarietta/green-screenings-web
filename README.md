<<<<<<< HEAD
## green-screenings-api

This api is for managing personal movie ratings for the React Native project [GreenScreenings](https://github.com/kjintroverted/green-screenings). It leverages the [OMDB API](http://www.omdbapi.com/) for movie data and adds an personalized rating system.

Currently hosted on a Heroku free dyno, so responses may be slower than expected.

### Endpoints

* `/api/movies`
  * GET 
    * searches movies in the OMDB
    * expects:
      * query param: 'title`

* `/api/movies/:imdbid`
  * GET
    * retrievs info for a given movie
    
* `/api/ratings`
  * GET
    * retrieves all movies that have been rated
  * PUT
    * adds a movie to your ratings
    * expects:
      * JSON: movie object to be added

* `/api/ratings/tags`
  * GET
    * returns an array of all tags used across ratings
    

* `/api/ratings/years`
  * GET
    * returns an array of all release years from rated movies
    
* `/api/ratings/:id`
  * DELETE
    * removes a rating from the collection
=======
## Setup

1. `yarn install`
2. `npm i -g concurrently`
3. install mongodb
4. create env vars
  * MONGO_URL - url to the DB host you plan to use (most likely localhost)
  * MOVIE_DB - name of the DB you want to connect to
  * IMDB_API_KEY - your key to access the IMDB API
5. `npm run dev-serve`
>>>>>>> master
