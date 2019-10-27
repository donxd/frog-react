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
        this.loadGenerateObjectBoxes();
        // this.generateObjectBoxes();
    }
    loadGenerateObjectBoxes () {
        this.generateObjectBoxes();
        this.setState(Object.assign(this.state, {boxesElements: JSON.parse(JSON.stringify(this.boxesElements))}));
    }
    componentWillReceiveProps (nextProps) {
        console.log('1 componentWillReceiveProps - nextProps : ', JSON.stringify(nextProps));
    }
    shouldComponentUpdate (nextProps, nextState) {
        console.log('2 shouldComponentUpdate - nextProps : ', JSON.stringify(nextProps));
        console.log('2 shouldComponentUpdate - nextState : ', JSON.stringify(nextState));
        console.log('2 shouldComponentUpdate - boxesElementsPrev : ', JSON.stringify(this.boxesElementsPrev));
        if ((this.boxesElementsPrev === undefined) || this.isChangeToApply(nextProps, nextState)) {
            this.generateObjectBoxes(nextProps.boxes, nextProps.selected);
            // if (JSON.stringify(this.boxesElementsPrev) !== JSON.stringify(nextState.boxesElements)) {
            if (
                // ('{}' === JSON.stringify(nextProps)) || 
                // (nextProps.boxes === undefined && nextProps.selected === undefined) 
                // (this.boxesElementsPrev === undefined) 
                // ||
                (nextProps.boxes !== undefined && nextState.boxes !== undefined && nextProps.boxes !== nextState.boxes) || 
                (nextProps.selected !== undefined && nextState.selected !== undefined && nextProps.selected !== nextState.selected)) {
                nextState.boxesElements = JSON.parse(JSON.stringify(this.boxesElements));
            }
            this.setState(Object.assign(nextState, {...nextProps}));
            this.boxesElementsPrev = JSON.parse(JSON.stringify(nextState.boxesElements));
            // this.boxesElementsPrev = [...nextState.boxesElements];
            return true;
        }

        return false;
    }
    isChangeToApply (nextProps, nextState) {
        console.log('2 isChangeToApply # boxes    : ', (nextProps.boxes !== undefined && nextState.boxes !== undefined && nextProps.boxes !== nextState.boxes));
        console.log('2 isChangeToApply # selected : ', (nextProps.selected !== undefined && nextState.selected !== undefined && nextProps.selected !== nextState.selected));
        console.log('2 isChangeToApply # config   : ', (nextProps.config !== undefined && nextState.config !== undefined && nextProps.config !== nextState.config));
        console.log('2 isChangeToApply # bA       : ', JSON.stringify(this.boxesElementsPrev));
        console.log('2 isChangeToApply # bB       : ', JSON.stringify(nextState.boxesElements));
        console.log('2 isChangeToApply # boxesE   : ', (this.boxesElementsPrev !== undefined && nextState.boxesElements !== undefined && JSON.stringify(this.boxesElementsPrev) !== JSON.stringify(nextState.boxesElements)));
        return (nextProps.boxes !== undefined && nextState.boxes !== undefined && nextProps.boxes !== nextState.boxes) ||
            (nextProps.selected !== undefined && nextState.selected !== undefined && nextProps.selected !== nextState.selected) ||
            (nextProps.config !== undefined && nextState.config !== undefined && nextProps.config !== nextState.config) ||
            // (this.boxesElementsPrev !== undefined && nextState.boxesElements !== undefined && this.boxesElementsPrev !== nextState.boxesElements);
            (this.boxesElementsPrev !== undefined && nextState.boxesElements !== undefined && JSON.stringify(this.boxesElementsPrev) !== JSON.stringify(nextState.boxesElements));
    }
    componentWillUpdate (nextProps, nextState) {
        console.log('3 componentWillUpdate - nextProps : ', JSON.stringify(nextProps));
        console.log('3 componentWillUpdate - nextState : ', JSON.stringify(nextState));
    }
    generateObjectBoxes (nBoxes=null, selectedBox=null) {
        console.log(`nBoxes : ${nBoxes} ### selectedBox : ${selectedBox}`);
        const numberBoxes = nBoxes !== null ? nBoxes : this.state.boxes;
        // const boxSelected = selectedBox !== null ? selectedBox-1 : this.state.selected;
        const boxSelected = selectedBox !== null ? selectedBox : this.state.selected;
        this.boxesElements = [];
        for (let i = 0; i < numberBoxes; i++) {
            const box = this.getNewBoxObject(i+1, boxSelected);

            this.boxesElements.push(box);
        }
      //this.setState(Object.assign(this.state, {boxesElements: this.boxesElements})); //*
      // this.setState({boxesElements: this.boxesElements});
    }
    getNewBoxObject (index, itemSelected) {
      const attrSelected = index === Number.parseInt(itemSelected);

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
        console.log('jumpFrogAdv - boxSelected ', JSON.stringify(boxSelected));
        if (boxSelected.selected) {
            const newBoxSelection = boxSelected.index < this.state.boxesElements.length ?
                this.state.boxesElements[ boxSelected.index ] :
                this.state.boxesElements[ 0 ];

            // let boxesElements = this.state.boxesElements;
            // let boxesElements = [...this.state.boxesElements];
            let boxesElements = JSON.parse(JSON.stringify(this.state.boxesElements));
            this.boxesElementsPrev = JSON.parse(JSON.stringify(boxesElements));
            console.log('jumpFrogAdv - prev boxesElements ', JSON.stringify(this.boxesElementsPrev));
            boxesElements[boxSelected.index-1].selected = false;
            boxesElements[newBoxSelection.index-1].selected = true;
            console.log('jumpFrogAdv - next boxesElements ', JSON.stringify(boxesElements));
            console.log('jumpFrogAdv * prev boxesElements ', JSON.stringify(this.boxesElementsPrev));

            this.setState(Object.assign(this.state, {boxesElements: boxesElements}));
            // boxesElements = [...boxesElements];

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