import React, { Suspense, useState } from 'react'
import { Icon } from 'semantic-ui-react';
import Settings from './Settings';
// import './settings.scss';

export default function PullTab(props) {

  return (
    <div className={props.visible ? "pullTab active" : "pullTab"}>
      <Suspense fallback={<div />}>
        <Settings />

      </Suspense>
    </div>
  )
}
