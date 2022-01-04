import "./styles.css";
import { useState } from "react";
import Xarrow from "react-xarrows";
import React from "react";
import ReactDOM from "react-dom";

export default function App() {
  // state
  const [selectedLeftNode, setSelectedLeftNode] = useState();
  const [selectedRightNode, setSelectedRightNode] = useState();
  const [connections, setConnections] = useState([]);

  const clearSelection = () => {
    setSelectedLeftNode(undefined);
    setSelectedRightNode(undefined);
  };

  const clickNode = (nodeType, nodeID) => {
    if (nodeType === "left") {
      if (!selectedLeftNode) {
        if (selectedRightNode) setSelectedRightNode(undefined);
        setSelectedLeftNode(nodeID);
      } else setSelectedLeftNode(undefined);
    }
    if (nodeType === "right") {
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
    // console.log(updateXarrow);
    connections.push({
      source,
      target
    });
  };

  return (
    <>
      <div className="operation-container">
        <div className="left">
          <div
            className={`node ${
              selectedLeftNode === "item_left" ? `selected` : ``
            }`}
            id="item_left"
            onClick={() => clickNode("left", "item_left")}
          >
            Left Node
          </div>
          {/* <XArrow start={"item_left"} end={"item_right"} /> */}
          <div
            className={`node ${
              selectedLeftNode === "item_left2" ? `selected` : ``
            }`}
            id="item_left2"
            onClick={() => clickNode("left", "item_left2")}
          >
            Left Node 2
          </div>
          <div
            className={`node ${
              selectedLeftNode === "item_left3" ? `selected` : ``
            }`}
            id="item_left3"
            onClick={() => clickNode("left", "item_left3")}
          >
            Left Node 3
          </div>
        </div>
        <div className="right">
          <div
            className={`node ${
              selectedRightNode === "item_right" ? `selected` : ``
            }`}
            id="item_right"
            onClick={() => clickNode("right", "item_right")}
          >
            Right Node
          </div>
          <div
            className={`node ${
              selectedRightNode === "item_right2" ? `selected` : ``
            }`}
            id="item_right2"
            onClick={() => clickNode("right", "item_right2")}
          >
            Right Node 2
          </div>
          {/* <button onClick={remove}>Remove</button> */}
        </div>
      </div>

      <div id="xarrow-container">
        {connections.map((connection) => (
          <Xarrow
            key={`${connection.source}-${connection.target}`}
            start={connection.source}
            end={connection.target}
          />
        ))}
      </div>
    </>
  );
}
