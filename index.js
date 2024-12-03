import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";

const app = express();
const port = 7001;

const posts = [];
let currentDate;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.use(methodOverride('_method'));

app.get("/", (req,res) => {
    if (!currentDate) {
        currentDate = new Date().toLocaleString();
    }
    res.render(("home.ejs"),{posts: posts, currentDate: currentDate});
});

app.post("/posts",(req,res) => {
    const {btitle , bcontent} = req.body;

    const newPost = {
        title: btitle,
        content: bcontent,
        date: new Date().toLocaleString(),
    };

    posts.push(newPost);
    res.redirect("/");
});

app.put("/posts/:id", (req,res) => {
    const {id} = req.params.id;
    const {postId} = parseInt(id,10);

    if (isNaN(postId) || postId < 0 || postId >= posts.length) {
        return res.status(404).send("Post not found!");
    }
    const {title, content} = req.body;

    posts[postId].title = title;
    posts[postId].content = content;

    res.sendStatus(200);
});

app.delete("/posts/:id", (req,res) => {
    const {id} = req.params.id;

    posts.splice(id,1);
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`App is running at port ${port}`);
});