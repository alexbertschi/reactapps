// Landing Page which describes the basic setup and idea of the page. Ideally it forces the user to connect to metamask before navigating to other items.
  
  import React, { Component } from 'react'

  class CreateNFT extends Component {

    constructor(props) {
      super(props);
      this.state = {value: ''};

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

      handleChange(e) {
        this.setState({value: e.target.value});
      }
    
    
      handleSubmit(e) {
        this.drawText(this.state.value)
        e.preventDefault();
      }
    
 
    drawText(txt) {
      const canvas = document.querySelector("canvas");
      const ctx = canvas.getContext("2d");

      var img = new Image();
      img.onload = function () {

        canvas.height = img.height + 80;
        canvas.width = img.width + 10;

        ctx.drawImage(img,5,5);

        
        ctx.font = '10px verdana, sans-serif';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        
        ctx.fillText(txt + ' has successfully',125,120);
        ctx.fillText('absolved the masterclass!',125,140);
        //ctx.fillText('',5,260);
      }
      img.src = "https://lirp.cdn-website.com/5d36cdfa/dms3rep/multi/opt/Screenshot+2022-05-05+at+22.48.47-235w.png"; 
  }
    
      render() {
      return (
        <div className='Section'>
      <h1>Create NFT</h1>
      <h4>Create a customized non-fungible token image for each graduate of the masterclass.</h4>
      <form onSubmit={this.handleSubmit}>
        <div className='divStyle'><label>Specify name of graduate:</label></div><div className='divStyle'>
          <input type="text" value={this.state.value} onChange={this.handleChange} />
          </div>
        <button type="submit">Customize Certificate</button>
        
      </form>

      <div><canvas id="canvas"></canvas></div>
      </div>
      );
    
  }
}

export default CreateNFT;