import React , { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from './react-redux'

class Header extends Component {
    // define props data type
    static propTypes = {
        themeColor : PropTypes.string
    }
    
    //   constructor () {
    //     super()
    //     this.state = { themeColor: '' }
    //   }
    
    //   componentWillMount () {
    //     const { store } = this.context     
    //     this._updateThemeColor()
    //     store.subscribe(() =>this._updateThemeColor())
    //   }
    
    //   _updateThemeColor () {
    //     const { store } = this.context
    //     const state = store.getState()
    //     this.setState({ themeColor: state.themeColor })
    //   }
    
      render () {
        return (
          <h1 style={{ color: this.props.themeColor }}>React.js 小书</h1>
        )
    }
}

// difined current state to props key:value
const mapStateToProps = (state) => {
    return {
        themeColor : state.themeColor
    }
}
// use redux connect high order component
Header = connect(mapStateToProps)(Header)

export default Header