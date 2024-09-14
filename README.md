# MMM-SocketClientController
A Magic Mirror Module which connects to a socket and recieves event which are then forwarded / executed on the magic mirror. This was made to also be used with [this Page-Selector plugin from Veldrovive](https://github.com/Veldrovive/MMM-Page-Selector). This is also the reason you can execute a page change with this. On top of that is also is able to turn on and off your screen using `xrandr`.

## Setup

### Create a Socket Server
Create an [MM-controlServer](https://github.com/totoluto/MM-controlServer) instance first and define all your commands and tokens.

### Installation
Navigate to the modules folder of your Magic Mirror installation.
```bash
cd ~/MagicMirror/modules
```
Clone the repository.

```bash
git clone https://github.com/totoluto/MMM-SocketClientController
```

Install dependencies (requires node to be installed).
```bash
cd ./MMM-SocketClientController
npm install
```
## Usage

You can import your Module into `config.js` like this.

```js
{
	module: "MMM-SocketClientController",
		config: {
			socketUrl: "https://to-your-web-server.com",
       		socketToken: "your-socket-token",
			hdmiInput: "HDMI-1",
		}
}
```

Ther is not much to be configured since it only forwards your events from the server.

If you have multiple screens connected to your Raspberry Pi, then you could change the HDMI input if desired.

One thing to notice is that if you want to use the page changing funtionality, then you need to prefix your event with `PAGE_`

### Example:

I have two pages configured. One is called `home` the other one is called `weather`.
To change the page via the socket Server your event need to be called.

`PAGE_home` or `PAGE_weather`

***DO NOT USE MORE THAN ONE UNDERSCORE WHEN NAMING THE PAGES!***
