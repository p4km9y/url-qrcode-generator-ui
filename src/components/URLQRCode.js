import React, { Component } from 'react';

import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';

import QRCode from 'qrcode'

import './URLQRCode.css';


class URLQRCode extends Component {

  state = {
    url: 'http://',
    renderedUrl: '',
    renderer: null
  };

  renderQRCode = (canvas) => {
    const container = document.getElementById('canvasContainer');
    if (container.firstChild) {
      container.firstChild.remove();
    }
    if (canvas) {
      container.appendChild(canvas);
      console.log("rendered");
    }
  }

  handleURLChange = (e) => {
    this.setState({ url: e.target.value });
    if (! this.state.renderer) {
      const rendererPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, 2000);
      })
      .then(() => {
        const urlToRender = this.state.url;
        if (urlToRender.length) {
          QRCode.toCanvas(urlToRender, { scale: 10, margin: 1 })
          .then(canvas => {
            this.renderQRCode(canvas);
            this.props.onURLChange(urlToRender); // set as prop on parent
            this.setState({renderedUrl : urlToRender});
          })
          .catch(err => {
            console.error(err)
          })
          .finally(r => {
            console.log("done. renderer promise removed.");
            this.setState({renderer : null})
          });
        } else {
          console.log("not rendered: empty url");
          this.renderQRCode();
          this.setState({renderer : null, renderedUrl : ''});
        }
      });
      this.setState({ renderer: rendererPromise });
      console.log("renderer promise activated");
    }
  }

  render() {
    return (
      <div className="Root">
        <TextField
          id="urlField"
          label = "URL"
          value = { this.state.url }
          onChange = { this.handleURLChange }
          margin = "normal"
          className = "Input"
          type = "url"
          helperText="Zadajte URL adresu"
        />
        <br />
        <div id="canvasContainer" className="CanvasParent" />
        <Typography variant="title">{ this.state.renderedUrl }</Typography>
      </div>
    );
  }
}

export default URLQRCode;
