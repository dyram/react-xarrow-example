import './styles.css';
import { useState } from 'react';
import React from 'react';

// components
import Line from './components/Line';

export default function App() {
  // state
  const [selectedLeftNode, setSelectedLeftNode] = useState();
  const [selectedRightNode, setSelectedRightNode] = useState();
  const [connections, setConnections] = useState([]);
  const [selectedConnections, setSelectedConnections] = useState([]);

  const clearSelection = () => {
    setSelectedLeftNode(undefined);
    setSelectedRightNode(undefined);
  };

  const clickNode = (nodeType, nodeID) => {
    if (nodeType === 'left') {
      if (!selectedLeftNode) {
        if (selectedRightNode) setSelectedRightNode(undefined);
        setSelectedLeftNode(nodeID);
      } else setSelectedLeftNode(undefined);
    }
    if (nodeType === 'right') {
      if (!selectedRightNode) {
        if (selectedLeftNode) {
          drawLine(selectedLeftNode, nodeID);
          clearSelection();
        } else setSelectedRightNode(nodeID);
      } else {
        setSelectedRightNode(undefined);
      }
    }
  };

  const drawLine = (source, target) => {
    setConnections((prevConnections) => [
      ...prevConnections,
      {
        source,
        target,
      },
    ]);
  };

  const clickLine = (connectionID) => {
    if (selectedConnections.findIndex((conID) => conID === connectionID) > -1) {
      let updatedConnections = selectedConnections.filter(
        (cID) => cID !== connectionID
      );
      setSelectedConnections(updatedConnections);
    } else {
      setSelectedConnections((prevSelectedConnections) => [
        ...prevSelectedConnections,
        connectionID,
      ]);
    }
  };

  const removeSelectedConnections = () => {
    let updatedConnections = [];
    let connectionsToBeRemoved = new Set(selectedConnections);

    updatedConnections = connections.filter(
      (connection) =>
        !connectionsToBeRemoved.has(`${connection.source}-${connection.target}`)
    );
    setConnections(updatedConnections);
    setSelectedConnections([]);
  };

  const removeAllConnections = () => {
    clearSelection();
    setConnections([]);
    setSelectedConnections([]);
  };

  return (
    <>
      <div className="header">
        <button
          onClick={removeSelectedConnections}
          disabled={selectedConnections.length < 1}
          className={
            selectedConnections.length < 1 ? `disabled-btn` : `btn danger-btn`
          }
        >
          Remove Selected Connections
        </button>

        <button
          onClick={removeAllConnections}
          disabled={connections.length < 1}
          className={
            connections.length < 1
              ? `disabled-btn ml-10`
              : `btn danger-btn ml-10`
          }
        >
          Remove All Connections
        </button>
      </div>

      <div className="operation-container">
        <div className="left">
          <div
            className={`node ${
              selectedLeftNode === 'item_left' ? `selected` : ``
            }`}
            id="item_left"
            onClick={() => clickNode('left', 'item_left')}
          >
            Left Node
          </div>
          {/* <XArrow start={"item_left"} end={"item_right"} /> */}
          <div
            className={`node ${
              selectedLeftNode === 'item_left2' ? `selected` : ``
            }`}
            id="item_left2"
            onClick={() => clickNode('left', 'item_left2')}
          >
            Left Node 2
          </div>
          <div
            className={`node ${
              selectedLeftNode === 'item_left3' ? `selected` : ``
            }`}
            id="item_left3"
            onClick={() => clickNode('left', 'item_left3')}
          >
            Left Node 3
          </div>
        </div>
        <div className="right">
          <div
            className={`node ${
              selectedRightNode === 'item_right' ? `selected` : ``
            }`}
            id="item_right"
            onClick={() => clickNode('right', 'item_right')}
          >
            Right Node
          </div>
          <div
            className={`node ${
              selectedRightNode === 'item_right2' ? `selected` : ``
            }`}
            id="item_right2"
            onClick={() => clickNode('right', 'item_right2')}
          >
            Right Node 2
          </div>
          {/* <button onClick={remove}>Remove</button> */}
        </div>
      </div>

      <div id="xarrow-container">
        {connections.map((connection) => (
          <span
            onClick={() =>
              clickLine(`${connection.source}-${connection.target}`)
            }
            key={`${connection.source}-${connection.target}`}
            className="pointed xarrow-span"
          >
            <Line
              id={`${connection.source}-${connection.target}`}
              connection={connection}
              selectedConnections={selectedConnections}
            />
          </span>
        ))}
      </div>
    </>
  );
}
