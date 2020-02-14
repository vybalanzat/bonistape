//routes to HTML
app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "friendfinder/public/home.html"));
});

app.get("/survey", function(req, res){
    res.sendFile(path.join(__dirname, "survey.html"));
})