// require("../node_modules/bootstrap/dist/css/bootstrap.min.css")
import React from 'react';
import ReactDOM from 'react-dom';

export class App extends React.Component {
	render() {
		return (
      		<div> First React App </div>
		);
	}
}

ReactDOM.render(<App/>, document.querySelector("#app"));
