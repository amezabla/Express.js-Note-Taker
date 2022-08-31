const note = require('express').Router();
const fs = require('fs');
const {readFromFile,readAndAppend,writeToFile} = require('../helpers/fs')

note.get('/', (req, res) =>{
  console.log("user get notes");
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
}
);

note.post('/', (req, res) =>{
  const {title,text} = req.body;
  if(req.body){

    const newTask = {title,text}
    readAndAppend(newTask, './db/db.json');
    res.json(`Tip added successfully 🚀`);
  }else{
    res.error('error in adding tip')
  }
}
);

note.delete('/:id', (req, res) =>{
    let deleted = JSON.parse(req.params.id)
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      let list = JSON.parse(data)
      newList = list.filter(task =>{
        if(task.title != deleted.title && task.text != deleted.text){
          return task
        }
      })
      console.log(newList)
      writeToFile('./db/db.json',newList)
      res.json("still working on this")
    });
}
);

module.exports = note