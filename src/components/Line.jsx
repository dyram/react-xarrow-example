import React from 'react';
import Xarrow from 'react-xarrows';

export default function Line(props) {
  const { id, selectedConnections, connection } = props;
  const { isScrollBottomVisible, isScrollTopVisible, source, target } =
    connection;

  const getTarget = () => {
    let updatedTarget = target;
    if (!isScrollTopVisible) {
      updatedTarget = 'scroll-div-target';
    }
    if (!isScrollBottomVisible) {
      updatedTarget = 'scroll-div-target-bottom';
    }
    return updatedTarget;
  };

  return (
    <Xarrow
      id={id}
      start={source}
      end={getTarget()}
      strokeWidth={4}
      color={
        selectedConnections.findIndex((conID) => conID === id) > -1
          ? `red`
          : `blue`
      }
      // labels={{ start: `${connection.source} -> ${connection.target}` }}
      path="straight"
      startAnchor="right"
      endAnchor="left"
      dashness={true}
    />
  );
}
