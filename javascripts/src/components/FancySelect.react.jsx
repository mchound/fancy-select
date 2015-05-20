var React = require('react');

module.exports = React.createClass({

	getInitialState: function(){

		return {
			showOptions: false,
			items: [
				{value: 'sv', text: 'Sweden'},
				{value: 'no', text: 'Norway'},
				{value: 'dk', text: 'Denmark'},
				{value: 'fi', text: 'Finland'},
				{value: 'ic', text: 'Iceland'}
			],
			selected: null,
			filter: ''
		};

	},

	componentDidMount: function(){
		var node = this.refs.search.getDOMNode();
		node.focus();
	},

	render: function(){

		var optionsClassName = this.state.showOptions ? 'fold-out' : 'fold-out hide-above';

		return (
			<div data-am-fancyselect>

				<div className="select" onClick={this._onSelectClick}>
					Choose Country
				</div>

				<div className={optionsClassName}>

					<div className="search">
						<input type="text" placeholder="Search country" ref="search" onKeyUp={this._onSearch} />
					</div>

					<ul className="selected">

					</ul>

					<ul className="options">
						{this._getOptions()}
					</ul>
				</div>

			</div>
		);

	},

	_onSearch: function(inp){
		var node = this.refs.search.getDOMNode();
		this.setState({filter: node.value});
	},

	_getOptions: function(){

		return this.state.items.map(function(item){
			if(!!this.state.filter && item.text.toLowerCase().substring(0, this.state.filter.length) !== this.state.filter.toLowerCase()) return null;
			var className = '';
			if(!!this.state.selected && this.state.selected.value === item.value) className = 'selected';
			return (<li key={item.value} className={className} onClick={this._onItemClick.bind(this, item)}>{item.text}</li>);
		}.bind(this));	

	},

	_onItemClick: function(item){
		this.setState({
			filter: '',
			selected: item,
			showOptions: false
		});
		var node = this.refs.search.getDOMNode();
		node.value = '';
	},

	_onSelectClick: function(e){
		this.setState({showOptions: true});
	}


});