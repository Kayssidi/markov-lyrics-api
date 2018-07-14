import React from 'react'
import Section from 'grommet/components/Section';
import Button from 'grommet/components/Button';
import Card from 'grommet/components/Card';
import Box from 'grommet/components/Box';
import Layer from 'grommet/components/Layer';
import Paragraph from 'grommet/components/Paragraph';
import Toast from 'grommet/components/Toast';

import laCautionImg from '../lacaution.jpg';

import CloudIcon from 'grommet/components/icons/base/Like';
import AddIcon from 'grommet/components/icons/base/Add';
import Spinning from 'grommet/components/icons/Spinning';

export default class Index extends React.Component {
  
  //-----------------------------
  constructor(props)
  //-----------------------------
  {
    super(props);
    this.state =
    {
      showLayer : false,      // is lyrics layer showed ?
      dataLoaded : false,     // has lyrics data been loaded
      jsonLyrics : undefined, // hold loaded lyrics string or undefined
      error : undefined,      // undefined or hold error description
      displayDeferredPrompt : false,  // show personalized button instead of integrated popup
      showInstallToast : false,       // does this app has been installed successfully ?
    };
    
    this.onShowLyricsLayer = this.onShowLyricsLayer.bind(this);
    this.onCloseLyricsLayer = this.onCloseLyricsLayer.bind(this);
    
    this.handleBeforeInstallPrompt = this.handleBeforeInstallPrompt.bind(this);
    this.handleAddToDesktop = this.handleAddToDesktop.bind(this);
    this.deferredPrompt = null;
  }
  
  //-----------------------------
  componentDidMount() {
  //-----------------------------
     window.addEventListener('beforeinstallprompt', this.handleBeforeInstallPrompt);
  }
  
  //-----------------------------
  componentWillUnmount() {
  //-----------------------------
     window.removeEventListener('beforeinstallprompt', this.handleBeforeInstallPrompt);
  }
  
  //-----------------------------
  onShowLyricsLayer()
  //-----------------------------
  {
    this.setState( {showLayer:true} );
    
    fetch('https://dwltkvn.now.sh/api')
        .then(response => response.text())
        .then(result => this.setState({ jsonLyrics: result, error: undefined, dataLoaded: true }))
        .catch(error => this.setState({ jsonLyrics: undefined, error: error, dataLoaded: false, showLayer:false }));
  }
  
  //-----------------------------
  onCloseLyricsLayer()
  //-----------------------------
  {
    this.setState( {showLayer:false, dataLoaded:false} );
  }
  
  // called on component mounted -> store the deferred prompt event, in order to be processed later by the user (\see handleAddToDesktop)
  //-----------------------------
  handleBeforeInstallPrompt(e)
  //-----------------------------
  {
    e.preventDefault();
    this.setState( {displayDeferredPrompt: true} );
    this.deferredPrompt = e;
  }
  
  // user callback -> when called, show the browser prompt that allo user to install the app
  //-----------------------------
  handleAddToDesktop()
  //-----------------------------
  {
    // Show the prompt
    this.deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    this.deferredPrompt.userChoice
                  .then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                      console.log('User accepted the A2HS prompt');
                      this.setState( {showInstallToast:true, displayDeferredPrompt:false});
                    } else {
                      console.log('User dismissed the A2HS prompt');
                    }
                    this.deferredPrompt = null;
                  });
  }
  
  //-----------------------------
  render() {
  //-----------------------------
    const remixButton = <Button label='Remix' icon={<CloudIcon />} onClick={ () => this.onShowLyricsLayer() }/>;
    const installButton = <Button label='Installer' icon={<AddIcon />} onClick={ () => this.handleAddToDesktop() }/>
    const installToast = "L'application a été installée avec succès sur votre appareil!"
    
    return (
      <Box>
      <Section pad='large' justify='around' align='center' full='vertical'>
  
        { this.state.displayDeferredPrompt ? [installButton]:null }
          
        <Card thumbnail={laCautionImg} label='Peines de Maures / Arc-En-Ciel Pour Daltoniens' heading='La Caution' description={remixButton}/>
        
        <Layer align="center" closer={true} hidden={!this.state.showLayer} overlayClose={true} onClose={ () => this.onCloseLyricsLayer() }>
          <Box full={true} align="center" justify="center" >
          { this.state.dataLoaded ?
              <Paragraph>{this.state.jsonLyrics}</Paragraph>:
              <Spinning/>
          }
          </Box>
        </Layer>
        
        { this.state.showInstallToast ?
          <Toast status='ok' onClose={ () => { this.setState( {showInstallToast:false} )} }>
            {installToast}
          </Toast>:null
        }

      </Section>
      </Box>
    )
  }
}
