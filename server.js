import { createServer } from "http";
import { request as _request } from "https";

const API_KEY = "99";

const server = createServer((req, res) => {
  if (req.method === "POST" && req.url === "/tasks") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      const task = JSON.parse(body);
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token token=${API_KEY}`,
        },
      };
      const request = _request(
        "https://altcademy-to-do-list-api.herokuapp.com/tasks",
        options,
        (response) => {
          res.writeHead(response.statusCode, response.headers);
          response.pipe(res);
        }
      );
      request.on("error", (error) => {
        console.error(error);
        res.statusCode = 500;
        res.end(JSON.stringify({ error: "Internal Server Error" }));
      });
      request.write(JSON.stringify(task));
      request.end();
    });
  } else {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
