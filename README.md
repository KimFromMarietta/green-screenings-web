## green-screenings-api

This apis is for managing personal movie ratings for the React Native project (GreenScreenings)[https://github.com/kjintroverted/green-screenings]. It leverages the (OMDB API)[http://www.omdbapi.com/] for movie data and adds an personalized rating system.

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
