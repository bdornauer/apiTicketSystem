import * as handTrack from 'handtrackjs';
import {Button} from "react-bootstrap";
import React, {useRef, useState} from 'react';
import ControlBar from "../commandPallet/ControlBar";

function GestureController() {
    const [currentPrediction, setCurrentPrediction] = useState("")
    const [currentCommand, setCurrentCommand] = useState("-1")
    const video = useRef(null);
    const canvas = useRef(null)
    const screenWidth = 680;
    const screenHeight = 480;


    const modelParams = {
        flipHorizontal: true,   // flip e.g for video
        imageScaleFactor: 0.7,  // reduce input image size .
        maxNumBoxes: 5,        // maximum number of boxes to detect
    }

    let canvas2dContext, model;

    async function startWebcamForDetection() {
        model = await handTrack.load(modelParams);
        console.log(modelParams)
        canvas2dContext = canvas.current.getContext('2d');

        await handTrack.startVideo(video.current);
        detectHandsInVideo();
    }

    function detectHandsInVideo() {
        model.detect(video.current).then(predictions => {
            const filtertedPredictions = filterPinchAndClosedHand(predictions);


            if (isSomethingDetected(filtertedPredictions)) {
                const bBox = filtertedPredictions[0].bbox;
                const centerOfBBox = calculateCenterOfBBox(bBox[0], bBox[1], bBox[2], bBox[3])
                const gridPosition = positionInGrid(centerOfBBox[0], centerOfBBox[1])
                controlCommandPalett(gridPosition);
                const positionString = predictionToString(centerOfBBox[0], centerOfBBox[1])
                setCurrentPrediction("Position: " + positionString + " in Grid " + gridPosition);
            } else {
                setCurrentPrediction("Nothing detected");
            }


            //console.log("Predictions: ", predictions);
            //console.log("FPS  ", model.getFPS())
            model.renderPredictions(predictions, canvas.current, canvas2dContext, video.current);
            window.requestAnimationFrame(detectHandsInVideo);
        });
    }

    function controlCommandPalett(gridPosition) {
        switch (gridPosition) {
            case "topCenter":
                setCurrentCommand("up");
                break;
            case "bottomCenter":
                setCurrentCommand("down");
                break;
            case "centerLeft":
                setCurrentCommand("left");
                break;
            case "centerRight":
                setCurrentCommand("right");
                break;
            default:
                setCurrentCommand("-1");
        }
    }

    function isSomethingDetected(array) {
        return array !== undefined && array.length >= 1;
    }

    function predictionToString(xPosition, yPosition) {
        return "(" + Math.round(xPosition) + ", " + Math.round(yPosition) + ")"
    }

    //closedHand means that the hand is open (a bit confusing)
    function filterPinchAndClosedHand(array) {
        if (array !== undefined && array.length >= 1) {
            return array.filter(element => element.label === "pinch" || element.label === "closed");
        } else {
            return []
        }
    }

    /**
     * BBox consists of two points
     * - (bbox[0],bbox[1]) ist  (minX, minY) --> left top
     * - (bbox[2],bbox[3]) (deltaX, deltY) in this way maxX = minX + deltX
     * to receive the bounding box
     * see: http://underpop.online.fr/j/java/img/fig09_01.jpg
     */
    function calculateCenterOfBBox(minX, minY, deltaX, deltaY) {
        return [minX + deltaX / 2, minY + deltaY / 2]
    }

    /**
     * in a 640x480 pixel grid
     * ----------------------
     * |   1  |   2  |   3  |
     * ----------------------
     * |   4  |   5  |   6  |
     * ----------------------
     * |   7 |   8  |   9   |
     * ----------------------
     * 1: topLeft 2:topCenter 3:topRight;
     * 4: centerLeft 5:centerCenter 6:centerRight
     * 7: bottomLeft 8:bottomCenter 9:bottomRight
     */
    function positionInGrid(xPosition, yPosition) {
        let gridName;

        //top to bottom
        if (yPosition < 160) {
            gridName = "top"
        } else if (yPosition < 260) {
            gridName = "center"
        } else {
            gridName = "bottom"
        }

        //left to right

        if (xPosition < 213.3) {
            gridName += "Left"
        } else if (xPosition < 416.6) {
            gridName += "Center"
        } else {
            gridName += "Right"
        }

        return (gridName);
    }

    return (
        <div>
            {ControlBar(currentCommand)}<br/>
            <Button variant="secondary" onClick={startWebcamForDetection}>Start Webcam</Button>
            <video ref={video} width={screenWidth} height={screenHeight} style={{"visibility": "hidden"}}/>
            <canvas ref={canvas} width={screenWidth} height={screenHeight}/>
            <div>
                <p>{currentPrediction}</p>
            </div>
        </div>
    );

}

export default GestureController;