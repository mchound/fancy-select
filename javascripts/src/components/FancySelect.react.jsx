var React = require('react');

module.exports = React.createClass({

	getInitialState: function(){

		return {
			showOptions: false,
			available: this.props.items,
			selected: [],
			filter: ''
		};

	},

	componentDidMount: function(){
		var node = this.refs.search.getDOMNode();
		setTimeout(function(){ node.focus(); }, 10);
	},

	render: function(){

		var optionsClassName = this.state.showOptions ? 'fold-out' : 'fold-out hide-above';

		return (
			<div data-am-fancyselect>

				<div className="select" onClick={this._onSelectClick}>
					Choose Countries
				</div>

				<div className={optionsClassName}>

					<div className="backdrop" onClick={this._close}></div>

					<div className="top-bar">
						<button className="btn-close" onClick={this._close}></button><span className="title">Country Select</span>
					</div>

					<div className="search">
						<input type="text" placeholder="Search country" ref="search" onKeyUp={this._onSearch} />
					</div>

					<div className="scrollable">
						<ul className="selected">
							{this._getSelected()}
						</ul>

						<ul className="options">
							{this._getOptions()}
						</ul>
					</div>
				</div>

			</div>
		);

	},

	_onSearch: function(inp){
		var node = this.refs.search.getDOMNode();
		this.setState({filter: node.value});
	},

	_getOptions: function(){

		return this.state.available.map(function(item){

			// Should this item be visible based on filter
			if(!!this.state.filter && item.text.toLowerCase().substring(0, this.state.filter.length) !== this.state.filter.toLowerCase()) return null;
			return (<li key={item.value} onClick={this._onItemClick.bind(this, item)}>{item.text}</li>);

		}.bind(this));	

	},

	_getSelected: function(){

		return this.state.selected.map(function(item){

			// Should this item be visible based on filter
			if(!!this.state.filter && item.text.toLowerCase().substring(0, this.state.filter.length) !== this.state.filter.toLowerCase()) return null;
			return (<li key={item.value} onClick={this._onSelectedClick.bind(this, item)}>{item.text}</li>);

		}.bind(this));	

	},

	_onItemClick: function(item){

		var available = this.state.available.filter(function(_item){
			return _item.value !== item.value;
		});

		var selected = this.state.selected;
		selected.push(item);

		this.setState({
			filter: '',
			selected: selected,
			available: available,
			showOptions: true
		});
		var node = this.refs.search.getDOMNode();
		node.value = '';
	},

	_onSelectedClick: function(item){

		var selected = this.state.selected.filter(function(_item){
			return _item.value !== item.value;
		});

		var available = this.state.available;
		available.push(item);

		this.setState({
			filter: '',
			selected: selected,
			available: available,
			showOptions: true
		});
		var node = this.refs.search.getDOMNode();
		node.value = '';
	},

	_onSelectClick: function(e){
		this.setState({showOptions: true});
	},

	_close: function(){
		this.setState({showOptions: false});	
	}


});