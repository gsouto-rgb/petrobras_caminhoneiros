/* ================================================= */
/* CONFIGURAÇÃO */
/* ================================================= */

const DOWNLOAD_PASSWORD = "evolve2026";

/* Nome do projeto (pode depois vir de input) */
const PROJECT_NAME = "Creative_HTML5";

/* ================================================= */
/* BOTÃO */
/* ================================================= */

const downloadBtn = document.getElementById("download-btn");

downloadBtn.addEventListener("click", async () => {

    /* ======================================== */
    /* 1. SENHA */
    /* ======================================== */

    const password = prompt("Digite a senha para exportar o HTML5:");

    if (password !== DOWNLOAD_PASSWORD) {
        alert("Senha incorreta.");
        return;
    }

    /* ======================================== */
    /* 2. FORMATS (AGÊNCIA LEVEL) */
    /* ======================================== */

    const formats = [
        "120x600",
        "160x600",
        "300x100",
        "300x250",
        "300x600",
        "320x50",
        "320x100",
        "728x90",
        "970x250",
        "980x90"
    ];

    /* ======================================== */
    /* 3. ZIP INIT */
    /* ======================================== */

    const zip = new JSZip();

    const assetsFolder = zip.folder("assets");

    /* ======================================== */
    /* 4. HTML BUILDER (DINÂMICO) */
    /* ======================================== */

    let htmlCreatives = "";

    formats.forEach(format => {

        htmlCreatives += `
<div class="creative-container" data-format="${format}" style="width:${format.split("x")[0]}px;height:${format.split("x")[1]}px;">
    <div class="prod"></div>
    <div class="copy"></div>
    <div class="logo"></div>
    <div class="cta"></div>
</div>
        `;
    });

    const html = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>${PROJECT_NAME}</title>
<link rel="stylesheet" href="style.css">
</head>
<body>

${htmlCreatives}

<script src="script.js"></script>

</body>
</html>
    `.trim();

    zip.file("index.html", html);

    /* ======================================== */
    /* 5. CSS (PRODUÇÃO LIMPA) */
    /* ======================================== */

    const css = `
body {
  margin: 0;
  padding: 0;
  background: #fff;
  font-family: Arial;
}

.creative-container {
  position: relative;
  overflow: hidden;
  margin: 20px;
  display: inline-block;
}

.prod, .copy, .logo, .cta {
  position: absolute;
  inset: 0;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
    `.trim();

    zip.file("style.css", css);

    /* ======================================== */
    /* 6. SCRIPT DE RENDER (PRODUÇÃO) */
    /* ======================================== */

    const js = `
const creatives = document.querySelectorAll(".creative-container");

creatives.forEach((creative) => {

    const format = creative.dataset.format;

    creative.querySelector(".logo").style.backgroundImage =
        \`url('./assets/\${format}logo.png')\`;

    creative.querySelector(".copy").style.backgroundImage =
        \`url('./assets/\${format}copy.png')\`;

    creative.querySelector(".prod").style.backgroundImage =
        \`url('./assets/\${format}img.png')\`;

    creative.querySelector(".cta").style.backgroundImage =
        \`url('./assets/\${format}cta.png')\`;
});
    `.trim();

    zip.file("script.js", js);

    /* ======================================== */
    /* 7. ASSETS PLACEHOLDER (opcional organização) */
    /* ======================================== */

    formats.forEach(format => {

        assetsFolder.file(`${format}logo.png`, "");
        assetsFolder.file(`${format}copy.png`, "");
        assetsFolder.file(`${format}img.png`, "");
        assetsFolder.file(`${format}cta.png`, "");
    });

    /* ======================================== */
    /* 8. DOWNLOAD */
    /* ======================================== */

    const fileName = `${PROJECT_NAME}_${Date.now()}.zip`;

    zip.generateAsync({ type: "blob" }).then((content) => {

        const link = document.createElement("a");

        link.href = URL.createObjectURL(content);
        link.download = fileName;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

});