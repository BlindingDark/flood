import _ from 'lodash';
import classnames from 'classnames';
import React from 'react';

import CustomScrollbars from '../ui/CustomScrollbars';
import ModalActions from './ModalActions';
import ModalTabs from './ModalTabs';

const METHODS_TO_BIND = ['handleTabChange'];

export default class Modal extends React.Component {
  constructor() {
    super();

    this.state = {
      activeTabId: null
    };

    METHODS_TO_BIND.forEach((method) => {
      this[method] = this[method].bind(this);
    });
  }

  getActiveTabId() {
    if (this.state.activeTabId) {
      return this.state.activeTabId;
    }

    return Object.keys(this.props.tabs)[0];
  }

  handleTabChange(tab) {
    this.setState({activeTabId: tab.id});
  }

  handleMenuWrapperClick(event) {
    event.stopPropagation();
  }

  render() {
    let content = this.props.content;
    let footer = null;
    let contentClasses = classnames('modal__content__wrapper',
      `modal--align-${this.props.alignment}`);
    let tabs = null;

    if (this.props.tabs) {
      let activeTabId = this.getActiveTabId();

      content = this.props.tabs[activeTabId].content;
      tabs = (
        <ModalTabs activeTabId={activeTabId} onTabChange={this.handleTabChange}
          tabs={this.props.tabs} />
      );
    }

    if (this.props.actions) {
      footer = <ModalActions actions={this.props.actions} dismiss={this.props.dismiss} />;
    }

    return (
      <div className={contentClasses} onClick={this.handleMenuWrapperClick}>
        <div className="modal__header">
          {this.props.heading}
          {tabs}
        </div>
        <div className="modal__content">
          {content}
          {footer}
        </div>
      </div>
    );
  }
}

Modal.defaultProps = {
  alignment: 'left'
};