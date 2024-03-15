# intro

- find objects in an image
- an app the feel very similar to photo tagging app
- **user will make selections for each character and they will be given feedback on whether they are correct or not**
- choose a photo, identify exactly each person position, store that position in db
- when user click the photo, a target box around the portion of the photo user has clicked, that box should contain a list of possible characters
- after they select one of possible characters, check with backend to see if that character is actually within the targeting box.
- then give them feedback whether
  - if wrong, error message
  - if correct, place a marker on the photo in the character's location
  - in both case, remove the targeting box until the user clicked again
- keep track of time when photo loaded till user finds all characters (do this on the server)
- then ask user's name and store record in score board

# assignment

- think completely through and plan out on the paper will save you days of coding
- build the frontend functionality without actually using any calls to the backend yet
  - create the functionality that pops the targeting box and dropdown menu on the screen when the user clicks on the photo and removes it when user clicks away of choose a character from the dropdown menu
- now connect the functionality for validating with backend whether or not user has clicked the right place for the character they selected from the dropdown
  - **note**
  - depending on how you are getting the coordinates of a user's clicks, different screen sizes may produce different coordinates
  - this could cause your app to record coordinates properly on a large screen size, but not the smaller ones.
  - so you may need to implement methods to your click logic that normalize coordinates across different screen size
- tie into frontend, to select characters, validate characters, place the appropriate markers on the map if the selection was correct
- ask user to enter their name to store leader board
- play with it
- push to github and deploy
- extra credit
  - select multi game play

# database

- [x] Game: keep track of each time someone play a game
  - [x] properties
    - [x] startTime
    - [x] firstFound
    - [x] secondFound
    - [x] endTime
    - [x] name
    - [x] gameId (client create 1 when press playRound and send to server to identify the following requests are in the same Game)
    - [x] characters (an array contain 3 positions to check, the same in every game, remove the position that user found each time till no position left then game end) e.g. `[{x: , y: , name: waldo}, {x: , y: , name: wizard}, {x: , y: , name: odlaw}]`
  - [x] virtuals
    - [x] timePlay
    - [x] timeStartFormatted
    - [x] timeStartUnix

# back api design

- [x] `POST /api/v1/game/` start game
- [x] `PUT /api/v1/game/`
  - [x] found characters (update time)
  - [x] update user name
- [x] `GET /api/v1/game` fetch games have been played
- [x] `DELETE /api/v1/game` cleanup empty games

# front (no solutions support responsive design | no solutions are responsive) how things flow

- [x] `/`
  - [x] intro image
  - [x] links to `/play-n`
  - [x] link to `/score`
- [x] `/game`
  - [x] timer start counting when game load
  - [x] display characters that user needs to find
  - [x] display a game canvas for user to find
    - [x] click on canvas will show a drop down to select (don't know how)
    - [x] user select one in the drop down
      - [x] if correct mark character as found
      - [x] if wrong alert them
    - [x] all characters are found, stop the timer
    - [x] display time and ask for name, submit will redirect user to `/score`
- [x] `/score`
  - [x] display all existed scores
  - [ ] sort feature
  - [x] clear not finish plays
- [x] components
  - [ ] `NavigateButton` (`Play`, `Score`) (`to={}`)
  - [ ] `CustomButton` (`Submit`, `Cleanup`) (`onClick={}`)
  - [ ] `Dropdown` (`position={}`)
    - [ ] `DropDownButton` (`name={}`)
  - [x] `Character` (`found={} name={} imageLink={}`)
  - [x] `Loading` (`className={}`)
  - [x] `Error`(`className={}`)
  - [x] `GameResult` (`name={} firstFound={} secondFound={} playTime={} playedAt={} afk={}`)
  - [x] `Timer` (``)

# under the hood

- [x] `/`
- [x] `/game`
  - [x] send a `startTime` and `uuid` to server to identify a new `Game` just started (`POST` request)
  - [x] each button in dropdown will send a request to server to check if current `position` and button `name` and `uuid` is match with current `Game` on the server's character left. (`PUT` request)
    - [x] if correct then update necessary info (like `firstFound`, `secondFound`, `endTime`, `characters` array)
      - [x] if still have characters to play then send success response back to user tell them how many left
      - [x] if no character left to play then response a special one to notify winning
        - [x] users will enter their name and send another put request to update current `Game` user name to display then redirect to `/score`
    - [x] if wrong then send error message back to user
- [x] `/score`
  - [x] fetch to get all scores
  - [x] fetch to delete empty scores

# problems

- we should keep track of time on server, but how to we know `Game`s that only have `startTime` and not `endTime` (case user quit middle game)?
  - solved: we implement a `DELETE /api/v1/score` and ask user to clean up for us (if you see the score board is being bloated by empty time record, please help us to clean up by pressing this button)
- should we create a database for coordinates (since we only have 3 objects and create a whole schema for it and we have to do database operations on it or we just need to hard code it)?
  - solved: hard code in each `Game` Schema with an array of 3 positions
- how do we know which which `Game` start or end or found an object is the same `Game`?
  - when the game first start, frontend will generate a `uuid` send to server to identify the same `Game` is play by sending that `uuid` with the following requests
- how to know what coordinates user choose?
  - example of `x` coordinate `const pxFromLeft = e.x - e.target.x` (`x` of the `click` event minus `x` of the `image`) then `const percentFromLeft = Math.floor((pxFromLeft / e.target.width) * 100)` (calculate `%` of the click with the `image`) and that make `position` consistent no matter which size is the `image`
- how to create a pop up at coordinate to choose character? and hide it when we are not focus to it
  - first we create a popup which move to the position we clicked
  - the we make it `scale(1)` when `:hover` and `scale(0)` when stop hovering
  - because when we click will make it appear under our cursor (we hover it) so those same buttons can move any where inside our image
- 2 game create every time we go to `/game` (because that's how react re-render works?)
  - it's because `<React.StrictMode></App></React.StrictMode>` will render 2 times, change to `</App>` to only render once which will stop our game from being bloated too much with `NaN` plays

# realized

- we actually have to go to database to setting the project time zone in order for it to store correct date and time (but i came back to previous project and set timezone of database but don't work out, maybe the time zone problem is because the hosting server of `glitch` and not database)
- we can use `loader` to work like a custom hook to fetch? `Myth`
- we can't set dynamic position value in tailwind arbitrary values e.g.
  this don't work (i tried that syntax with a fix `%` value and it still works)

```
className={'...' + ' ' + `top-[${position.dynamic}%]`}
```

this work

```
style={{ top: position.dynamic + '%'}}
```

- that to easily handle create new game's time, we should send the request from frontend using `epoch` time format instead of JavaScript's `Date` object
- `body('username').trim().escape()` can cause a bug when `username` is `undefined` (not sent in `req.body`) but get turn into `''` (an empty string)
