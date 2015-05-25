var React = require('react/addons');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

module.exports = React.createClass({

	getInitialState: function(){

		return {
			available: this.props.items,
			selected: this.props.selected || null,
			selectedDOMNode: null,
			started: false
		};

	},

	componentDidMount: function(){
		var node = this.refs.selected.getDOMNode();
		this.setState({selectedDOMNode: node});
	},

	render: function(){

		var marker = null;

		if(!!this.state.selected) marker = (<div key="marker" className="marker" style={this._getMarkerStyle()}></div>);

		return (
			<div data-am-toggleslide className={this.state.started ? 'started' : ''}>

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
			
			if(!!this.state.selected && this.state.selected.value === o.value){
				return (<li key={o.value} className='selected' ref="selected" onClick={this._onItemClick.bind(this, o)}><span>{o.text}</span></li>);
			}
			else {
				return (<li key={o.value} onClick={this._onItemClick.bind(this, o)}><span>{o.text}</span></li>);
			}

			
		}.bind(this));

	},

	_onItemClick: function(item, e){
		var isReset = !!this.state.selected > 0 && this.state.selected.value === item.value;

		if(!this.props.resetable && isReset) return;

		var selected = isReset ? null : item;
		var target = isReset ? null : (e.target.nodeName === 'SPAN' ? e.target.parentNode : e.target);

		if(!!this.props.onChange) this.props.onChange(selected);

		this.setState({
			selected: selected,
			selectedDOMNode: target,
			started: true
		});
	}

});