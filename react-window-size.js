//
// License: MIT
//
// Exports the WindowSize decorator, which hides window
// resize state from its decorated Component.
//
// To use decorator syntax:
//
//   babel?stage=1
//
// Example:
//
//   @WindowSize((width, height) => {
//     // return props for your component, based on the window size:
//     return {
//      collapsed: width < 960,
//     };
//   })
//   class Menu extends React.Component {
//     render() {
//       // use the props:
//       const { collapsed } = this.props;
//       return collapsed ? <CollapsedMenu /> : <ExpandedMenu />;
//     }
//   }
//
// Arguments:
//
//   collector: (width, height) => props
//     
//     A function which computes new props based on the window width
//     and height. The function returns an object which is merged
//     into the decorated component's props.
//
// For brevity, wrap the braces in parens to directly return the props:
//
//   @WindowSize(width => ({ collapsed: width < 960 }))
//   class Menu extends React.Component {
//     ...same as above
//   }
//

import React from 'react';

function defaultCollector(width, height) {
  return { width, height };
}

export default function WindowSize(collector=defaultCollector) {
  return function decorateComponent(DecoratedComponent) {
    const displayName =
      DecoratedComponent.displayName ||
      DecoratedComponent.name ||
      'Component';

    const container = class WindowSizeContainer extends React.Component {
      constructor(props) {
        super(props);
        this.state = { width: window.innerWidth, height: window.innerHeight };
      }

      componentDidMount() {
        this._resizeCallback = () => this.setState({
          width: window.innerWidth,
          height: window.innerHeight,
        });
        window.addEventListener('resize', this._resizeCallback);
      }

      componentWillUnmount() {
        window.removeEventListener('resize', this._resizeCallback);
      }

      render() {
        const { width, height } = this.state;
        const props = {
          ...collector(width, height),
          ...this.props,
        }
        return <DecoratedComponent {...props}/>;
      }
    }

    container.DecoratedComponent = DecoratedComponent;
    container.displayName = `WindowSize(${displayName})`;

    return container;
  }
}