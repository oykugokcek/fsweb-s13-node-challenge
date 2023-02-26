// projects ara yazılımları buraya

// ----------1----------
// -dataları ve modeldaki fonksiyonları import et
// -sonra unutmamak için module.exports yaz
//-bütün projeleri aldığın get de mw e ihtiyacın yok. gidip onu yaz

//--------------3---------
//project-model export et cnm
//-validateId fonksiyonuyla requestten gelen id nin var olup olmadığını kontrol et. Yoksa 404 hatası, varsa req.project = existProject ile kaydet + next()
//async-await yazdıysan try-catch i unutma!
//fonksiyonu export et routera dön

//---------------4---------
//Post atılan yeni projeyi kontrol etmek için validasyon yaz. eksikse status400 gönder
//modeldeki fonksiyonları kullanmadığın için asenkron yapmana gerek yok cnm
//key leri requestin bodysinden al
//completed true-false döneceği için type ını kontrol et!
// else koşulunda req.projecte yeni değperleri gönder
//EXPORT ET

const projects = require("./projects-model");
const Projects = require("./projects-model");

async function validateProjectId(req, res, next) {
  try {
    let existProject = await Projects.get(req.params.id);
    if (!existProject) {
      res.status(404).json({ message: "Proje bulunamadı." });
    } else {
      req.project = existProject;
      next();
    }
  } catch (error) {
    next(error);
  }
}

function validateProject(req, res, next) {
  const { name, description, completed } = req.body;
  if (!name || !description || typeof completed != "boolean") {
    res.status(400).json({ message: "Eksik bilgi cnm." });
  } else {
    req.project = {
      name: name,
      description: description,
      completed: completed,
    };
    next();
  }
}

module.exports = {
  validateProjectId,
  validateProject,
};
