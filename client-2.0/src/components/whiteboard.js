import React, { Component, Fragment } from 'react'
import AppStore from '../flux/AppStore.js'
import Socket from '../io/SocketClient.js'
import '../styles/App.css'

export default class Whiteboard extends Component {

  constructor(props) {
    super(props)

    this.state = {
      width: window.innerWidth,
      height: window.innerHeight
    }

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.resetBoard = this.resetBoard.bind(this)
    this.handleDraw = this.handleDraw.bind(this)
    this.canvas = React.createRef()

    this.context = null
    this.coords = []
    this.isDrawing = false
    this.fillStyle = (this.props.color == null) ? "blue" : this.props.color

    Socket.on('draw', this.handleDraw)
  }

  componentDidMount(){
    AppStore.addChangeListener('DELETE_BOARD', this.resetBoard)
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount(){
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  /**
   * Draws a pixel on the screen everytime the
   * mouse is moved
   */
  handleMouseMove(event) {
    if(this.isDrawing) {
      var XY = []

      if(event.nativeEvent.touches != undefined)
        XY = [event.nativeEvent.touches[0].clientX, event.nativeEvent.touches[0].clientY]
      else
        XY = [event.clientX, event.clientY, false]

      this.coords.unshift(XY)

      this.context = this.canvas.current.getContext("2d")
      this.context.fillStyle = this.fillStyle
      this.context.strokeStyle = this.fillStyle
      this.context.lineWidth = this.props.lineSize
      this.context.fillRect(this.coords[0][0], this.coords[0][1], 1, 1)

      drawLine(this.coords[0], this.coords[1], this.context)
    }

    async function drawLine(start, end, ctx){
      if(end == null || start == null) return
      ctx.beginPath();
      ctx.moveTo(start[0], start[1]);
      ctx.lineTo(end[0], end[1]);
      ctx.stroke();
      ctx.closePath()
    }
  }

  handleMouseDown(event) {
    //this.isDrawing = (this.isDrawing) ? false : true
    this.isDrawing = true
  }

  handleMouseUp(event) {
    Socket.emit('draw', this.coords)
    this.isDrawing = false
    this.coords = []
  }

  updateWindowDimensions() {
    var context = this.canvas.current.getContext('2d')
    const imageData = context.getImageData(0, 0, window.innerWidth, window.innerHeight)

    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    })

    context = this.canvas.current.getContext('2d')
    context.putImageData(imageData, 0, 0)
  }

  resetBoard() {
    const context = this.canvas.current.getContext('2d')
    const { width } = this.state
    const { height } = this.state
    context.clearRect(0, 0, width, height)
  }

  handleDraw(pixels) {
    for(var i = 0; i < (pixels.length - 1); i++) {
      const context = this.canvas.current.getContext('2d')
      drawLine(pixels[i], pixels[i+1], context)
    }

    async function drawLine(start, end, ctx){
      if(end == null || start == null) return
      ctx.beginPath();
      ctx.moveTo(start[0], start[1]);
      ctx.lineTo(end[0], end[1]);
      ctx.stroke();
      ctx.closePath()
    }
  }

  render() {
    const { width } = this.state
    const { height } = this.state

    return(
      <Fragment>
        <canvas width={width} height={height} ref={this.canvas} className="whiteboard"
          onMouseMove={this.handleMouseMove}
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
          onTouchMove={this.handleMouseMove}
          onTouchEnd={this.handleMouseUp}
          onTouchStart={this.handleMouseDown}>
        </canvas>
        {this.props.children}
      </Fragment>
    )
  }
}
