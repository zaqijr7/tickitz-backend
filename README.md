<h1> BACKEND APP WITH NODE, EXPRESS AND MYSQL </h1>

<h2> Requirements </h2>

- NodeJS v12 LTS
- MySQL v8


<h2> How To Run This App </h2>

- Make sure you had clone this repo
- Copy environment from `.env.example` to `.env`
- Configure your .env file according to your Mysql credentials
- Open your terminal in this project and run <br>
  `
 npm i
  `
 
- And Then run <br>
`
 npx nodemon
`
<h2> API SPECS </h2>

- GET `admin/movies` Route for get all Movies by Admin
- GET `admin/cinemas` Route for get all Cinemas by Admin
- GET `admin/shw-times` Route for get all Show TImes by Admin
- GET `admin/seat` Route for get all Seats by Admin
- GET `admin/genre` Route for get all Genres by Admin
- GET `admin/movies:id` Route for get Movie by Id
- GET `admin/cinemas:id` Route for get Cinema by Id
- GET `admin/shw-time:id` Route for get Show Time by Id
- GET `admin/seat:id` Route for get Seat by Id
- GET `admin/genre:id` Route for get Genre by Id
- GET `/movies` Route for get all Movie by User
- GET `/cinemas` Route for get all Cinemas by User
- GET `/shw-times` Route for get all Show TIme by User
- GET `/seat` Route for get all Seats by User
- GET `/genre` Route for get all Genres by User
- PUT `/profile` Route for Update Profile
- POST `/auth/login` Route for Login User and Admin
- POST `/transaction` Route for Buy Ticket
- POST `/register` Route for Register User
- POST `/admin/register` Route for Register Admin
- POST `admin/movies` Route for register new Movies
- POST `admin/cinemas` Route for register new Cinema
- POST `admin/shw-time` Route for register new Show Time
- POST `admin/seat` Route for register new Seat
- POST `admin/genre` Route for register new Genre
- PATCH/DELEtE `admin/movies:id` Route for modify movie on database
- PATCH/DELEtE `admin/cinemas:id` Route for modify cinema on database
- PATCH/DELEtE `admin/shw-times:id` Route for modify Show Time on database
- PATCH/DELEtE `admin/seat:id` Route for modify seat on database
- PATCH/DELEtE `admin/genre:id` Route for modify genre on database


