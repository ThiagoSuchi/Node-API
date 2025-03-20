class HomeController {
  index(req, res) {
    res.json({
      TudoCerto: true,
    });
  }
}

export default new HomeController();
