import ScriptTag from 'react-script-tag';
import React, { Component } from 'react';


       
class Magnet extends Component {
    constructor(props) {
        super(props);
       
        
    }
    render(){
        window.webtor = window.webtor || [];
        //console.log(this.props.magnetUri);
        window.webtor.push({
            id: 'player',
            //this is where i want to insert magnet url which i have 
            magnet: 'magnet:?xt=urn:btih:'+this.props.magnetUri,
            on: function(e) {
                if (e.name == window.webtor.TORRENT_FETCHED) {
                    console.log('Torrent fetched!', e.data);
                }
                if (e.name == window.webtor.TORRENT_ERROR) {
                    console.log('Torrent error!');
                }
            },
            
            
            lang: 'en',
            i18n: {
                en: {
                    common: {
                        "prepare to play": "Preparing Video Stream... Please Wait...",
                    },
                    stat: {
                        "seeding": "Seeding",
                        "waiting": "Client initialization",
                        "waiting for peers": "Waiting for peers",
                        "from": "from",
                    },
                },
            },
        });
        return (
            <div>
                
                <div id="player" className="webtor" ></div>
                <ScriptTag type="text/javascript" src='https://cdn.jsdelivr.net/npm/@webtor/player-sdk-js/dist/index.min.js' />
                
            </div>
        );
    }
    
    
}
export default Magnet;