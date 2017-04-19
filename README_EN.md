# PM86

[![npm version](https://badge.fury.io/js/pm86.svg)](https://badge.fury.io/js/pm86)
[![Code Climate](https://codeclimate.com/github/ericjjj/pm86/badges/gpa.svg)](https://codeclimate.com/github/ericjjj/pm86)
[![Package Quality](http://npm.packagequality.com/shield/pm86.svg)](http://packagequality.com/#?package=pm86)
[![npm](https://img.shields.io/npm/dt/pm86.svg)](https://www.npmjs.com/package/pm86)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](LICENSE)

## Preface
 Because the company ready to monitor the deployment of unified processes such as the need for a perfect tool to do these things, so there is the birth of this project, V1 to do more rough, after a period of idle, but also carried out grinding, improvement, the next will continue Update, as a major item to maintain, thank you, if you encounter problems in the use, please contact me github@ericjj.com

## Intro
  - [Pm86-ci](https://github.com/ericjjj/pm86-cli) command line tool compatible with PM2
  - [Completely open source](https://github.com/ericjjj/PM86) can be deployed on a private server, using the API to develop mobile end monitoring APP
  - Websocket transfers data
  - Easy to deploy

## Features
- [x] Element UI
- [x] Compatible with PM2
- [x] Independent account management system
- [x] Monitor application process information
- [x] Remote control process Reload, Restart, Rorward, Backward
- [x] Mail alarm notification
- [ ] Mobile APP
- [ ] Slow route

## Usage
``` bash
$ npm install pm86 -g
$ pm86 interact secret_key public_key
$ pm86 start processes.json
```

## How to Start
**Requires Node.js 6+**

``` shell
1. start mongodb

2. run cloud service
$ cd pm86
$ cp config.simple.json config.json
# modify config.json
$ npm install
$ node server.js

3. register account, create secret_key public_key
  open http://127.0.0.1:3000/login
  open http://127.0.0.1:3000/create

4.install pm86
$ npm install pm86 -g
$ cd your-project-path, create `processes.json` fole
// register you machine
$ pm86 interact secret_key public_key
// start service
$ pm86 start processes.json
  open http://127.0.0.1:3000/buckets
```

## Deploy
if you set up a firewall such as `ufw`, need to open the port there: 3000, 3002, 8080. 43554, 43555, 43666
``` shell
1. build
$ npm run build

2. modify nginx.conf

3. modify config

4 pm86 start processes.json
```

## Demo Pics

![Login](http://ohusmobs2.bkt.clouddn.com/20170323149025368139834.png)

![Buckets](http://ohusmobs2.bkt.clouddn.com/2017032714905445717484.png)

![Bucket](http://ohusmobs2.bkt.clouddn.com/20170323149025373745286.png)

![Bucket](http://ohusmobs2.bkt.clouddn.com/2017032314902537439632.png)

email
![email](http://ohusmobs2.bkt.clouddn.com/2017032714905443908633.png)

email
![email](http://ohusmobs2.bkt.clouddn.com/20170323149025516183982.png)

processes.json file example
``` json

  /**
   * Application configuration section
   */
  "apps" : [
        {
            "name"      : "pm86",
            "max_memory_restart": "300M",
            "script"    : "index.js",
            "log_date_format": "YYYY-MM-DD HH:mm Z",
            "out_file" : "var/log/pm86/pm86_out.log",
            "error_file" : "var/log/pm86/pm86_error.log",
            "instances"  : 4,
            "exec_mode"  : "cluster",
            "env": {
                "NODE_ENV": "production"
            }
        }
  ]
}

```


