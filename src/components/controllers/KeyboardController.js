import {Col, Container, Row, Table} from "react-bootstrap";
import {useState} from "react";
import ControlBar from "../commandPallet/ControlBar";
import DicomViewer from "../dicomViewer/DicomViewer";
import colors from "../Colors"

function KeyboardController() {
    const [commands, setCommands] = useState({
        invertColors: true,
    })

    function controllerInformation() {
        return (
            // Regional Indicator Symbol Letter
            <div style={{paddingLeft: "20%", paddingRight: "20%"}}>
                <h2>Keyboard-Controller</h2>
                <Table striped hover size="sm" style={{fontSize: "22px"}}>
                    <thead style={{backgroundColor: colors.brightBlue}}>
                    <tr>
                        <th>Taste</th>
                        <th>Beschreibung</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td><span role="img">🇮️️️</span></td>
                        <td>hinein zoomen</td>
                    </tr>
                    <tr>
                        <td><span role="img">🇴️️</span></td>
                        <td>heraus zoomen</td>
                    </tr>
                    <tr>
                        <td><span role="img">⬆️</span></td>
                        <td>gehe nach oben</td>
                    </tr>
                    <tr>
                        <td><span role="img">⬇️️</span></td>
                        <td>gehe nach unten</td>
                    </tr>
                    <tr>
                        <td><span role="img">⬅️</span></td>
                        <td>gehe nach links</td>
                    </tr>
                    <tr>
                        <td><span role="img">➡️️️</span></td>
                        <td>gehe nach rechts</td>
                    </tr>
                    <tr>
                        <td><span role="img">🇼️️️</span></td>
                        <td>Layer nach oben</td>
                    </tr>
                    <tr>
                        <td><span role="img">🇸️️️</span></td>
                        <td>Layer nach unten</td>
                    </tr>
                    <tr>
                        <td><span role="img">🇦️️</span></td>
                        <td>Helligkeit erhöhen</td>
                    </tr>
                    <tr>
                        <td><span role="img">🇩</span></td>
                        <td>Helligkeit verringern</td>
                    </tr>
                    <tr>
                        <td><span role="img">🇲</span></td>
                        <td>Sättigung erhöhen</td>
                    </tr>
                    <tr>
                        <td><span role="img">🇳️️</span></td>
                        <td>Sättigung verringern</td>
                    </tr>
                    <tr>
                        <td><span role="img">🇳️️</span></td>
                        <td>Farben invertieren</td>
                    </tr>
                    <tr>
                        <td><span role="img">🇨</span></td>
                        <td>Alles rückgängig</td>
                    </tr>
                    </tbody>
                </Table>
            </div>
        )
    }


    function change() {
        setCommands({invertColors: !commands.invertColors})
    }

    return (
        <Container style={{maxWidth: '100%', maxHeight: '100%'}}>
            <Row>
                <Col>
                    <ControlBar/>
                </Col>
            </Row>
            <Row>
                <Col xs={6}>{controllerInformation()}</Col>
                <Col><DicomViewer commands={commands}/></Col>
            </Row>
            <Row>
                <Col>Information</Col>
            </Row>
        </Container>
    );
}

export default KeyboardController;