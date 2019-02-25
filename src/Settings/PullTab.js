import React, {useState} from 'react'
import { Icon } from 'semantic-ui-react';


export default function PullTab(props) {
  const [visible, setVisibility] = useState(false);
  
  return (
    <div className={visible ? "pullTab active":"pullTab"}>
      <h1>This is the Settings pull tab!</h1>
    </div>
  )
}
