import React, { Suspense, useState } from 'react'
import { Button, Icon } from 'semantic-ui-react';

const FavoriteStyleSearch = React.lazy(() => import('../FavoriteStyleSearch/FavoriteStyleSearch.js'));
const LocaleSearch = React.lazy(() => import('../LocaleSearch/LocaleSearch.js'));
const StyleSearch = React.lazy(() => import('../StyleSearch/StyleSearch.js'));


export default function PullTab(props) {
  const [expanded,setExpand] = useState(false);

  const closeTab = () => {
    setExpand(false);
  }

  return (
    <div className={props.visible ? `pullTab active ${expanded ? 'expanded':''}` : "pullTab"}>
          <Suspense fallback={<div />}>
        {
          (expanded) ? (
            <div className="settingsContainer">
            <h1 className="settingsHeader"><Icon className="settings" /> Settings</h1>
            <div className="options">
              <div>
                <Button circular icon onClick={closeTab}><Icon name='close'/></Button>
              </div>
              <label className="settingsLabel">Favorite Styles</label>
              <FavoriteStyleSearch/>
              <label className="settingsLabel">Locales</label>
              <LocaleSearch />
              <label className="settingsLabel">Styles</label>
              <StyleSearch />
            </div>
          </div>
          ):(
            <React.Fragment>
            <div id="pulltabBtns">
              <Button circular icon><Icon name='theme'/></Button>
              <Button circular icon><Icon name='theme'/></Button>
              <Button circular icon><Icon name='theme'/></Button>
              <Button circular icon><Icon name='theme'/></Button>
            </div>
            <button id="settingsExpand" onClick={()=> setExpand(true)}>Expand</button>
          </React.Fragment>
          )
        }
      </Suspense>
    </div>
  )
}
