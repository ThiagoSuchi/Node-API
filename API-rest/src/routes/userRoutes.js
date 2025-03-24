import { Router } from "express";
import userController from "../controllers/UserController.js"

const router = new Router();

router.post('/', userController.store)

export default router;

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
