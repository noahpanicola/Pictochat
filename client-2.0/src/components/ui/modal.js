import React, { Component, Fragment } from 'react'
import '../../styles/modal.css'
import AppStore from '../../flux/AppStore.js'
import ModalBackground from './modal-background.js'
import { Transition, transit } from 'react-transition-group'

class Modal extends Component {

  constructor(props) {
    super(props)

    this.state = {
      open: false,
      data: this.props.children
    }

    this.setModal = this.setModal.bind(this)
    this.hideModal = this.hideModal.bind(this)
  }

  componentDidMount() {
    AppStore.addChangeListener('SET_MODAL', this.setModal)
    AppStore.addChangeListener('HIDE_MODAL', this.hideModal)
  }

  setModal(){
    this.setState({
      open: true,
      data: AppStore.getModal()
    })
  }

  hideModal(){
    this.setState({
      open: false
    })
  }

  render() {
    const { data } = this.state
    const { open } = this.state
    const activeClass = 'modal'

    return(
        <Transition in={open} timeout={{enter: 0, exit: duration}} unmountOnExit>
          { state => {
              return(
                <Fragment>
                  <div className={activeClass}
                    style={{
                        ...defaultStyle,
                        ...transitionStyles[state]
                      }}>
                    {data}
                  </div>
                  <ModalBackground active={open} handleClose={this.props.handleClose}
                    style={{
                      ...defaultStyle,
                      ...transitionStyles[state]
                    }}
                  />
                </Fragment>
              )
            }
          }
        </Transition>
    )
  }
}

const duration = 400

const defaultStyle = {
  transition: `all ${duration}ms ease-in-out`,
  opacity: 0,
}

const transitionStyles = {
  entering: { opacity: 0 },
  entered:  { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 1 }
}

export default Modal
