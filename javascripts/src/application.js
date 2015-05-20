var fancySelect = require('./components/FancySelect.react.jsx');

var React = require('react');

window.onload = function () {
	React.render(React.createElement(fancySelect), document.body);
};