import React , { Component } from 'react'
import PropTypes from 'prop-types'

export const connect = (mapStateToProps , mapDispatchToProps) => (WrappedComponent) => {
    class Connect extends Component {
        // get store from context
        static contextTypes = {
            store : PropTypes.object
        }

        constructor(){
            super()
            this.state = { allProps : {} }
        }

        componentWillMount(){
            const { store } = this.context
            this._updateProps()
            store.subscribe(() => this._updateProps())
        }

        _updateProps(){
            const { store } = this.context
            let stateProps = mapStateToProps ? mapStateToProps(store.getState(), this.props) : {}
            let dispatchProps = mapDispatchToProps ? mapDispatchToProps(store.dispatch , this.props) : {}
            this.setState({
                allProps : {
                    ...stateProps ,
                    ...dispatchProps ,
                    ...this.props
                }
            })
        }

        render(){
            return <WrappedComponent { ...this.state.allProps } />
        }
    }

    return Connect
}

// defined Provider , root context delegate 
export class Provider extends Component {
    // define prop data type
    static propTypes = {
        store : PropTypes.object ,
        children : PropTypes.any
    }

    static childContextTypes = {
        store : PropTypes.object
    }

    getChildContext() {
        return {
            store : this.props.store
        }
    }

    render() {
        return (
            <div>{this.props.children}</div>
        )
    }
}