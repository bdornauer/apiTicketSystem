// https://javascriptimageviewer.wordpress.com/2019/03/25/displaying-dicom-images/
//and dicom & react

import cornerstone from 'cornerstone-core';
import cornerstoneMath from 'cornerstone-math';
import cornerstoneTools from 'cornerstone-tools';
import cornerstoneWebImageLoader from "cornerstone-web-image-loader";
import cornerstoneWADOImageLoader from "cornerstone-wado-image-loader"
import {Fragment, useEffect} from "react";
import Hammer from "hammerjs";
import dicomParser from "dicom-parser"
import configurations from "./DicomViewerDefaultConfiguration"

cornerstoneTools.external.cornerstone = cornerstone;
cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
cornerstoneWebImageLoader.external.cornerstone = cornerstone;
cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
cornerstoneWADOImageLoader.external.dicomParser = dicomParser;
cornerstoneTools.external.Hammer = Hammer;
cornerstoneTools.init();
cornerstoneWADOImageLoader.webWorkerManager.initialize(configurations.config);


function DicomViewer(props) {
    let dicomElement;

    //initialize dicom web viewer
    useEffect(() => {
        //Init
        dicomElement = document.getElementById('dicomImage');
        cornerstone.enable(dicomElement);

        //Activate Tools and load images
        loadDicomMouseTools();
        initializeViewport(dicomElement)
        cornerstone.loadImage(configurations.exampleDCM).then(function (image) {
            cornerstone.displayImage(dicomElement, image);
        })

        //apply sample canvas effect
        //dicomElement.addEventListener('cornerstoneimagerendered', applyCanvasEffects);

        //invertColors
        //invertColors();
    });

    let counter = 0
    useEffect(() => {
        console.log(counter++)
        invertColors(props.commands.invertColors);
    }, [props.commands.invertColors])

    function applyCanvasEffects(e) {
        const eventData = e.detail;
        cornerstone.setToPixelCoordinateSystem(eventData.enabledElement, eventData.canvasContext);
        // NOTE: The coordinate system of the canvas is in image pixel space.  Drawing
        // to location 0,0 will be the top left of the image and rows,columns is the bottom
        // right.
        const context = eventData.canvasContext;

        context.save()//import to keep functionalities
        context.beginPath();
        context.strokeStyle = 'white';
        context.lineWidth = 2.20;
        context.rect(128, 90, 50, 60);
        context.stroke();
        context.fillStyle = "white";
        context.font = "6px Arial";
        context.fillText("Tumor Here", 128, 85);
        context.restore() //import to keep functionalities
    }

    //loading tools for mouse-usage
    function loadDicomMouseTools() {
        //panTool
        const PanTool = cornerstoneTools.PanTool;
        cornerstoneTools.addTool(PanTool)
        cornerstoneTools.setToolActive('Pan', {mouseButtonMask: 1})

        //active wheel zooming in and out
        const ZoomMouseWheelTool = cornerstoneTools.ZoomMouseWheelTool;
        cornerstoneTools.addTool(ZoomMouseWheelTool)
        cornerstoneTools.setToolActive('ZoomMouseWheel', {mouseButtonMask: 2})

        //contrast Tool
        const WwwcTool = cornerstoneTools.WwwcTool;
        cornerstoneTools.addTool(WwwcTool)
        cornerstoneTools.setToolActive('Wwwc', {mouseButtonMask: 4})

        //rotation Tool
        const RotateTool = cornerstoneTools.RotateTool;
        cornerstoneTools.addTool(RotateTool)
        cornerstoneTools.setToolActive('Rotate', {mouseButtonMask: 8})
    }

    //setting default viewport
    function initializeViewport(dicomElement) {
        cornerstone.setViewport(dicomElement, configurations.viewport);
        cornerstone.updateImage(dicomElement);
    }

    function invertColors(isInvert) {
        let currentViewport = cornerstone.getViewport(dicomElement);
        currentViewport.invert = isInvert;
        cornerstone.setViewport(dicomElement, currentViewport);
        cornerstone.updateImage(dicomElement);
    }

    return (
        <Fragment>
            <h3>Dicom Viewer</h3>
            <div style={{width: configurations.dicomSettings.width, height: configurations.dicomSettings.height}}>
                <div id="dicomImage"
                     style={{
                         width: configurations.dicomSettings.width,
                         height: configurations.dicomSettings.height,
                         margin: "35px auto",
                         background: "black"
                     }}/>
            </div>
            {props.commands.invertColors? "YES" : "NO"}
        </Fragment>
    );
}

export default DicomViewer;