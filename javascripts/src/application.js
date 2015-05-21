var fancySelect = require('./components/FancySelect.react.jsx');

var React = require('react');

window.onload = function () {
	React.render(React.createElement(fancySelect, {
		items: [
				{value: 'sv', text: 'Sweden'},
				{value: 'no', text: 'Norway'},
				{value: 'dk', text: 'Denmark'},
				{value: 'fi', text: 'Finland'},
				{value: 'ic', text: 'Iceland'},
				{value: 'ge', text: 'Germany'},
				{value: 'en', text: 'England'},
				{value: 'sc', text: 'Scotland'},
				{value: 'fr', text: 'France'},
				{value: 'po', text: 'Poland'},
				{value: 'ne', text: 'Netherlands'},
				{value: 'be', text: 'Belgium'},
				{value: 'it', text: 'Italy'},
				{value: 'au', text: 'Austria'},
				{value: 'sw', text: 'Switzerland'},
				{value: 'sp', text: 'Spain'},
				{value: 'por', text: 'Portugal'},
				{value: 'gr', text: 'Greece'},
				{value: 'sl', text: 'Slovakia'},
				{value: 'es', text: 'Estonia'},
				{value: 'lv', text: 'Latvia'},
				{value: 'li', text: 'Lithuania'}
			]
	}), document.body);
};