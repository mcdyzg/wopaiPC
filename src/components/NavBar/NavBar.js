import React,
{	Component,
	createElement,
  	cloneElement,
  	Children,
  	isValidElement } from 'react'

export default class NavBar extends Component {
    constructor(props) {
        super(props);
    }

    getTabs(props = this.props) {
	    const tabs = [];

	    Children.forEach(props.children, (tab) => {
	    	console.log(tab)
	      if (isValidElement(tab)) {
	        tabs.push(tab);
	      }
	    });

	    return tabs;
	}

    render(){
    	console.log(this.getTabs())
    	return (
    		<div className='top-nav'>
	    		{this.props.children}
	    	</div>
    		)
    	
    }
}