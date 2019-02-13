$(document).ready(function() {
    postid = getQueryStringValue("index");
    getFullBlogPost(parseInt(postid)+1);
});

function getQueryStringValue (key) {  
    return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));  
  }  

  function getFullBlogPost(postid) {
      $.ajax({
          url: "https://jsonplaceholder.typicode.com/posts/" + postid,
          datatype: 'json',
          success: function(data) {
              post = data;
              
              generateBlogPostContent(post);
          }
      })
  }

  function generateBlogPostContent(post) {
    let insert;
        headline = post.title;
        content = post.body;
        insert = "";
        insert += "<div \" class=\"col-12\">";
        insert += "<div class=\"row\">";
        insert += "<div class=\"col-12\">";
        insert += "This is a full blog post: ";
        insert += headline;
        insert += "</div>";
        insert += "<div style=\"font-size:1rem\" class=\"col-12\">";
        insert += content;
        insert += "</div>";
        insert += "</div>";
        insert += "</div>";

        $(".blogPost").append(insert);

        getBlogComments();
  }

  function getBlogComments() {
    $.ajax({
        url: "https://jsonplaceholder.typicode.com/posts/" + postid + "/comments",
        datatype: 'json',
        success: function(data) {
            comment = data;

            getPictures(comment);
        }
    })
  }

  function getPictures(comment) {
    return $.ajax({
        url: "https://jsonplaceholder.typicode.com/photos/",
        datatype: 'json',
        success: function(data) {
            photos = data;

            generateBlogComments(comment, photos)
            
        }
    })
  }

  function generateBlogComments(comment, photos) {
      let insert;

      for(let i=0; i<100; i++) {
        commText = comment[i].body;
        insert = "";
        insert += "<div style=\"background-color:rgb(67, 82, 75);margin-bottom:10%;\" class=col-10>";
        insert += commText;
        insert += "</div>";
        insert += "<div style=\"background-color:rgb(67, 82, 75);margin-bottom:10%;\" class=col-2>";
        insert += "<img style=\"width:100%;\" src=\"" + photos[0].url + "\"";
        insert += "</div>";
        $(".comment-section").append(insert);
      }
      
  }

