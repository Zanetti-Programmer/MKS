<<<<<<< HEAD
# MKS
MKS
=======
## Descrição do Projeto

<p style="text-align: left">Este projeto foi desenvolvido como teste tecnico da mks desenvolvimento de sistemas, se tratando de uma API
RestFull de filmes, com controle de usuários, banco de dados postgres e redis como seu cache</p>

<p style="text-align: left">Esta foi a primeira API que utilizei o docker para desenvolvimento, sendo esta uma tecnologia na qual não possuo tanto conhecimento, mas me esforçei para criar um bom docker-compose para ambiente de produção, como solicitado nas diretrizes do desafio</p>

## Tecnologias do Projeto

<div style="display: flex; margin: 2em; gap: 1em;" >
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" height="45" width="45"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg" height="45" width="45" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg" height="45" width="45" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" height="45" width="45"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" height="45" width="45" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swagger/swagger-original.svg" height="45" width="45" /> 
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg" height="45" width="45" />                     
</div>

## Rodando o Docker Compose

```bash
# Subindo o Container
docker-compose up

# Subindo o container com o detached aplicado
docker-compose up -d

# Encerrando o container
docker-compose down
```

<p style="text-align: left">Você ainda precisa rodar as migrations para que possa testar o projeto, lembre-se de conectar um usuário com as permissões necessárias.</p>

```bash

# Exibindo as migrações e verificando se são detectadas
npm run typeorm migration:show

# Rodando as migrações para que sejam executadas no banco
npm run typeorm migration:run

```

## Acessando a Documentação e a API

-  Link da API - [Aqui](http://34.123.109.37:3000/users)

- Documentação - [Aqui](http://34.123.109.37:3000/api)

## Considerações

<p style="text-align: left">Não achei nescessário a existências de testes e2e e unitários devido a simplicidade da aplicação, o desenvolvimento desses testes não me daria um ganho de tempo se testados na mão, visto que cada rota era produzida unicamente e logo em seguida, testada, por isso não os inclui no repositorio.</p>
>>>>>>> ba7d140 (Resolve conflitos após pull)
