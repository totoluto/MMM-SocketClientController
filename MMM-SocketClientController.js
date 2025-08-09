Module.register("MMM-SocketClientController", {
    defaults: {
        socketUrl: "",
        socketToken: "",
        onCommand: "wlr-randr --output HDMI-A-1 --on transform 270",
        offConmmand: "wlr-randr --output HDMI-A-2 --off",
    },

    start: function() {
        Log.info("Starting module: " + this.name);
        this.setupSocket();
    },

    setupSocket: function() {
        this.sendSocketNotification('CONNECT_SOCKET', this.config);
    },

    notificationReceived: function(notification, payload, sender) {
        if (notification === 'REMOTE_ACTION') {
            this.handleSocketEvent(payload);
        }
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === 'EVENT_ACTION') {
            this.handleSocketEvent(payload);
        }
    },

    handleSocketEvent: function(event) {
        const eventPrefix = event.split('_')[0];
        let eventSuffix = null;

        if (event.includes('_')) {
            eventSuffix = event.split('_')[1];
        }
             
        switch (eventPrefix) {
            case "SCREEN":
                this.sendSocketNotification("SCREEN_ACTION", eventSuffix);
                break;
            case "PAGE":
                this.handlePageEvent(eventSuffix);
                break;
            default:
                this.sendNotification(event);
                break;
        }
    },

    handlePageEvent: function(event) {
        this.sendNotification("PAGE_SELECT", event);
    }
});
