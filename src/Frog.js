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
            boxes : DEFAULT_BOXES,
            selected : DEFAULT_SELECTED,
            config: DEFAULT_CONFIG,
            boxesElements: [],
        };
        this.state = this.initialState;
    }
    componentDidMount () {
        this.loadGenerateObjectBoxes();
    }
    loadGenerateObjectBoxes () {
        this.generateObjectBoxes();
        this.setState({boxesElements: JSON.parse(JSON.stringify(this.boxesElements))});
    }
    shouldComponentUpdate (nextProps, nextState) {
        if ((this.boxesElementsPrev === undefined) || this.isChangeToApply(nextProps, nextState)) {
            this.generateObjectBoxes(nextProps.boxes, nextProps.selected);
            if (
                (nextProps.boxes !== undefined && nextState.boxes !== undefined && nextProps.boxes !== nextState.boxes) || 
                (nextProps.selected !== undefined && nextState.selected !== undefined && nextProps.selected !== nextState.selected)) {
                nextState.boxesElements = JSON.parse(JSON.stringify(this.boxesElements));
            }
            this.setState(Object.assign(nextState, {...nextProps}));
            this.boxesElementsPrev = JSON.parse(JSON.stringify(nextState.boxesElements));
            return true;
        }

        return false;
    }
    isChangeToApply (nextProps, nextState) {
        return (nextProps.boxes !== undefined && nextState.boxes !== undefined && nextProps.boxes !== nextState.boxes) ||
            (nextProps.selected !== undefined && nextState.selected !== undefined && nextProps.selected !== nextState.selected) ||
            (nextProps.config !== undefined && nextState.config !== undefined && nextProps.config !== nextState.config) ||
            (this.boxesElementsPrev !== undefined && nextState.boxesElements !== undefined && JSON.stringify(this.boxesElementsPrev) !== JSON.stringify(nextState.boxesElements));
    }
    generateObjectBoxes (nBoxes=null, selectedBox=null) {
        const numberBoxes = nBoxes !== null ? nBoxes : this.state.boxes;
        const boxSelected = selectedBox !== null ? selectedBox : this.state.selected;

        this.boxesElements = [];
        for (let i = 0; i < numberBoxes; i++) {
            const box = this.getNewBoxObject(i+1, boxSelected);

            this.boxesElements.push(box);
        }
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
        if (boxSelected.selected) {
            const newBoxSelection = boxSelected.index < this.state.boxesElements.length ?
                this.state.boxesElements[ boxSelected.index ] :
                this.state.boxesElements[ 0 ];

            let boxesElements = [...this.state.boxesElements];
            this.boxesElementsPrev = [...boxesElements];

            boxesElements[boxSelected.index-1].selected = false;
            boxesElements[newBoxSelection.index-1].selected = true;

            this.selected = `${newBoxSelection.index}`;
            this.setState({boxesElements: boxesElements, selected: this.selected});
            this.forceUpdate();
        }
    }
    changeInputBoxes (event) {
        event.preventDefault();
        this.changeBoxes(this.boxes.value, this.state.boxes);
    }
    changeBoxes (newNumberBoxes, oldNumberBoxes=DEFAULT_SELECTED) {
        this.changeBoxesByObjects(newNumberBoxes, oldNumberBoxes);
    }
    changeBoxesByObjects (newNumberBoxes, oldNumberBoxes) {
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

        this.boxesElements = [...this.state.boxesElements];

        for (let i = 0; i < numberNewBoxes; i++) {
            const newBox = this.getBoxObject(numberCreatedBoxes + 1, false);
            this.boxesElements.push(newBox);
        }

        this.boxesElementsPrev = JSON.parse(JSON.stringify(this.boxesElements));
        const positionFrog = this.getPositionFrogAdvanced(this.boxesElementsPrev);
        this.selected = `${positionFrog}`;

        this.setState({boxesElements: this.boxesElements, boxes: this.boxesElements.length, selected: this.selected});
        this.forceUpdate();
    }
    removeBoxesByObjects () {
        let positionFrog = this.getPositionFrogAdvanced(this.boxesElements);
        const numberCreatedBoxes = this.boxesElements.length;
        const numberBoxes = this.boxes;

        this.boxesElements = [...this.state.boxesElements];

        if (positionFrog >= numberBoxes) {
            positionFrog = numberBoxes;
            this.selected = positionFrog;
            this.boxesElements[positionFrog-1].selected = true;
        }

        for (let i = numberCreatedBoxes-1; i >= numberBoxes; i--) {
            this.boxesElements.pop();
        }

        this.boxesElementsPrev = JSON.parse(JSON.stringify(this.boxesElements));

        this.setState({boxesElements: this.boxesElements, boxes: this.boxesElements.length, selected: `${this.selected}`});
        this.forceUpdate();
    }
    changeInputSelection (event) {
        event.preventDefault();

        this.changeSelected(this.selected.value, this.state.selected);
    }
    changeSelected (newPosition, oldPosition=DEFAULT_BOXES) {
        this.changeSelectedByObjects(newPosition, oldPosition);
    }
    changeSelectedByObjects (newPosition, oldPosition) {
        let boxesElements = JSON.parse(JSON.stringify(this.state.boxesElements));

        if (boxesElements && boxesElements.length && oldPosition > -1){
            const positionFrog = this.getPositionFrogAdvanced(boxesElements);
            const newPositionSelection = newPosition <= boxesElements.length ? newPosition : 1;

            this.selected = newPositionSelection;
            boxesElements[positionFrog-1].selected = false;
            boxesElements[newPositionSelection-1].selected = true;
            this.selected = `${newPositionSelection}`;

            this.boxesElementsPrev = JSON.parse(JSON.stringify(this.state.boxesElements));

            this.setState({boxesElements: boxesElements, selected: `${this.selected}`});
            this.forceUpdate();
        }
    }
    getPositionFrogAdvanced (boxesElements=null) {
        if (boxesElements) return boxesElements.filter(box => box.selected)[0].index;

        return this.state.boxesElements.filter(box => box.selected)[0].index;
    }
    render () {
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