// create como_backend
const cors = require("cors");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // CORS 에러 해결
app.use(express.static(__dirname + "/dist")); // .dist 폴더에 있는 파일들을 사용할 수 있도록 설정

// index.html 파일을 사용할 수 있도록 설정
app.get("*", (req, res) => {
  res.sendFile(__dirname + "/dist/index.html");
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
