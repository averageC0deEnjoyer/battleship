// import "./style.css" // after finish everything, dont forget to delete scriptTag and linkTag ( this will make jest error, try research about how to import css from src so it can move to dist)
// how to make style.css from src to dist after webpacking? also, liveserver still needed cause if i edit some template.html while npm --watch, then it wont change the html, i need to reopen. so the ideal IMO liveServer in SRC, after final(htmlcss) then npxwebpack

import screenController from "./screenController";


screenController();

// another idea (every cell push and cellObj , then add isAvailable prop when placing Ship to add contraints cant put surround oneplusCoords)

// another things to do, make the computer smart

// later on can polish the design , refactor to make code cleaner(maybe?)

// things that always have to be considered , when creating something, just do the model first (can be played by using console.log), DOM only get data from the model, no handling logic in DOM,
// so edge case handled in the model.

// can separate each FF to each file 