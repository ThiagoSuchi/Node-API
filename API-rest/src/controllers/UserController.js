import User from "../models/UserModel.js";

class HomeController {
  async store(req, res) {
    try {
      const novoUser = await User.create(req.body)
      res.json(novoUser);
    } catch (err) {
      console.log(err);
      res.status(400).json({
        errors: err.errors.map((err) => err.message)
      });
    }
  }

  // Index
  async index(req, res) {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (e) {
      console.log(e);
      return res.json(null);
    }
  }

  // Show
  async show(req, res) {
    try {
      const user = await User.findByPk(req.params.id);// Buscando o usuário pelo Primary Key(PK)
      res.json(user);
    } catch (e) {
      console.log(e);
      return res.json(null);
    }
  }

  // Update
  async update(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          errors: ['ID não enviado.'],
        })
      }

      const user = await User.findByPk(req.params.id);// Buscando o usuário pelo Primary Key(PK)

      if (!user) {
        return res.status(400).json({
          errors: ['Usuário não encontrado.'],
        })
      };

      const newData = await user.update(req.body);
      res.json(newData);
    } catch (err) {
      res.status(400).json({
        errors: err.errors.map((err) => err.message)
      });
    }
  }


  // Delete
  async delete(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          errors: ['ID não enviado.'],
        })
      }

      const user = await User.findByPk(req.params.id);// Buscando o usuário pelo Primary Key(PK)

      if (!user) {
        return res.status(400).json({
          errors: ['Usuário não encontrado.'],
        })
      };

      await user.destroy()
      res.json(`Usuário de ID: ${req.params.id} deletado com sucesso.`);
    } catch (err) {
      res.status(400).json({
        errors: err.errors.map((err) => err.message)
      });
    }
  }
}

export default new HomeController();

/*

(Métodos comuns em um Controller seguindo padroẽs RESTful)
index --> lista todos os usuários -> [GET]
store/create --> cria um novo usuário -> [POST]
delete/destroy --> apaga um usuário -> [DELETE]
show --> mostra um usuário -> [GET]
update --> atualiza um usuário -> [PATCH ou PUT]

* - Cada método corresponde a um verbo HTTP e uma ação específica.
* - Esse padrão segue as boas práticas RESTful.
* - Em frameworks como Express, Laravel e Rails, esse é o formato mais utilizado para organizar os Controllers.

*/
