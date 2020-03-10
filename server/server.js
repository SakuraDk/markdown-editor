import express from 'express';
import mongoose from 'mongoose';

import fs from 'fs';
import multer from 'multer';
import moment from 'moment'

import Document from './database/Document';
import Image from './database/Image';
import Tag from './database/Tag';

const app = express();
const port = 3008

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/public', express.static(__dirname + '/public'));

const dbUrl = 'mongodb://localhost/wiki';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    const filenames = fs.readdirSync("public/images");
    const [ basename, ext ] = file.originalname.split('.')
    const id = filenames.filter(name => name.match(new RegExp('^' + basename + '_[0-9]+' + '\.')) !== null).length
    const imageName = `${basename}_${id}.${ext}`
    cb(null, imageName)
  }
})
const upload = multer({
  storage: storage
}).single('file')

mongoose.connect(dbUrl, dbErr => {
  if (dbErr) throw new Error(dbErr)
  else console.log("db connected")

  app.get('/api/document', (req, res) => {
    Document.findOne({ path: decodeURIComponent( req.query.path ) }, (err, doc) => {
      if( err ) res.status(500).send(err)
      else {
          if ( doc !== null ) { res.status(200).json({
          text: doc.text,
          tags: doc.tags,
          path: {
            current: doc.path,
            parent: doc.parent,
            children: doc.children,
          },
          updated: doc.updated,
         }) }else res.status(200).send()
      }
    })
  })

  app.post('/api/document', (req, res) => {
    new Document({
      path: req.body.path,
      parent: req.body.parent,
      children: [],
      text: '',
      tags: [],
      updated: moment(new Date()).format('YYYY-MM-DD HH:mm'),
    }).save(err => {
      if (err) res.status(500).send(err)
      else res.status(200).send()
    })
  })

  app.put('/api/document', (req, res) => {
    let diff = { updated: moment(new Date()).format('YYYY-MM-DD HH:mm') }
    Object.assign( diff, req.body.diff )
    Document.updateOne({ path: req.body.path },{ $set: diff }, (err) => {
      if (err) res.status(500).send(err)
      else {
        res.status(200).send()
        if( req.body.diff.tags !== undefined ) {
          req.body.diff.tags.map( (tag) => { new Tag({ name: tag }).save() } )
        }
      }
    })
  })

  app.delete('/api/document', (req, res) => {
    Document.deleteOne({ path: req.body.path }, (err) => {
      if (err) res.status(500).send(err)
      else {
        Document.updateOne({ path: req.body.parent }, { $pull: { children: req.body.path } } , (err) => {
          res.status(200).send()
        })
      }
    })
  })
  
  app.get('/api/images', (req, res) => {
    Image.find({}, (err, images) => {
      if (err) res.status(500).send(err)
      else {
        const prefix = req.protocol + '://' + req.headers.host + '/public/images/'
        res.status(200).send( images.map(image => prefix + image.filename) )
      }
    })
  })
  
  app.post('/api/images', (req, res) => {
    upload(req, res, (err) => {
      if (err) res.status(500).send(err)
      else {
        new Image({
          filename: req.file.filename
        }).save(saveErr => {
          if (saveErr) res.status(500).send(saveErr)
          else {
            const prefix = req.protocol + '://' + req.headers.host + '/public/images/';
            res.status(200).send(prefix + req.file.filename)
          }
        })
      }
    })
  })

  app.get('/api/documents', (req, res) => {
    Document.find({}, (err, docs) => {
      if (err) res.status(500).send(err)
      else {
        let pathToChildren = {}
        docs.forEach( (doc) => pathToChildren[doc.path] = doc.children )
        res.status(200).json(pathToChildren)
      }
    })
  })
  
  app.get('/api/options', (req, res) => {
    Tag.find({}, (err, options) => {
      if (err) res.status(500).send(err)
      else {
        res.status(200).send( options.map(tag => tag.name) )
      }
    })
  })

  app.listen(port, err => {
    if (err) throw new Error(err)
    else console.log(`listening on port ${port}`)
  })
})