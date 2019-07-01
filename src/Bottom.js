import React , { Component } from 'react'
import PropTypes from 'prop-types'
//import { connect } from './react-redux'
import { connect } from 'react-redux'

class Bottom extends Component {
    static propTypes = {
        themeColor : PropTypes.string
    }

    render(){
        return (
            <h3 style={{ color : this.props.themeColor }}>this Bottom</h3>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        themeColor : state.themeColor
    }
}

Bottom = connect(mapStateToProps)(Bottom)
export default Bottom 