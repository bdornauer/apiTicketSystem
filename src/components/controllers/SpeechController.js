import React, {Fragment, useState} from 'react';
import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition';
import ControlBar from "../commandPallet/ControlBar";
import {Alert, Button, ListGroup, ListGroupItem} from "react-bootstrap";

function SpeechController() {
    const [currentCommand, setCurrentCommand] = useState("-1")

    const commands = [
        {
            command: "top",
            callback: () => setCurrentCommand("up")
        },
        {
            command: "down",
            callback: () => {
                setCurrentCommand("down")
            }
        },
        {
            command: "left",
            callback: () => setCurrentCommand("left")
        },
        {
            command: "right",
            callback: () => setCurrentCommand("right")
        }
    ];

    for (let i = 0; i < 250; i++) {
        commands.push({command: i.toString(), callback: () => setCurrentCommand(i.toString())})
    }

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition({commands});

    if (!browserSupportsSpeechRecognition) {
        return (
            <Alert variant="danger">
                <Alert.Heading>Not supported browser</Alert.Heading>
                <p>
                    Change to Chrome
                </p>
            </Alert>
        )
    }

    if (!browserSupportsSpeechRecognition) {
        return (
            <Alert variant="danger">
                <Alert.Heading>No micro available</Alert.Heading>
                <p>
                   Add a micro.
                </p>
            </Alert>
        )
    }

    function startListening() {

        SpeechRecognition.startListening({continuous: true});
        //TODO: change possible settings: https://github.com/JamesBrill/react-speech-recognition/tree/8ecb6052949e47a3fae8c6978abb4253ee1d00f1
        throw Error("Something went wrong")
    }

    return (
        <Fragment>
            <ListGroup componentClass="ul">
                <ListGroupItem><Button onClick={startListening}>Start to listen</Button></ListGroupItem>
                <ListGroupItem>Microphone is: {listening ? 'on' : 'off'}</ListGroupItem>
                <ListGroupItem>Transcript: {transcript}</ListGroupItem>
                <ListGroupItem>{ControlBar(currentCommand)}</ListGroupItem>
            </ListGroup>
        </Fragment>
    );

}


export default SpeechController;