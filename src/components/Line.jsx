import React from 'react';
import Xarrow from 'react-xarrows';

export default function Line(props) {
  const { id, selectedConnections, connection } = props;

  return (
    <Xarrow
      id={id}
      start={connection.source}
      end={connection.target}
      strokeWidth={4}
      color={
        selectedConnections.findIndex((conID) => conID === id) > -1
          ? `red`
          : `blue`
      }
      labels={{ start: `${connection.source} -> ${connection.target}` }}
      path="smooth"
      startAnchor="right"
      endAnchor="left"
    />
  );
}
