//Create web server
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const comments = require('./comments');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Get all comments
app.get('/comments', (req, res) => {
    res.json(comments);
});

//Get comment by id
app.get('/comments/:id', (req, res) => {
    const comment = comments.find(c => c.id === parseInt(req.params.id));
    if (!comment) {
        res.status(404).send('The comment with the given ID was not found');
    } else {
        res.json(comment);
    }
});

//Create new comment
app.post('/comments', (req, res) => {
    const newComment = {
        id: comments.length + 1,
        name: req.body.name,
        text: req.body.text
    };
    comments.push(newComment);
    res.json(newComment);
});

//Update comment
app.put('/comments/:id', (req, res) => {
    const comment = comments.find(c => c.id === parseInt(req.params.id));
    if (!comment) {
        res.status(404).send('The comment with the given ID was not found');
    } else {
        comment.name = req.body.name;
        comment.text = req.body.text;
        res.json(comment);
    }
});

//Delete comment
app.delete('/comments/:id', (req, res) => {
    const comment = comments.find(c => c.id === parseInt(req.params.id));
    if (!comment) {
        res.status(404).send('The comment with the given ID was not found');
    } else {
        const index = comments.indexOf(comment);
        comments.splice(index, 1);
        res.json(comments);
    }
});

//Start server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});