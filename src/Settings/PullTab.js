import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux';
import { TOGGLE_THEME } from '../actions/userPreferences';
import { Button, Icon } from 'semantic-ui-react';

const FavoriteStyleSearch = React.lazy(() => import('../FavoriteStyleSearch/FavoriteStyleSearch.js'));
const LocaleSearch = React.lazy(() => import('../LocaleSearch/LocaleSearch.js'));
const StyleSearch = React.lazy(() => import('../StyleSearch/StyleSearch.js'));

const mapStateToProps = state => ({
  userPreferences: state.userPreferencesReducer
});

const mapDispatchToProps = dispatch => ({
  TOGGLE_THEME: (isDarkTheme) => dispatch(TOGGLE_THEME(isDarkTheme))
});


class PullTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false
    }
  }

  setExpanded(isExpanded) {
    this.setState({isExpanded: isExpanded});
  }

  closeTab() {
    this.setExpanded(false);
  }
;
  toggleTheme() {
    this.props.TOGGLE_THEME(!this.props.userPreferences.theme.isDarkTheme);
  }

  render() {
    return (
      <div className={this.props.visible ? `pullTab active ${this.state.isExpanded ? 'expanded':''}` : "pullTab"}>
            <Suspense fallback={<div />}>
          {
            (this.state.isExpanded) ? (
              <div className="settingsContainer">
              <h1 className="settingsHeader"><Icon className="cog" /> Settings</h1>
              <div className="options">
                <div>
                  <Button circular icon onClick={() => this.closeTab()}><Icon name='close'/></Button>
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
                <Button toggle circular icon active={this.props.userPreferences.theme.isDarkTheme} onClick={() => this.toggleTheme()}><Icon name='theme'/></Button>
                <Button circular icon><Icon name='theme'/></Button>
                <Button circular icon><Icon name='theme'/></Button>
                <Button circular icon><Icon name='theme'/></Button>
              </div>
              <button id="settingsExpand" onClick={()=> this.setExpanded(true)}>Expand Settings</button>
            </React.Fragment>
            )
          }
        </Suspense>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PullTab);