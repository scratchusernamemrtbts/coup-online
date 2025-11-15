import React, { Component } from 'react'

export default class ExchangeInfluences extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            influences: props.influences,
            keep: [],
            totalInf: props.influences.length,
            actionError: '',
            selectableAmount: props.influences.length - 2
        }
    }
    selectInfluence = (index) => {
        // res.revealedCard, prevaction, counterAction, challengee, challenger, isBlock
        this.setState(prevState => ({
            keep: prevState.keep.includes(index)
            ? prevState.keep.filter(el => el !== index)
            : [...prevState.keep, index]
        }))
        
    }
    confirmSelection = () => {
        if(this.state.keep.length !== this.state.selectableAmount) {
            this.setState({ actionError: `Need to select ${this.state.selectableAmount} card${this.state.selectableAmount === 1 ? '' : 's'} to confirm `})
            return
        }
        const res = {
            playerName: this.props.name,
            kept: this.state.keep.map((i) => this.state.influences[i]),
            putBack: this.state.influences.filter((el,i)=>!this.state.keep.includes(i))
        }
        this.props.socket.emit('g-chooseExchangeDecision', res);
        this.props.doneExchangeInfluence();
    }

    render() {
        const influences = this.state.influences.map((x, index) => {
            return <button id={x} key={index} className={this.state.keep.includes(index) ? 'Selected' : ''} onClick={() => this.selectInfluence(index)}>{x}</button>
        })
        return ( 
            <div>
                <p className="DecisionTitle">Choose {this.state.selectableAmount} influence{this.state.selectableAmount === 1 ? '' : 's'} to keep</p>
                {influences}
                <div>
                    <button id="submit" onClick={() => this.confirmSelection()}>submit</button><p>{this.state.actionError}</p>
                </div>
            </div>
        )
    }
}
