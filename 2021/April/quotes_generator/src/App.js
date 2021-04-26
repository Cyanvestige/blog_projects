import { useState, useEffect } from "react";
import * as React from "react";
let randNum = Math.floor(Math.random() * 1643); //a random # between 0 and 1642
let promise = new Promise(
  (resolve, reject) =>
    fetch("https://type.fit/api/quotes")
      .then(function (response) {
        //try to fetch the data
        if (!response.ok) reject("Fetch failed"); //failed return the "error"
        return response.json(); //succeeded return the data
      })
      .then(function (data) {
        resolve(data[randNum]); //the data is ready!
      })
      .catch((err) => console.log(err)) //catch the error
);

/*Use traditional React.Component to setState()*/
// export class App extends React.Component {
//   constructor() { //initialization
//     super();
//     this.state = {};
//   }
//   componentDidMount() {
//     promise.then((value) => {
//       this.setState({ quote: value }); //define a class property "quote"
//     });
//   }
//   render() {
//     if (!this.state.quote) return null;
//     return (
//       <div className="App">
//         <div className="quotes"> //render the quotes in "quotes" div
//           <div className="text">{this.state.quote.text}</div>
//           <div className="author">--------{this.state.quote.author}</div>
//         </div>
//       </div>
//     );
//   }
// }

/*Use "Hook" to setState()(preferred)*/
function App() {
  const [quote, setQuote] = useState("");
  useEffect(() => {
    promise.then((data) => {
      setQuote(data);
    });
  });
  return (
    <div className="App">
      <div className="quotes">
        <div className="text">{quote.text}</div>
        <div className="author">--------{quote.author}</div>
      </div>
    </div>
  );
}

export default App;
