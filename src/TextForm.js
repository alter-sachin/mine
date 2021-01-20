import React from "react";
import axios from 'axios';
import {Player} from 'video-react';


class TextForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '',audio_url:'',video_url:''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    //alert('A name was submitted: ' + this.state.value);
    // send a POST request
    axios({
      method: 'post',
      url: 'http://35.232.47.147:8008/generate_audio/',
      data: {
        persona_id:0,
        text_script:this.state.value}
    }).then((response)=>{
      console.log(response.data.audio_url);
      this.setState({audio_url:response.data.audio_url});
            axios({
            method: 'post',
            url: 'http://14b74a137ae4.ngrok.io/predict',
            data: {
              persona_id:0,
              audio_url:this.state.audio_url}
          }).then((response)=>{
            console.log(response.data.video_url);
            this.setState({video_url:response.data.video_url});
          },(error)=>{
            console.log(error);
          });
    },(error)=>{
      console.log(error);
    });
    /*axios.get('http://35.232.47.147:8008/generate_audio/')
      .then(res => console.log(res.data));
      this.setState({audio_url:"https://buildar.in/aud/1608280372.9103236.wav"});
      this.setState({video_url:"https://buildar.in/video/hi/Chitrang_Gupta.mp4"});*/

    event.preventDefault();
  }


  render() {
    return (
      <form onSubmit={this.handleSubmit}>
      <Player playsInline poster="" src={this.state.video_url}/>
        <label>
          Text Script: <input type="submit" value="Create Audio" /><audio ref="audio_tag" src={this.state.audio_url} controls autoPlay/>
          <br/>
          <input type="text" value={this.state.value} onChange={this.handleChange} style={{width:"100%"}}/>
        </label>
      </form>
    );
  }
}

export default TextForm;

