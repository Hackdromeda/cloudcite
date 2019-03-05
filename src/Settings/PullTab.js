import React, { Suspense } from 'react'
import { Link } from 'react-router-dom';

import { Icon, Button } from 'semantic-ui-react';
import Settings from './Settings';
// import './settings.scss';

export default function PullTab(props) {

  return (
    <div style={{ backgroundColor: '#ffffff' }} className={props.visible ? "pullTab active" : "pullTab"}>
      <Suspense fallback={<div />}>
        <div id="pulltabBtns">
          <a className='settingsBtn' rel="noopener noreferrer" href="#" ><Icon className='settingsIcon' name='settings' /></a>
          <a className='settingsBtn' rel="noopener noreferrer" href="#" ><Icon className='settingsIcon' name='settings' /></a>
          <a className='settingsBtn' rel="noopener noreferrer" href="#" ><Icon className='settingsIcon' name='settings' /></a>
          <a className='settingsBtn' rel="noopener noreferrer" href="#" ><Icon className='settingsIcon' name='settings' /></a>
        </div>
        <Link to="/settings" id='settingsExpand'>Expand</Link>


        {/* <Settings /> */}
      </Suspense>
    </div>
  )
}
