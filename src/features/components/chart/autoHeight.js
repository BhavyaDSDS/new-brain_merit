import React from "react";

function computeHeight(node) {
  const { style } = node;
  style.height = "100%";
  const totalHeight = parseInt(`${getComputedStyle(node).height}`, 10);
  const padding =
    parseInt(`${getComputedStyle(node).paddingTop}`, 10) +
    parseInt(`${getComputedStyle(node).paddingBottom}`, 10);
  return totalHeight - padding;
}
function getAutoHeight(n) {
  if (!n) {
    return 0;
  }
  const node = n;
  let height = computeHeight(node);
  const { parentNode } = node;
  if (parentNode) {
    height = computeHeight(parentNode);
  }
  return height;
}
function autoHeight() {
  return (WrappedComponent) => {
    class AutoHeightComponent extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          computedHeight: 0,
        };
        this.root = undefined;
        this.handleRoot = (node) => {
          this.root = node;
        };
      }

      componentDidMount() {
        // eslint-disable-next-line react/prop-types
        const { height } = this.props;
        if (!height) {
          let h = getAutoHeight(this.root);
          this.setState({ computedHeight: h });
          if (h < 1) {
            h = getAutoHeight(this.root);
            this.setState({ computedHeight: h });
          }
        }
      }

      render() {
        // eslint-disable-next-line react/prop-types
        const { height } = this.props;
        const { computedHeight } = this.state;
        const h = height || computedHeight;
        return (
          <div ref={this.handleRoot}>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            {h > 0 && <WrappedComponent {...this.props} height={h} />}
          </div>
        );
      }
    }
    return AutoHeightComponent;
  };
}

export default autoHeight;
