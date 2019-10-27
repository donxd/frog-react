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
      this.setState(Object.assign(this.state, {boxesElements: this.boxesElements}));
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
    jumpFrogAdv (boxSelected) {
        if (boxSelected.selected) {
            const newBoxSelection = boxSelected.index < this.state.boxesElements.length ?
                this.state.boxesElements[ boxSelected.index ] :
                this.state.boxesElements[ 0 ];

            this.boxesElements = this.state.boxesElements;
            this.boxesElements[boxSelected.index-1].selected = false;
            this.boxesElements[newBoxSelection.index-1].selected = true;

            this.setState(Object.assign(this.state, {boxesElements: this.boxesElements}));
            // this.boxesElements = [...this.boxesElements];

            // this.requestUpdate();
        }
    }
    render () {
        // onClick={(e) => this.jumpFrogAdv(item)}
        // onClick={() => this.jumpFrogAdv(index)}
        // onClick={() => this.jumpFrogAdv(this.getIndex(item))}
        // onClick={() => this.jumpFrogAdv(item)}
        // onClick={this.jumpFrogAdv}
        // <td key="{item.index.toString()}" 

        return (
            <div>
                <h2>Hi frog - {this.state.boxes}!</h2>
                <table id="elements">
                    <tbody>
                        <tr>
                            {this.state.boxesElements.map(item => {
                                return (
                                <td key={this.getIndex(item)}
                                    onClick={() => this.jumpFrogAdv(item)}
                                    className={this.getBoxClass(item)}>{this.getIndex(item)}</td>
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