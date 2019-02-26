import React, { Suspense, useState } from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import Settings from './Settings';
// import './settings.scss';

export default function PullTab(props) {

  return (
    <div className={props.visible ? "pullTab active" : "pullTab"}>
      <Suspense fallback={<div />}>
        <div id="checkboxes">
          <input type="checkbox" />
          <input type="checkbox" />
          <input type="checkbox" />
        </div>
        <Link to="/settings">Expand</Link>



        {/* <Settings /> */}
      </Suspense>
    </div>
  )
}
