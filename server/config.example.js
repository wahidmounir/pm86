const config = {
  "development": {
    "allow":         "http://127.0.0.1:8080",
    "secret":        "",
    "dbpath":        "mongodb://127.0.0.1:27017/pm86",
    "sessiondbpath": "mongodb://127.0.0.1:27017/pm86-session",
    "endpoints":     {
        "web":     "https://127.0.0.1:4438",
        "reverse": "http://127.0.0.1:43554",
        "push":    "http://127.0.0.1:41624"
    },
    "ports": {
      "wss":    "3002",
      "ioswss": "8055"
    },
    "gitConfig": {
      "client_id": "",
      "client_secret": "",
      "scope": "user:email"
    }
  },
  "development": {
    "allow":         "http://127.0.0.1:8080",
    "secret":        "",
    "dbpath":        "mongodb://127.0.0.1:27017/pm86",
    "sessiondbpath": "mongodb://127.0.0.1:27017/pm86-session",
    "endpoints":     {
        "web":     "https://127.0.0.1:4438",
        "reverse": "http://127.0.0.1:43554",
        "push":    "http://127.0.0.1:41624"
    },
    "ports": {
      "wss":    "3002",
      "ioswss": "8055"
    },
    "gitConfig": {
      "client_id": "",
      "client_secret": "",
      "scope": "user:email"
    }
  }
}

export default process.env.NODE_ENV === 'production' ? config['production'] : config['development']
