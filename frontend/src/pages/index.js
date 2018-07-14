import React from 'react'
import Section from 'grommet/components/Section';
import Button from 'grommet/components/Button';
import Card from 'grommet/components/Card';
import Box from 'grommet/components/Box';

import laCautionImg from '../lacaution.jpg';

import CloudIcon from 'grommet/components/icons/base/Like';

export default class Index extends React.Component {
  
  constructor(props)
  {
    super(props);
    this.state = { };
  }
  
  render() {
    const remixButton = <Button label='Remix' icon={<CloudIcon />} />;
    return (
      <Box>
      <Section pad='large' justify='around' align='center' full='vertical'>
  
        <Card thumbnail={laCautionImg} label='Peines de Maures / Arc-En-Ciel Pour Daltoniens' heading='La Caution' description={remixButton}/>

      </Section>
      </Box>
    )
  }
}
