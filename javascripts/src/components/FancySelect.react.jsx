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
		if(!this.props.searchable) return;
		var node = this.refs.search.getDOMNode();
		setTimeout(function(){ node.focus(); }, 10);
	},

	render: function(){

		var optionsClassName = this.state.showOptions ? 'fold-out' : 'fold-out hide-above';
		var search = null;
		var attr = '';
		attr += this.props.multiple ? 'multiple' : '';
		attr += this.props.searchable ? ' searchable' : '';

		if(this.props.searchable){
			search = (
				<div className="search">
					<input type="text" placeholder="Search country" ref="search" onKeyUp={this._onSearch} />
				</div>
			);
		}

		return (
			<div data-am-fancyselect={attr}>

				<div className="select" onClick={this._onSelectClick}>
					{this._getLabel()}
				</div>

				<div className={optionsClassName}>

					<div className="backdrop" onClick={this._close}></div>

					<div className="top-bar">
						<button className="btn-close" onClick={this._close}></button><span className="title">Country Select</span>
					</div>

					{search}

					<div className={this.props.multiple ? 'scrollable' : 'scrollable single'}>
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

	_getLabel: function(){

		if(this.props.multiple) return this.props.label;

		return this.state.selected.length > 0 ? this.state.selected[0].text : this.props.label;
	},

	_onSearch: function(inp){
		var node = this.refs.search.getDOMNode();
		this.setState({filter: node.value});
	},

	_resetSearch: function(){
		if(!this.props.searchable) return;
		var node = this.refs.search.getDOMNode();
		node.value = '';
	},

	_getOptions: function(){

		var available = this.state.available;

		if(this.props.ordered){
			available = available.sort(function(a,b){
				return a.text > b.text ? 1 : a.text < b.text ? -1 : 0;
			});
		}

		return available.map(function(item){

			var className = !this.props.multiple && this.state.selected.length > 0 && this.state.selected[0].value === item.value ? 'selected' : '';

			// Should this item be visible based on filter
			if(!!this.state.filter && item.text.toLowerCase().substring(0, this.state.filter.length) !== this.state.filter.toLowerCase()) return null;
			return (<li key={item.value} className={className} onClick={this._onItemClick.bind(this, item)}>{item.text}</li>);

		}.bind(this));	

	},

	_getSelected: function(){

		if(!this.props.multiple) return null;

		var selected = this.state.selected;

		if(this.props.ordered){
			selected = selected.sort(function(a,b){
				return a.text > b.text ? 1 : a.text < b.text ? -1 : 0;
			});
		}

		return selected.map(function(item){

			// Should this item be visible based on filter
			if(!!this.state.filter && item.text.toLowerCase().substring(0, this.state.filter.length) !== this.state.filter.toLowerCase()) return null;
			return (<li key={item.value} onClick={this._onSelectedClick.bind(this, item)}>{item.text}</li>);

		}.bind(this));	

	},

	_onItemClick: function(item){

		if(this.props.multiple) this._onItemClickedForMultiple(item);
		else this._onItemClickedForSingle(item);
				
		this._resetSearch();
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
	},

	_onItemClickedForSingle: function(item){

		var selected = this.state.selected.length === 1 && this.state.selected[0].value === item.value ? [] : [item];

		this.setState({
			filter: '',
			selected: selected,
			showOptions: false
		});
	},

	_onItemClickedForMultiple: function(item){
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
	},

	_onSelectClick: function(e){
		this.setState({showOptions: true});
	},

	_close: function(){
		this.setState({showOptions: false});	
	}


});