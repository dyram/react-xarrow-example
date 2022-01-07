import './styles.css';
import { useState, useEffect } from 'react';
import React from 'react';
import { useXarrow, Xwrapper } from 'react-xarrows';

import ResizePanel from 'react-resize-panel';

// custom-components
import Line from './components/Line';

export default function App() {
  const updateXarrow = useXarrow();

  // V.V Important function
  const checkScrollVisibilityAndRedraw = () => {
    if (connections.length > 0) {
      let updatedConnections = connections;

      updatedConnections.map((connection, index) => {
        let targetY = document
          .getElementById(connection.target)
          .getBoundingClientRect().y;
        if (targetY < 25) {
          updatedConnections[index].isScrollTopVisible = false;
        }
        if (targetY > 25) {
          updatedConnections[index].isScrollTopVisible = true;
        }
        if (targetY > 655) {
          updatedConnections[index].isScrollBottomVisible = false;
        }
        if (targetY < 655) {
          updatedConnections[index].isScrollBottomVisible = true;
        }
      });

      setConnections(updatedConnections);
    }

    // console.log(document.getElementById('item_right2').getBoundingClientRect());
  };

  const handleScroll = () => {
    updateXarrow();
    checkScrollVisibilityAndRedraw();
  };

  useEffect(() => {
    // document.addEventListener('scroll', handleScroll);
    // setConnections((prevConnections) => [
    //   ...prevConnections,
    //   { source: 'item_left', target: 'scroll-div-target-bottom' },
    // ]);
  }, []);

  // state
  const [selectedLeftNode, setSelectedLeftNode] = useState();
  const [selectedRightNode, setSelectedRightNode] = useState();
  const [connections, setConnections] = useState([]);
  const [selectedConnections, setSelectedConnections] = useState([]);

  //tests
  const [variableHeight, setVariableHeight] = useState('200vh');

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
        isScrollTopVisible: true,
        isScrollBottomVisible: true,
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

      <Xwrapper>
        <div className="resize-flex-container">
          {/* SOURCE PANE */}
          <ResizePanel direction="e">
            <div className="pane" onMouseOver={updateXarrow}>
              <div
                className={`node ${
                  selectedLeftNode === 'item_left' ? `selected` : ``
                }`}
                id="item_left"
                onClick={() => clickNode('left', 'item_left')}
              >
                Left Node
              </div>
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
          </ResizePanel>
          {/* TARGET PANE */}
          <ResizePanel direction="e">
            <div
              className="pane"
              onScroll={handleScroll}
              onMouseOver={updateXarrow}
              id={'target-pane'}
            >
              <div
                id="scroll-div-target"
                style={{
                  height: '0.8px',
                  visibility: 'hidden',
                  position: 'fixed',
                }}
              ></div>
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
                style={{ height: variableHeight }}
                onClick={() => {
                  setVariableHeight('20vh');
                  checkScrollVisibilityAndRedraw();
                }}
              ></div>
              <div
                className={`node ${
                  selectedRightNode === 'item_right2' ? `selected` : ``
                }`}
                id="item_right2"
                onClick={() => clickNode('right', 'item_right2')}
              >
                Right Node 2
              </div>
              <div
                id="scroll-div-target-bottom"
                style={{
                  height: '0.8px',
                  visibility: 'hidden',
                  position: 'fixed',
                  top: '680px',
                }}
              ></div>
            </div>
          </ResizePanel>
          {/* FUNCTION PANE */}
          <div className="pane grow-pane">
            <div>Functions</div>
          </div>
        </div>

        {/* <div className="footer-pane">
          <h1>Error popup from bottom</h1>
        </div> */}

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
      </Xwrapper>
    </>
  );
}
