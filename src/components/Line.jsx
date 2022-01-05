import React from 'react';
import Xarrow from 'react-xarrows';

export default function Line(props) {
  const { id, selectedConnections, connection } = props;

  return (
    <Xarrow
      id={id}
      // key={`${connection.source}-${connection.target}`}
      start={connection.source}
      end={connection.target}
      strokeWidth={2}
      color={
        selectedConnections.findIndex((conID) => conID === id) > -1
          ? `red`
          : `blue`
      }
    />
  );
}
