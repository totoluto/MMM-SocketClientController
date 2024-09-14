var NodeHelper = require("node_helper");
var io = require('socket.io-client');
const { exec } = require('child_process');

module.exports = NodeHelper.create({
    start: function() {
        console.log("Starting node_helper for: " + this.name);
        this.socket = null;
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === 'CONNECT_SOCKET') {
            this.config = payload;
            this.connectSocket();
        }

        if (notification === 'SCREEN_ACTION') {
            this.handleScreenEvent(payload);
        }
    },

    connectSocket: function() {
        this.socket = io.connect(this.config.socketUrl + "?token=" + this.config.socketToken);

        this.socket.on("event", (event) => {
            this.sendSocketNotification('EVENT_ACTION', event);
        });
    },

    handleScreenEvent: function(event) {
        switch (event) {
            case "ON":
                console.log("Turning on screen");
                exec('xrandr --output ' + this.config.hdmiInput + ' --auto', (err, stdout, stderr) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                });
                break;
            case "OFF":
                console.log("Turning off screen");
                exec('xrandr --output ' + this.config.hdmiInput + ' --off', (err, stdout, stderr) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                });
                break;
        }
    },
});