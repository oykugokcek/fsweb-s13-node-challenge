// "project" routerını buraya yazın!

// -----------2 ----------------
//expressi import et ve router oluştur
//router ı export edip serverda import et
//model dosyasını import et
//status 500 hatası için fonksiyon yaz
//bütün projeleri aldığın fonksiyonu yaz validasyona geç

// ---------------3----------------
//fonksiyonu import et
//sadece status200 ve json ile req.project gönder

//-------------5----------------
//put için iki validasyonu kullan.

const express = require("express");
const router = express.Router();
const Projects = require("./projects-model");
const mw = require("./projects-middleware");

router.get("/", (req, res, next) => {
  Projects.get()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/:id", mw.validateProjectId, (req, res, next) => {
  res.status(200).json(req.project);
  next();
});

router.post("/", mw.validateProject, (req, res, next) => {
  Projects.insert(req.project)
    .then((insertedProject) => {
      res.status(200).json(insertedProject);
    })
    .catch((err) => next(err));
});

router.put(
  "/:id",
  mw.validateProjectId,
  mw.validateProject,
  (req, res, next) => {
    Projects.update(req.params.id, req.project)
      .then((updatedProject) => {
        res.status(200).json(updatedProject);
      })
      .catch((err) => next(err));
  }
);

router.delete("/:id", mw.validateProjectId, (req, res, next) => {
  Projects.remove(req.params.id)
    .then((deletedProject) => {
      res.status(200).json({ message: `${req.params.id} idli proje silindi` });
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/:id/actions", mw.validateProjectId, async (req, res, next) => {
  try {
    let actions = await Projects.getProjectActions(req.params.id);
    res.status(200).json(actions);
  } catch (error) {
    next(error);
  }
});

router.use((err, req, res) => {
  res.status(err.status || 500).json({
    customMessage: "Bir hata oluştu.",
    message: err.message,
  });
});
module.exports = router;
