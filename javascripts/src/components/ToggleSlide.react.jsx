var React = require('react/addons');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

module.exports = React.createClass({

	getInitialState: function(){

		return {
			available: this.props.items,
			selected: [],
			selectedDOMNode: null 
		};

	},

	componentDidMount: function(){
		
	},

	render: function(){

		var marker = null;

		if(this.state.selected.length > 0) marker = (<div key="marker" className="marker" style={this._getMarkerStyle()}></div>);

		return (
			<div data-am-toggleslide>

				<ul>
					{this._getOptions()}
				</ul>

				<ReactCSSTransitionGroup transitionName="marker" component="div">
					{marker}
				</ReactCSSTransitionGroup>

			</div>		
		);

	},

	_getMarkerStyle: function(){
		var li = this.state.selectedDOMNode;
		var left = !!li ? li.offsetLeft + 'px' : '-100%';
		var width = !!li ? (li.getClientRects ? li.getClientRects()[0].width : li.offsetLeft) + 'px' : '0';
		return {
			left: left,
			width: width
		};
	},

	_getOptions: function(){

		return this.state.available.map(function(o){
			var className = this.state.selected.length > 0 && this.state.selected[0].value === o.value ? 'selected' : '';
			return (<li key={o.value} className={className} onClick={this._onItemClick.bind(this, o)}><span>{o.text}</span></li>);
		}.bind(this));

	},

	_onItemClick: function(item, e){
		var isReset = this.state.selected.length > 0 && this.state.selected[0].value === item.value;
		var selected = isReset ? [] : [item];
		var target = isReset ? null : (e.target.nodeName === 'SPAN' ? e.target.parentNode : e.target);

		this.setState({
			selected: selected,
			selectedDOMNode: target
		});
	}

});