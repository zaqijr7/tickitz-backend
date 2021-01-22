<h1> BACKEND APP WITH NODE, EXPRESS AND MYSQL </h1>

<h2> Requirements </h2>
<ul>
<li>NodeJS v12 LTS</li>
<li> MySQL v8</li>
</ul>

<h2> How To Run This App </h2>
<ul>
<li>Make sure you had clone this repo</li>
<li>Copy environment from `.env.example` to `.env`</li>
<li>Configure your .env file according to your Mysql credentials</li>
<li>Open your terminal in this project and run <br>
  ```
 npm i
  ```
 </li>
<li>And Then run <br>
  ```
 npx nodemon
  ```
 </li>
</ul>

<h2> API SPECS </h2>
<ul>
<li>GET `admin/movies` Route for get all Movies by Admin</li>
<li>GET `admin/cinemas` Route for get all Cinemas by Admin</li>
<li>GET `admin/shw-times` Route for get all Show TImes by Admin</li>
<li>GET `admin/seat` Route for get all Seats by Admin</li>
<li>GET `admin/genre` Route for get all Genres by Admin</li>
<li>GET `admin/movies:id` Route for get Movie by Id</li>
<li>GET `admin/cinemas:id` Route for get Cinema by Id</li>
<li>GET `admin/shw-time:id` Route for get Show Time by Id</li>
<li>GET `admin/seat:id` Route for get Seat by Id</li>
<li>GET `admin/genre:id` Route for get Genre by Id</li>
<li>GET `/movies` Route for get all Movie by User</li>
<li>GET `/cinemas` Route for get all Cinemas by User</li>
<li>GET `/shw-times` Route for get all Show TIme by User</li>
<li>GET `/seat` Route for get all Seats by User</li>
<li>GET `/genre` Route for get all Genres by User</li>
<li>POST `/transaction` Route for Buy Ticket</li>
<li>POST `admin/movies` Route for register new Movies</li>
<li>POST `admin/cinemas` Route for register new Cinema</li>
<li>POST `admin/shw-time` Route for register new Show Time</li>
<li>POST `admin/seat` Route for register new Seat</li>
<li>POST `admin/genre` Route for register new Genre</li>
<li>PATCH/DELEtE `admin/movies:id` Route for modify movie on database</li>
<li>PATCH/DELEtE `admin/cinemas:id` Route for modify cinema on database</li>
<li>PATCH/DELEtE `admin/shw-times:id` Route for modify Show Time on database</li>
<li>PATCH/DELEtE `admin/seat:id` Route for modify seat on database</li>
<li>PATCH/DELEtE `admin/genre:id` Route for modify genre on database</li>
</ul>

