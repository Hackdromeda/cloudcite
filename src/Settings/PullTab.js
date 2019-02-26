import React, { Suspense, useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import { Icon, Button } from 'semantic-ui-react';
import Settings from './Settings';
// import './settings.scss';

export default function PullTab(props) {

  return (
    <div style={{backgroundColor: '#ffffff'}} className={props.visible ? "pullTab active" : "pullTab"}>
      <Suspense fallback={<div />}>
        <div style={{backgroundColor: '#ffffff'}}>
          <Button circular icon='settings' />
          <Button circular icon='settings' />
          <Button circular icon='settings' />
          <Button circular icon='settings' />
          <Button attached='bottom'>Expand</Button>
        </div>



        {/* <Settings /> */}
      </Suspense>
    </div>
  )
}
