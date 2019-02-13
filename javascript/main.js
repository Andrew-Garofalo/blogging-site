let posts;

$(document).ready(function() {
    getBlogPosts()
});

function getBlogPosts() {
    return $.ajax({
        url: 'https://jsonplaceholder.typicode.com/posts',
        dataType:'json',
        success: function (data) {
            posts = data;
            createBlogPosts(posts);
        }
    });
}

function createBlogPosts(posts) {
    let insert;
    for(let i=0; i<posts.length; i++) {
        headline = posts[i].title;
        insert = "";
        insert += "<div style=\"margin-bottom:5%;height:15vh;font-size:2rem;border-color:black;border-style:solid;border-width:5px;\" class=\"post col-12\">";
        insert += "<div class=\"row\">";
        insert += "This is a Headline: ";
        insert += headline;
        insert += "<button style=\"position:absolute;bottom:0;\" onclick=\"redirectToPost(" + i + ")\" type=\"button\" class=\"rMore btn btn-primary waves-effect btn-block\">Read More</button></a>";
        insert += "</div>";
        insert += "</div>";

        $(".blog-posts").append(insert);
    }
}

function redirectToPost(index) {
    url = "blogPost.html?index=" + index;
    $(location).attr('href', url);
}

