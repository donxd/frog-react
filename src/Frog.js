import React, { Component } from 'react';
import './Frog.css';

const CSS_STYLE_FROG = 'frog';

class Frog extends Component {
    constructor () {
        super();
        this.initialState = {
            boxes : 5,
            selected : 1,
            config: false,
            boxesElements: [],
        };
        this.state = this.initialState;
        // this.generateObjectBoxes();
        // this.props = this.initialState;
    }
    componentDidMount () {
        console.log('componentDidMount');
        this.generateObjectBoxes();
    }
    // componentWillReceiveProps (nextProps) {
    //     console.log('componentWillReceiveProps - nextProps : ', JSON.stringify(nextProps));
    // }
    // shouldComponentUpdate (nextProps, nextState) {
    //     console.log('shouldComponentUpdate - nextProps : ', JSON.stringify(nextProps));
    //     console.log('shouldComponentUpdate - nextState : ', JSON.stringify(nextState));
    //     return true;
    // }
    // componentWillUpdate (nextProps, nextState) {
    //     console.log('componentWillUpdate - nextProps : ', JSON.stringify(nextProps));
    //     console.log('componentWillUpdate - nextState : ', JSON.stringify(nextState));
    // }
    generateObjectBoxes () {
      this.boxesElements = [];
      for (let i = 0; i < this.state.boxes; i++) {
        const box = this.getNewBoxObject(i+1, this.state.selected);

        this.boxesElements.push(box);
      }
      this.setState(Object.assign(this.state,{boxesElements: this.boxesElements}));
      // this.setState({boxesElements: this.boxesElements});
    }
    getNewBoxObject (index, itemSelected) {
      const attrSelected = index === itemSelected;

      return this.getBoxObject(index, attrSelected);
    }
    getBoxObject (index, attrSelected) {
      return {
        selected: attrSelected, 
        index
      };
    }
    getIndex (item) {
      return item.index;
    }
    getBoxClass (item) {
      return item.selected ? CSS_STYLE_FROG : '';
    }
    render () {
        // onClick={(e) => this.jumpFrogAdv(item)}>

        return (
            <div>
                <h2>Hi frog - {this.state.boxes}!</h2>
                <table id="elements">
                    <tbody>
                        <tr>
                            {this.state.boxesElements.map(item => {
                                return (
                                <td class={this.getBoxClass(item)}>
                                {this.getIndex(item)}</td>
                                )
                            })}
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Frog;