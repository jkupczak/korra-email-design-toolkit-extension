console.warn("[medbridge-home-extension] loaded /js/medbridge-blog-admin-posts.js");

var data = "";

let rows = document.querySelectorAll("#the-list tr:not(.post-password-required)");
for (let row of rows) {
  data += row.querySelector(".title a").innerText + "|" + row.querySelector(".title .view a").href + "|" + row.querySelector(".coauthors a").innerText + "|" + row.querySelector(".categories a").innerText + "|" + row.querySelector(".date abbr").innerText + "\n";
}

console.log(data);
