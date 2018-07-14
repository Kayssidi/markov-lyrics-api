import React from 'react'
import Section from 'grommet/components/Section';
import Button from 'grommet/components/Button';
import Card from 'grommet/components/Card';
import Box from 'grommet/components/Box';
import Layer from 'grommet/components/Layer';
import Paragraph from 'grommet/components/Paragraph';

import laCautionImg from '../lacaution.jpg';

import CloudIcon from 'grommet/components/icons/base/Like';
import Spinning from 'grommet/components/icons/Spinning';

export default class Index extends React.Component {
  
  constructor(props)
  {
    super(props);
    this.state =
    {
      showLayer : false,      // is lyrics layer showed ?
      dataLoaded : false,     // has lyrics data been loaded
      jsonLyrics : undefined, // hold loaded lyrics string or undefined
      error : undefined,      // undefined or hold error description
    };
  }
  
  onShowLyricsLayer()
  {
    this.setState( {showLayer:true} );
    
    console.log("onShowLyricsLayer");
    
    fetch('https://dwltkvn.now.sh/api')
        .then(response => response.text())
        .then(result => this.setState({ jsonLyrics: result, error: undefined, dataLoaded: true }))
        .catch(error => this.setState({ jsonLyrics: undefined, error: error, dataLoaded: false, showLayer:false }));
  }
  
  onCloseLyricsLayer()
  {
    this.setState( {showLayer:false, dataLoaded:false} );
  }
  
  render() {
    const remixButton = <Button label='Remix' icon={<CloudIcon />} onClick={ () => this.onShowLyricsLayer() }/>;
    return (
      <Box>
      <Section pad='large' justify='around' align='center' full='vertical'>
  
        <Card thumbnail={laCautionImg} label='Peines de Maures / Arc-En-Ciel Pour Daltoniens' heading='La Caution' description={remixButton}/>
        
        <Layer align="center" closer={true} hidden={!this.state.showLayer} overlayClose={true} onClose={ () => this.onCloseLyricsLayer() }>
          <Box full={true} align="center" justify="center" >
          { this.state.dataLoaded ?
              <Paragraph>{this.state.jsonLyrics}</Paragraph>:
              <Spinning/>
          }
          </Box>
        </Layer>

      </Section>
      </Box>
    )
  }
}
