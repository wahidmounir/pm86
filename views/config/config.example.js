const config = {
  'development': {
    base_url: 'http://127.0.0.1:3000/api',
    ws: '127.0.0.1:3002'
  },
  'production': {
    base_url: 'http://127.0.0.1:3000/api',
    ws: '127.0.0.1:3002'
  }
}

export default process.env.NODE_ENV === 'production' ? config['production'] : config['development']
