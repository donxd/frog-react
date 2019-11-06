import React, { Component } from 'react';
import './Frog.css';

const CSS_STYLE_FROG = 'frog';
const DEFAULT_BOXES = 5;
const DEFAULT_SELECTED = 1;
const DEFAULT_CONFIG = false;

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
        // this.commonChange = this.commonChange.bind(this);
        // this.showValue = this.showValue.bind(this);
    }
    componentDidMount () {
        console.log('componentDidMount');
        this.loadGenerateObjectBoxes();
        // this.generateObjectBoxes();
    }
    loadGenerateObjectBoxes () {
        this.generateObjectBoxes();
        // this.setState(Object.assign(this.state, {boxesElements: JSON.parse(JSON.stringify(this.boxesElements))}));
        this.setState({boxesElements: JSON.parse(JSON.stringify(this.boxesElements))});
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

            // this.setState(Object.assign(this.state, {boxesElements: boxesElements}));
            this.setState({boxesElements: boxesElements});
            // boxesElements = [...boxesElements];

            // this.requestUpdate();
        }
    }
    changeInputBoxes (event) {
        event.preventDefault();
        // console.log('changeInputBoxes - event : ', event);
        console.log('changeInputBoxes - event : ', event.target);
        console.log('changeInputBoxes - this.boxes : ', this.boxes.value);
        console.log('changeInputBoxes - state.boxes : ', this.state.boxes);
        // console.log('nboxes i : ', this.shadowRoot.getElementById('nboxes').value);
        // this.changeBoxes(this.shadowRoot.getElementById('nboxes').value, this.boxes);
        this.changeBoxes(this.boxes.value, this.state.boxes);
    }
    changeBoxes (newNumberBoxes, oldNumberBoxes=DEFAULT_SELECTED) {
      this.changeBoxesByObjects(newNumberBoxes, oldNumberBoxes);
    }
    changeBoxesByObjects (newNumberBoxes, oldNumberBoxes) {
        // polymer firefox double change
        // 1st - newNumberBoxes:0 , oldNumberBoxes:5
        // 2nd - newNumberBoxes:3 , oldNumberBoxes:0
        if (!newNumberBoxes) this.oldNumberBoxesAux = oldNumberBoxes;
        if (!oldNumberBoxes) oldNumberBoxes = this.oldNumberBoxesAux;

        if (newNumberBoxes > 0) {
            if (newNumberBoxes > oldNumberBoxes) {
                this.boxes = newNumberBoxes;
                this.addBoxesByObjects();
            } else if (newNumberBoxes < oldNumberBoxes) {
                this.boxes = newNumberBoxes;
                this.removeBoxesByObjects();
            }
        }
    }
    addBoxesByObjects () {
        const numberCreatedBoxes = this.boxesElements.length;
        const numberNewBoxes = this.boxes - numberCreatedBoxes;

        // this.boxesElements = [...this.boxesElementsPrev];
        this.boxesElements = [...this.state.boxesElements];

        for (let i = 0; i < numberNewBoxes; i++) {
            const newBox = this.getBoxObject(numberCreatedBoxes + 1, false);

            // this.push('boxesElements', newBox);
            this.boxesElements.push(newBox);
        }
        // this.boxesElementsPrev = JSON.parse(JSON.stringify(this.state.boxesElements));
        this.boxesElementsPrev = JSON.parse(JSON.stringify(this.boxesElements));
        const positionFrog = this.getPositionFrogAdvanced(this.boxesElementsPrev);
        this.selected = `${positionFrog}`;

        this.setState({boxesElements: this.boxesElements, boxes: this.boxesElements.length, selected: this.selected});
        this.forceUpdate();
        // this.setState({boxesElements: boxesElements, selected: `${this.selected}`});
    }
    removeBoxesByObjects () {
        let positionFrog = this.getPositionFrogAdvanced(this.boxesElements);
        const numberCreatedBoxes = this.boxesElements.length;
        const numberBoxes = this.boxes;

        this.boxesElements = [...this.state.boxesElements];

        if (positionFrog >= numberBoxes) {
            positionFrog = numberBoxes;
            this.selected = positionFrog;
            // this.set(`boxesElements.${positionFrog-1}`, this.getBoxObject(positionFrog, true));
            this.boxesElements[positionFrog-1].selected = true;
        }

        for (let i = numberCreatedBoxes-1; i >= numberBoxes; i--) {
            this.boxesElements.pop();
            // this.pop('boxesElements');
        }

        this.boxesElementsPrev = JSON.parse(JSON.stringify(this.boxesElements));

        this.setState({boxesElements: this.boxesElements, boxes: this.boxesElements.length, selected: `${this.selected}`});
        this.forceUpdate();
    }
    changeInputSelection (event) {
        event.preventDefault();
        // console.log('changeInputSelection - event : ', event);
        console.log('changeInputSelection - event : ', event.target);
        console.log('changeInputSelection - this.selected : ', this.selected.value);
        console.log('changeInputSelection - state.selected : ', this.state.selected);
        this.changeSelected(this.selected.value, this.state.selected);
    }
    changeSelected (newPosition, oldPosition=DEFAULT_BOXES) {
        this.changeSelectedByObjects(newPosition, oldPosition);
    }
    changeSelectedByObjects (newPosition, oldPosition) {
        console.log('****** changeSelectedByObjects newPosition : ', newPosition);
        console.log('****** changeSelectedByObjects oldPosition : ', oldPosition);
        let boxesElements = JSON.parse(JSON.stringify(this.state.boxesElements));
        if (boxesElements && boxesElements.length && oldPosition > -1){
            const positionFrog = this.getPositionFrogAdvanced(boxesElements);
            const newPositionSelection = newPosition <= boxesElements.length ? newPosition : 1;

            this.selected = newPositionSelection;
            // let selected = newPositionSelection;
            // this.set(`boxesElements.${positionFrog-1}`, this.getBoxObject(positionFrog, false));
            // this.set(`boxesElements.${newPositionSelection-1}`, this.getBoxObject(newPositionSelection, true));
            boxesElements[positionFrog-1].selected = false;
            boxesElements[newPositionSelection-1].selected = true;
            this.selected = `${newPositionSelection}`;
            // this.selected = newPositionSelection;
            // this.state.selected = this.selected;

            this.boxesElementsPrev = JSON.parse(JSON.stringify(this.state.boxesElements));
            // this.setState(Object.assign(this.state, {boxesElements: boxesElements, selected: `${this.selected}`}));
            // this.setState({boxesElements: boxesElements, selected: `${this.selected}`});
            // this.setState({boxesElements: boxesElements});
            this.setState({boxesElements: boxesElements, selected: `${this.selected}`});
            this.forceUpdate();
            // this.setState(Object.assign(this.state, {boxesElements: boxesElements, selected: this.selected}));
            // this.setState(Object.assign(this.state, {selected: this.selected}));
            // this.setState(Object.assign(this.state, {boxesElements: boxesElements}));
            // this.setState(Object.assign(this.state, {boxesElements: boxesElements}));
            // this.setState(Object.assign(this.state, {selected: boxesElements}));
        }
    }
    getPositionFrogAdvanced (boxesElements=null) {
        if (boxesElements) return boxesElements.filter(box => box.selected)[0].index;
        // return this.boxesElements.filter(box => box.selected)[0].index;
        return this.state.boxesElements.filter(box => box.selected)[0].index;
    }
    render () {
        // onClick={(e) => this.jumpFrogAdv(item)}
        // onClick={() => this.jumpFrogAdv(index)}
        // onClick={() => this.jumpFrogAdv(this.getIndex(item))}
        // onClick={() => this.jumpFrogAdv(item)}
        // onClick={this.jumpFrogAdv}
        // <td key="{item.index.toString()}" 
                              // <input type="number" id="nboxes" min="1" value={this.state.boxes} onChange={(e) => this.changeInputBoxes(e)} />
                              // <input type="number" id="pfrog" min="1" value={this.state.selected} onChange={(e) => this.changeInputSelection(e)} />

                              // <input type="number" id="nboxes" min="1" value={this.state.boxes} ref={el => this.boxes=el} onChange={(e) => this.changeInputBoxes(e)} />
                              // <input type="number" id="pfrog" min="1" value={this.state.selected} ref={el => this.selected=el} onChange={(e) => this.changeInputSelection(e)} />

        return (
            <div>
                <h2>Hi frog - {this.state.boxes}!</h2>
                {
                    this.state.config ? (
                        <div className='table'>
                          <div className='row'>
                            <div className='cell'>
                              <label htmlFor="nboxes">Número de cajas: &nbsp;</label>
                            </div>
                            <div className='cell'>
                              <input type="number" id="nboxes" min="1" value={this.state.boxes} ref={el => this.boxes=el} onChange={(e) => this.changeInputBoxes(e)} />
                            </div>
                          </div>
                          <div className='row'>
                            <div className='cell'>
                              <label htmlFor="pfrog">Posición rana: </label>
                            </div>
                            <div className='cell'>
                              <input type="number" id="pfrog" min="1" value={this.state.selected} ref={el => this.selected=el} onChange={(e) => this.changeInputSelection(e)} />
                            </div>
                          </div>
                        </div>
                    ) : null
                }
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